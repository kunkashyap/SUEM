from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal, Dict, Any
from datetime import datetime, timezone, timedelta
from pathlib import Path
import os, uuid, logging, json, bcrypt, jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = os.environ.get('JWT_ALGORITHM', 'HS256')
JWT_EXPIRE_MINUTES = int(os.environ.get('JWT_EXPIRE_MINUTES', '10080'))
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(name)s - %(message)s')
logger = logging.getLogger("medsim")

app = FastAPI(title="MedSim API")
api = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)

# -------------------- Data seed --------------------
from data import CATEGORIES, SIMULATIONS, QUIZZES, CLINICAL_CASES, APPENDECTOMY_STEPS, ANATOMY_LAYERS, PROCEDURES, PROCEDURE_META

@app.on_event("startup")
async def startup_event():
    logger.info(f"Connected to MongoDB. Target database: '{DB_NAME}'")
    try:
        cat_count = await db.categories.count_documents({})
        if cat_count == 0:
            logger.info(f"Seeding {len(CATEGORIES)} categories into MongoDB collection 'categories'...")
            await db.categories.insert_many([c.copy() for c in CATEGORIES])
            logger.info("Successfully seeded categories collection.")
        else:
            logger.info(f"Categories collection existing document count: {cat_count}")
    except Exception as e:
        logger.error(f"Error seeding categories collection: {e}")

    try:
        sim_count = await db.simulations.count_documents({})
        if sim_count == 0:
            logger.info(f"Seeding {len(SIMULATIONS)} simulations into MongoDB collection 'simulations'...")
            await db.simulations.insert_many([s.copy() for s in SIMULATIONS])
            logger.info("Successfully seeded simulations collection.")
        else:
            logger.info(f"Simulations collection existing document count: {sim_count}")
    except Exception as e:
        logger.error(f"Error seeding simulations collection: {e}")


# -------------------- Models --------------------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: Literal['student', 'faculty', 'admin'] = 'student'
    institution: Optional[str] = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    email: str
    name: str
    role: str
    institution: Optional[str] = None
    xp: int = 0
    streak: int = 0
    created_at: str

class AuthOut(BaseModel):
    token: str
    user: UserOut

class TutorMessageIn(BaseModel):
    session_id: str
    message: str
    context: Optional[Dict[str, Any]] = None  # {structure, step, vitals}

class AttemptIn(BaseModel):
    simulation_id: str
    accuracy: int = Field(ge=0, le=100)
    duration_sec: int = 0
    blood_loss_ml: int = 0
    wrong_actions: int = 0
    missed_steps: int = 0
    grade: str = 'B'
    weak_areas: List[str] = []

class QuizSubmitIn(BaseModel):
    quiz_id: str
    answers: Dict[str, int]  # question_id -> selected option index

# -------------------- Helpers --------------------
def hash_pw(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_pw(pw: str, h: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), h.encode())
    except Exception:
        return False

def make_token(uid: str) -> str:
    payload = {
        'sub': uid,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES),
        'iat': datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(cred: Optional[HTTPAuthorizationCredentials] = Depends(bearer)):
    if not cred:
        raise HTTPException(status_code=401, detail='Missing token')
    try:
        payload = jwt.decode(cred.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        uid = payload['sub']
    except Exception:
        raise HTTPException(status_code=401, detail='Invalid token')
    doc = await db.users.find_one({'id': uid}, {'_id': 0, 'password_hash': 0})
    if not doc:
        raise HTTPException(status_code=401, detail='User not found')
    return doc

def user_public(u: dict) -> dict:
    return {
        'id': u['id'],
        'email': u['email'],
        'name': u['name'],
        'role': u.get('role', 'student'),
        'institution': u.get('institution'),
        'xp': u.get('xp', 0),
        'streak': u.get('streak', 0),
        'created_at': u.get('created_at', datetime.now(timezone.utc).isoformat()),
    }

# -------------------- Auth --------------------
@api.get('/')
async def root():
    return {'service': 'MedSim API', 'ok': True}

@api.post('/auth/register', response_model=AuthOut)
async def register(payload: RegisterIn):
    existing = await db.users.find_one({'email': payload.email.lower()})
    if existing:
        raise HTTPException(400, 'Email already registered')
    uid = str(uuid.uuid4())
    doc = {
        'id': uid,
        'email': payload.email.lower(),
        'password_hash': hash_pw(payload.password),
        'name': payload.name,
        'role': payload.role,
        'institution': payload.institution,
        'xp': 0,
        'streak': 0,
        'badges': [],
        'created_at': datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(doc)
    return {'token': make_token(uid), 'user': user_public(doc)}

@api.post('/auth/login', response_model=AuthOut)
async def login(payload: LoginIn):
    doc = await db.users.find_one({'email': payload.email.lower()})
    if not doc or not verify_pw(payload.password, doc.get('password_hash', '')):
        raise HTTPException(401, 'Invalid credentials')
    return {'token': make_token(doc['id']), 'user': user_public(doc)}

@api.get('/auth/me', response_model=UserOut)
async def me(user=Depends(get_current_user)):
    return user_public(user)

# -------------------- Catalog --------------------
@api.get('/categories')
async def categories():
    logger.info("GET /api/categories requested")
    try:
        items = await db.categories.find({}, {'_id': 0}).to_list(100)
        if not items:
            logger.warning("No categories found in MongoDB, returning in-memory CATEGORIES fallback")
            items = CATEGORIES
    except Exception as e:
        logger.error(f"Error querying categories from MongoDB: {e}")
        items = CATEGORIES
    logger.info(f"Returning {len(items)} categories")
    return items

@api.get('/simulations')
async def list_simulations(category: Optional[str] = None, difficulty: Optional[str] = None):
    logger.info(f"GET /api/simulations requested with category={category!r}, difficulty={difficulty!r}")
    query = {}
    if category and category.strip() and category.strip().lower() != 'all':
        query['category'] = category.strip()
    if difficulty and difficulty.strip() and difficulty.strip().lower() not in ('any level', 'all'):
        query['difficulty'] = difficulty.strip()

    logger.info(f"Executing MongoDB query on 'simulations' collection: {query}")
    try:
        items = await db.simulations.find(query, {'_id': 0}).to_list(200)
        if not items and not query:
            logger.warning("MongoDB returned 0 simulations with empty query, using in-memory SIMULATIONS fallback")
            items = SIMULATIONS
    except Exception as e:
        logger.error(f"MongoDB query failed: {e}. Falling back to in-memory filter")
        items = SIMULATIONS
        if category and category.strip() and category.strip().lower() != 'all':
            items = [s for s in items if s['category'] == category.strip()]
        if difficulty and difficulty.strip() and difficulty.strip().lower() not in ('any level', 'all'):
            items = [s for s in items if s['difficulty'] == difficulty.strip()]

    logger.info(f"GET /api/simulations response document count: {len(items)}")
    return items

@api.get('/simulations/{sim_id}')
async def get_simulation(sim_id: str):
    logger.info(f"GET /api/simulations/{sim_id} requested")
    try:
        doc = await db.simulations.find_one({'id': sim_id}, {'_id': 0})
    except Exception as e:
        logger.error(f"Error fetching simulation {sim_id} from MongoDB: {e}")
        doc = None
    if not doc:
        doc = next((s for s in SIMULATIONS if s['id'] == sim_id), None)
    if not doc:
        raise HTTPException(404, 'Not found')
    return doc

@api.get('/procedures/appendectomy/steps')
async def appendectomy_steps():
    return APPENDECTOMY_STEPS

@api.get('/procedures/{proc_id}')
async def get_procedure(proc_id: str):
    if proc_id not in PROCEDURES:
        raise HTTPException(404, 'Procedure not found')
    return {'id': proc_id, 'meta': PROCEDURE_META[proc_id], 'steps': PROCEDURES[proc_id]}

@api.get('/anatomy/layers')
async def anatomy_layers():
    return ANATOMY_LAYERS

@api.get('/quizzes')
async def list_quizzes():
    # strip answers
    return [{**q, 'questions': [{k: v for k, v in q2.items() if k != 'answer'} for q2 in q['questions']]} for q in QUIZZES]

@api.get('/quizzes/{quiz_id}')
async def get_quiz(quiz_id: str):
    for q in QUIZZES:
        if q['id'] == quiz_id:
            return {**q, 'questions': [{k: v for k, v in q2.items() if k != 'answer'} for q2 in q['questions']]}
    raise HTTPException(404, 'Not found')

@api.post('/quizzes/{quiz_id}/submit')
async def submit_quiz(quiz_id: str, payload: QuizSubmitIn, user=Depends(get_current_user)):
    quiz = next((q for q in QUIZZES if q['id'] == quiz_id), None)
    if not quiz:
        raise HTTPException(404, 'Not found')
    total = len(quiz['questions'])
    correct = 0
    breakdown = []
    for q in quiz['questions']:
        sel = payload.answers.get(q['id'])
        is_correct = sel == q['answer']
        if is_correct:
            correct += 1
        breakdown.append({'question_id': q['id'], 'selected': sel, 'correct_answer': q['answer'], 'is_correct': is_correct, 'explanation': q.get('explanation', '')})
    score = int(round((correct / total) * 100)) if total else 0
    xp_earned = correct * 10
    await db.users.update_one({'id': user['id']}, {'$inc': {'xp': xp_earned}})
    await db.quiz_results.insert_one({
        'id': str(uuid.uuid4()),
        'user_id': user['id'],
        'quiz_id': quiz_id,
        'score': score,
        'correct': correct,
        'total': total,
        'created_at': datetime.now(timezone.utc).isoformat(),
    })
    return {'score': score, 'correct': correct, 'total': total, 'xp_earned': xp_earned, 'breakdown': breakdown}

@api.get('/cases')
async def list_cases():
    return CLINICAL_CASES

@api.get('/cases/{case_id}')
async def get_case(case_id: str):
    for c in CLINICAL_CASES:
        if c['id'] == case_id:
            return c
    raise HTTPException(404, 'Not found')

# -------------------- Attempts / Dashboard --------------------
@api.post('/attempts')
async def record_attempt(payload: AttemptIn, user=Depends(get_current_user)):
    doc = {
        'id': str(uuid.uuid4()),
        'user_id': user['id'],
        **payload.model_dump(),
        'created_at': datetime.now(timezone.utc).isoformat(),
    }
    await db.attempts.insert_one(doc)
    xp = max(10, int(payload.accuracy / 2))
    await db.users.update_one({'id': user['id']}, {'$inc': {'xp': xp}})
    doc.pop('_id', None)
    return {**doc, 'xp_earned': xp}

@api.get('/attempts/mine')
async def my_attempts(user=Depends(get_current_user)):
    items = await db.attempts.find({'user_id': user['id']}, {'_id': 0}).sort('created_at', -1).to_list(200)
    return items

@api.get('/dashboard/student')
async def student_dashboard(user=Depends(get_current_user)):
    attempts = await db.attempts.find({'user_id': user['id']}, {'_id': 0}).sort('created_at', -1).to_list(200)
    quiz_results = await db.quiz_results.find({'user_id': user['id']}, {'_id': 0}).sort('created_at', -1).to_list(50)
    total_attempts = len(attempts)
    avg_accuracy = int(sum(a['accuracy'] for a in attempts) / total_attempts) if total_attempts else 0
    weak_areas: Dict[str, int] = {}
    for a in attempts:
        for w in a.get('weak_areas', []):
            weak_areas[w] = weak_areas.get(w, 0) + 1
    fresh = await db.users.find_one({'id': user['id']}, {'_id': 0, 'password_hash': 0})
    return {
        'user': user_public(fresh),
        'total_attempts': total_attempts,
        'avg_accuracy': avg_accuracy,
        'quiz_count': len(quiz_results),
        'weak_areas': sorted(weak_areas.items(), key=lambda x: -x[1])[:5],
        'recent_attempts': attempts[:10],
        'recent_quizzes': quiz_results[:10],
    }

@api.get('/leaderboard')
async def leaderboard():
    users = await db.users.find({}, {'_id': 0, 'password_hash': 0}).sort('xp', -1).limit(20).to_list(20)
    return [{'name': u['name'], 'xp': u.get('xp', 0), 'institution': u.get('institution'), 'role': u.get('role', 'student')} for u in users]

# # -------------------- AI Tutor (Claude via Emergent) --------------------
# from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

# TUTOR_SYSTEM = (
#     "You are Dr. Ada, an expert Socratic surgical & anatomy tutor inside an interactive 3D medical training simulator. "
#     "Teach medical students by guided inquiry — ask leading questions, give concise clinical explanations, and reference the current scene when provided. "
#     "When the student is about to make a critical mistake, warn them and explain WHY. Keep answers short, structured, and use bullet points when helpful. "
#     "Always ground your response in the provided context (current step, structure highlighted, vitals). If context is missing, ask a clarifying question."
# )

# @api.post('/tutor/chat')
# async def tutor_chat(payload: TutorMessageIn, user=Depends(get_current_user)):
#     ctx_str = ''
#     if payload.context:
#         ctx_str = f"\n\n[Scene Context]\n{json.dumps(payload.context, indent=2)}"

#     async def gen():
#         try:
#             chat = LlmChat(
#                 api_key=EMERGENT_LLM_KEY,
#                 session_id=f"{user['id']}:{payload.session_id}",
#                 system_message=TUTOR_SYSTEM,
#             ).with_model('anthropic', 'claude-sonnet-4-6')
#             um = UserMessage(text=payload.message + ctx_str)
#             async for ev in chat.stream_message(um):
#                 if isinstance(ev, TextDelta):
#                     yield f"data: {json.dumps({'delta': ev.content})}\n\n"
#                 elif isinstance(ev, StreamDone):
#                     yield f"data: {json.dumps({'done': True})}\n\n"
#                     break
#         except Exception as e:
#             yield f"data: {json.dumps({'error': str(e)})}\n\n"

#     # persist message (fire and forget-ish)
#     await db.tutor_messages.insert_one({
#         'id': str(uuid.uuid4()),
#         'user_id': user['id'],
#         'session_id': payload.session_id,
#         'message': payload.message,
#         'context': payload.context,
#         'created_at': datetime.now(timezone.utc).isoformat(),
#     })
#     return StreamingResponse(gen(), media_type='text/event-stream', headers={'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no'})

# @api.get('/tutor/history/{session_id}')
# async def tutor_history(session_id: str, user=Depends(get_current_user)):
#     msgs = await db.tutor_messages.find({'user_id': user['id'], 'session_id': session_id}, {'_id': 0}).sort('created_at', 1).to_list(200)
#     return msgs

# # -------------------- Search --------------------
# @api.get('/search')
# async def search(q: str):
#     q_lower = q.lower()
#     results = []
#     for s in SIMULATIONS:
#         if q_lower in s['title'].lower() or q_lower in s.get('description', '').lower() or any(q_lower in t.lower() for t in s.get('tags', [])):
#             results.append({'type': 'simulation', 'id': s['id'], 'title': s['title'], 'category': s['category']})
#     for c in CLINICAL_CASES:
#         if q_lower in c['title'].lower() or q_lower in c.get('presenting_complaint', '').lower():
#             results.append({'type': 'case', 'id': c['id'], 'title': c['title']})
#     for layer in ANATOMY_LAYERS:
#         for st in layer.get('structures', []):
#             if q_lower in st['name'].lower():
#                 results.append({'type': 'anatomy', 'id': st['id'], 'title': st['name'], 'layer': layer['name']})
#     return results[:30]

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# @app.on_event('shutdown')
# async def _shutdown():
#     client.close()

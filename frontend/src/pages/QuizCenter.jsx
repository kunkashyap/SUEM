import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function QuizCenter() {
  const [quizzes, setQuizzes] = useState([]);
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => { api.get('/quizzes').then((r) => setQuizzes(r.data)); }, []);

  const submit = async () => {
    try {
      const { data } = await api.post(`/quizzes/${active.id}/submit`, { quiz_id: active.id, answers });
      setResult(data);
    } catch (e) {
      toast.error(e?.response?.data?.detail || 'Login required');
    }
  };

  if (active) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-3xl mx-auto px-6 py-12" data-testid="quiz-view">
          <button onClick={() => { setActive(null); setAnswers({}); setResult(null); }} data-testid="quiz-back"
            className="text-sm text-slate-500 hover:text-slate-900 mb-4">← Back to quizzes</button>
          <div className="label-caps mb-2">{active.difficulty}</div>
          <h1 className="font-display text-4xl mb-8">{active.title}</h1>

          {!result ? (
            <>
              {active.questions.map((q, idx) => (
                <div key={q.id} className="mb-8 border border-slate-200 rounded-lg p-6" data-testid={`q-${q.id}`}>
                  <div className="text-xs font-mono text-slate-400 mb-2">QUESTION {idx + 1}</div>
                  <div className="font-medium mb-4">{q.text}</div>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <label key={i} className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors ${answers[q.id] === i ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-400'}`}>
                        <input type="radio" name={q.id} checked={answers[q.id] === i} onChange={() => setAnswers({ ...answers, [q.id]: i })} data-testid={`opt-${q.id}-${i}`} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={submit} disabled={Object.keys(answers).length < active.questions.length} data-testid="quiz-submit"
                className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium disabled:opacity-40 hover:bg-blue-600 transition-colors">
                Submit answers
              </button>
            </>
          ) : (
            <div className="border border-slate-200 rounded-lg p-8" data-testid="quiz-result">
              <div className="label-caps mb-2">Result</div>
              <div className="font-display text-6xl font-bold text-slate-900 mb-2">{result.score}%</div>
              <div className="text-slate-500 mb-6">{result.correct} of {result.total} correct · +{result.xp_earned} XP earned</div>
              <div className="space-y-3">
                {result.breakdown.map((b) => (
                  <div key={b.question_id} className={`p-3 rounded border ${b.is_correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                    <div className="text-sm font-medium">{b.is_correct ? '✓ Correct' : '✗ Incorrect'}</div>
                    <div className="text-xs text-slate-600 mt-1">{b.explanation}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setActive(null); setAnswers({}); setResult(null); }} className="mt-6 border border-slate-900 text-slate-900 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-900 hover:text-white transition-colors" data-testid="quiz-done">
                Back to quizzes
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="label-caps mb-2">Assessments</div>
        <h1 className="font-display text-5xl mb-10">Quiz center</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((q) => (
            <button key={q.id} onClick={() => setActive(q)} data-testid={`quiz-${q.id}`}
              className="text-left border border-slate-200 rounded-lg p-6 hover-lift hover:border-slate-900">
              <div className="label-caps mb-2">{q.difficulty} · {q.category}</div>
              <div className="font-display text-2xl font-semibold mb-2">{q.title}</div>
              <div className="text-sm text-slate-500">{q.questions.length} questions</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

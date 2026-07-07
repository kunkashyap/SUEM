CATEGORIES = [
    {'id': 'anatomy', 'name': 'Anatomy', 'icon': 'skeleton', 'count': 42, 'color': '#2563EB'},
    {'id': 'physiology', 'name': 'Physiology', 'icon': 'activity', 'count': 28, 'color': '#0EA5E9'},
    {'id': 'surgery', 'name': 'Surgery', 'icon': 'scissors', 'count': 36, 'color': '#E11D48'},
    {'id': 'pathology', 'name': 'Pathology', 'icon': 'microscope', 'count': 24, 'color': '#7C3AED'},
    {'id': 'radiology', 'name': 'Radiology', 'icon': 'scan', 'count': 18, 'color': '#0F172A'},
    {'id': 'emergency', 'name': 'Emergency Medicine', 'icon': 'siren', 'count': 22, 'color': '#DC2626'},
    {'id': 'obstetrics', 'name': 'Obstetrics', 'icon': 'baby', 'count': 14, 'color': '#DB2777'},
    {'id': 'orthopedics', 'name': 'Orthopedics', 'icon': 'bone', 'count': 20, 'color': '#475569'},
    {'id': 'neurosurgery', 'name': 'Neurosurgery', 'icon': 'brain', 'count': 12, 'color': '#8B5CF6'},
    {'id': 'dentistry', 'name': 'Dentistry', 'icon': 'tooth', 'count': 10, 'color': '#0891B2'},
    {'id': 'nursing', 'name': 'Nursing', 'icon': 'stethoscope', 'count': 30, 'color': '#16A34A'},
    {'id': 'veterinary', 'name': 'Veterinary', 'icon': 'paw', 'count': 8, 'color': '#CA8A04', 'coming_soon': True},
]

SIMULATIONS = [
    {'id': 'sim-appendectomy', 'title': 'Open Appendectomy', 'category': 'surgery', 'difficulty': 'Intermediate', 'duration_min': 25, 'description': 'Step-by-step removal of an inflamed appendix through a McBurney incision.', 'tags': ['appendix', 'general surgery', 'abdomen'], 'steps': 12, 'featured': True},
    {'id': 'sim-heart-anatomy', 'title': 'Heart: Chambers & Conduction', 'category': 'anatomy', 'difficulty': 'Beginner', 'duration_min': 15, 'description': 'Explore the four chambers, valves, and electrical conduction system.', 'tags': ['cardiac', 'circulation'], 'steps': 6, 'featured': True},
    {'id': 'sim-brain-cn', 'title': 'Cranial Nerves I–XII', 'category': 'anatomy', 'difficulty': 'Intermediate', 'duration_min': 20, 'description': 'Locate and identify all twelve cranial nerves with functional testing.', 'tags': ['brain', 'nerves'], 'steps': 12},
    {'id': 'sim-suture', 'title': 'Basic Suturing Techniques', 'category': 'surgery', 'difficulty': 'Beginner', 'duration_min': 12, 'description': 'Simple interrupted, running, and vertical mattress sutures.', 'tags': ['skills', 'suturing'], 'steps': 5},
    {'id': 'sim-scrub', 'title': 'Sterile Scrubbing & Gowning', 'category': 'nursing', 'difficulty': 'Beginner', 'duration_min': 8, 'description': 'Correct hand scrub protocol and gowning without contamination.', 'tags': ['sterile', 'ppe'], 'steps': 7},
    {'id': 'sim-cpr', 'title': 'Adult BLS / CPR', 'category': 'emergency', 'difficulty': 'Beginner', 'duration_min': 10, 'description': 'AHA-aligned adult basic life support with defibrillation.', 'tags': ['cpr', 'aed'], 'steps': 8, 'featured': True},
    {'id': 'sim-kidney', 'title': 'Nephron Filtration', 'category': 'physiology', 'difficulty': 'Intermediate', 'duration_min': 18, 'description': 'Interactive nephron: filtration, reabsorption, secretion.', 'tags': ['kidney', 'renal'], 'steps': 6},
    {'id': 'sim-fracture', 'title': 'Long Bone Fracture Fixation', 'category': 'orthopedics', 'difficulty': 'Advanced', 'duration_min': 30, 'description': 'ORIF of a mid-shaft femoral fracture with intramedullary nail.', 'tags': ['fracture', 'orif'], 'steps': 10},
    {'id': 'sim-liver-path', 'title': 'Cirrhotic Liver Histology', 'category': 'pathology', 'difficulty': 'Intermediate', 'duration_min': 15, 'description': 'Compare healthy vs. cirrhotic liver on gross and microscopic views.', 'tags': ['liver', 'histology'], 'steps': 4},
    {'id': 'sim-ctscan', 'title': 'Reading a Head CT', 'category': 'radiology', 'difficulty': 'Intermediate', 'duration_min': 20, 'description': 'Systematic approach to non-contrast head CT interpretation.', 'tags': ['ct', 'head'], 'steps': 6},
    {'id': 'sim-labor', 'title': 'Normal Vaginal Delivery', 'category': 'obstetrics', 'difficulty': 'Intermediate', 'duration_min': 22, 'description': 'Manage the three stages of labor for an uncomplicated delivery.', 'tags': ['labor', 'delivery'], 'steps': 9},
    {'id': 'sim-craniotomy', 'title': 'Burr Hole Craniotomy', 'category': 'neurosurgery', 'difficulty': 'Expert', 'duration_min': 35, 'description': 'Emergency burr hole for evacuation of extradural hematoma.', 'tags': ['brain', 'trauma'], 'steps': 11},
    {'id': 'sim-toothextract', 'title': 'Simple Tooth Extraction', 'category': 'dentistry', 'difficulty': 'Beginner', 'duration_min': 12, 'description': 'Extraction of a mobile mandibular molar under local anesthesia.', 'tags': ['dental', 'extraction'], 'steps': 6},
    {'id': 'sim-iv', 'title': 'Peripheral IV Cannulation', 'category': 'nursing', 'difficulty': 'Beginner', 'duration_min': 8, 'description': 'Insert a peripheral IV cannula with correct aseptic technique.', 'tags': ['iv', 'cannula'], 'steps': 6},
]

APPENDECTOMY_STEPS = [
    {'index': 1, 'title': 'Surgical Hand Scrub', 'instruction': 'Perform a 3-minute chlorhexidine scrub from fingertips to elbows.', 'instrument': 'scrub-brush', 'critical': False, 'safe_actions': ['scrub'], 'mistakes': [{'action': 'skip', 'severity': 'critical', 'consequence': 'Contamination risk'}]},
    {'index': 2, 'title': 'Don Sterile Gloves & Gown', 'instruction': 'Close-gloving technique — avoid touching the outer surface.', 'instrument': 'gloves', 'critical': False, 'safe_actions': ['gown', 'glove']},
    {'index': 3, 'title': 'Drape the Patient', 'instruction': 'Expose the right lower quadrant. Cover surrounding areas.', 'instrument': 'drape', 'critical': False, 'safe_actions': ['drape']},
    {'index': 4, 'title': 'Identify McBurney\'s Point', 'instruction': 'Locate 2/3 the distance from umbilicus to right ASIS.', 'instrument': 'marker', 'critical': False, 'safe_actions': ['mark']},
    {'index': 5, 'title': 'Skin Incision', 'instruction': 'Make a 5 cm oblique incision along Langer\'s lines.', 'instrument': 'scalpel', 'critical': True, 'safe_actions': ['cut-skin'], 'mistakes': [{'action': 'cut-artery', 'severity': 'critical', 'consequence': 'Arterial hemorrhage — BP dropping'}]},
    {'index': 6, 'title': 'Divide Subcutaneous Tissue', 'instruction': 'Use electrocautery to divide fat down to external oblique.', 'instrument': 'cautery', 'critical': False, 'safe_actions': ['cauterize']},
    {'index': 7, 'title': 'Split External Oblique Aponeurosis', 'instruction': 'Split along fibers — do not cut across the muscle.', 'instrument': 'scissors', 'critical': True, 'safe_actions': ['split'], 'mistakes': [{'action': 'cut-across', 'severity': 'moderate', 'consequence': 'Weakened abdominal wall'}]},
    {'index': 8, 'title': 'Locate the Appendix', 'instruction': 'Follow the taeniae coli to the base of the cecum.', 'instrument': 'forceps', 'critical': True, 'safe_actions': ['retract', 'identify']},
    {'index': 9, 'title': 'Ligate the Mesoappendix', 'instruction': 'Clamp, cut, and ligate the appendicular artery in the mesoappendix.', 'instrument': 'clamp', 'critical': True, 'safe_actions': ['clamp', 'ligate'], 'mistakes': [{'action': 'cut-artery', 'severity': 'critical', 'consequence': 'Major bleeding — hypotension'}]},
    {'index': 10, 'title': 'Ligate & Divide the Appendix Base', 'instruction': 'Place two ligatures at the base and divide between them.', 'instrument': 'suture', 'critical': True, 'safe_actions': ['ligate', 'divide']},
    {'index': 11, 'title': 'Close in Layers', 'instruction': 'Close peritoneum, muscle, fascia, and skin separately.', 'instrument': 'needle-holder', 'critical': False, 'safe_actions': ['suture']},
    {'index': 12, 'title': 'Apply Dressing', 'instruction': 'Sterile dressing over the closed wound.', 'instrument': 'dressing', 'critical': False, 'safe_actions': ['dress']},
]

ANATOMY_LAYERS = [
    {'id': 'skin', 'name': 'Skin', 'color': '#F5D0A9', 'default_opacity': 1.0, 'structures': [{'id': 'st-epidermis', 'name': 'Epidermis'}, {'id': 'st-dermis', 'name': 'Dermis'}]},
    {'id': 'fat', 'name': 'Subcutaneous Fat', 'color': '#FDE68A', 'default_opacity': 0.8, 'structures': []},
    {'id': 'muscle', 'name': 'Muscles', 'color': '#B91C1C', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-pectoralis', 'name': 'Pectoralis Major'}, {'id': 'st-rectus', 'name': 'Rectus Abdominis'}, {'id': 'st-quadriceps', 'name': 'Quadriceps'}]},
    {'id': 'nerves', 'name': 'Nerves', 'color': '#FBBF24', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-vagus', 'name': 'Vagus Nerve (CN X)'}, {'id': 'st-median', 'name': 'Median Nerve'}, {'id': 'st-sciatic', 'name': 'Sciatic Nerve'}]},
    {'id': 'arteries', 'name': 'Arteries', 'color': '#DC2626', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-aorta', 'name': 'Aorta'}, {'id': 'st-carotid', 'name': 'Common Carotid'}, {'id': 'st-femoral-a', 'name': 'Femoral Artery'}]},
    {'id': 'veins', 'name': 'Veins', 'color': '#1D4ED8', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-svc', 'name': 'Superior Vena Cava'}, {'id': 'st-jugular', 'name': 'Internal Jugular'}, {'id': 'st-femoral-v', 'name': 'Femoral Vein'}]},
    {'id': 'bones', 'name': 'Bones', 'color': '#F1F5F9', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-skull', 'name': 'Skull'}, {'id': 'st-humerus', 'name': 'Humerus'}, {'id': 'st-femur', 'name': 'Femur'}, {'id': 'st-vertebrae', 'name': 'Vertebrae'}]},
    {'id': 'organs', 'name': 'Organs', 'color': '#9D174D', 'default_opacity': 1.0, 'structures': [
        {'id': 'st-heart', 'name': 'Heart'}, {'id': 'st-lungs', 'name': 'Lungs'}, {'id': 'st-liver', 'name': 'Liver'}, {'id': 'st-kidney', 'name': 'Kidney'}, {'id': 'st-appendix', 'name': 'Appendix'}]},
]

QUIZZES = [
    {'id': 'quiz-anatomy-basics', 'title': 'Anatomy Basics', 'category': 'anatomy', 'difficulty': 'Beginner', 'questions': [
        {'id': 'q1', 'text': 'How many cranial nerves are there?', 'options': ['10', '11', '12', '13'], 'answer': 2, 'explanation': 'There are 12 pairs of cranial nerves.'},
        {'id': 'q2', 'text': 'Which valve is between the left atrium and left ventricle?', 'options': ['Tricuspid', 'Mitral', 'Aortic', 'Pulmonary'], 'answer': 1, 'explanation': 'The mitral (bicuspid) valve is on the left side.'},
        {'id': 'q3', 'text': 'The appendix arises from the...', 'options': ['Ileum', 'Cecum', 'Sigmoid colon', 'Duodenum'], 'answer': 1, 'explanation': 'The appendix arises from the posteromedial cecum.'},
        {'id': 'q4', 'text': 'Which artery supplies the appendix?', 'options': ['Superior mesenteric', 'Ileocolic (appendicular branch)', 'Inferior mesenteric', 'Renal'], 'answer': 1, 'explanation': 'The appendicular artery is a branch of the ileocolic artery.'},
        {'id': 'q5', 'text': "McBurney's point lies...", 'options': ['1/3 from umbilicus to ASIS', '2/3 from umbilicus to ASIS', 'Midway umbilicus to pubis', 'At the xiphoid'], 'answer': 1, 'explanation': '2/3 of the distance from umbilicus to right ASIS.'},
    ]},
    {'id': 'quiz-surgery-safety', 'title': 'Surgical Safety Fundamentals', 'category': 'surgery', 'difficulty': 'Beginner', 'questions': [
        {'id': 'q1', 'text': 'Minimum scrub duration for first case of the day?', 'options': ['30 seconds', '1 minute', '3 minutes', '10 minutes'], 'answer': 2, 'explanation': '3 minutes with chlorhexidine is standard.'},
        {'id': 'q2', 'text': 'Which is the correct order?', 'options': ['Gown → Scrub → Glove', 'Scrub → Gown → Glove', 'Glove → Gown → Scrub', 'Gown → Glove → Scrub'], 'answer': 1, 'explanation': 'Always scrub first, then gown, then glove.'},
        {'id': 'q3', 'text': 'A sterile field extends to which level?', 'options': ['Floor', 'Waist', 'Chest', 'Shoulders'], 'answer': 1, 'explanation': 'Below the waist is considered non-sterile.'},
    ]},
]

CLINICAL_CASES = [
    {'id': 'case-rlq-pain', 'title': '22-year-old with Right Lower Quadrant Pain', 'presenting_complaint': 'Periumbilical pain that migrated to RLQ over 12 hours, nausea, low-grade fever.', 'age': 22, 'sex': 'M',
     'history': ['Pain started 12h ago', 'Anorexia', 'Nausea, one episode of emesis', 'No prior surgeries'],
     'exam': ['Temp 38.1°C', 'HR 96, BP 122/78', 'Tender at McBurney\'s point', 'Positive Rovsing\'s sign', 'Guarding present'],
     'labs': {'WBC': '14.5 (H)', 'Neutrophils': '82%', 'CRP': '48 (H)', 'Urinalysis': 'Normal'},
     'imaging': 'CT abdomen: dilated (11 mm) appendix with periappendiceal fat stranding, no perforation.',
     'diagnosis': 'Acute uncomplicated appendicitis',
     'plan': 'IV fluids, IV cefoxitin, urgent laparoscopic appendectomy.'},
    {'id': 'case-chest-pain', 'title': '58-year-old Male with Crushing Chest Pain', 'presenting_complaint': 'Substernal chest pain radiating to left arm, diaphoresis, 45 minutes.', 'age': 58, 'sex': 'M',
     'history': ['HTN', 'Type 2 DM', '30 pack-year smoker'],
     'exam': ['BP 92/60', 'HR 108', 'SpO2 94%', 'Diaphoretic', 'S4 gallop'],
     'labs': {'Troponin I': '4.8 (H)', 'CK-MB': 'Elevated', 'BNP': 'Normal'},
     'imaging': 'ECG: 3mm ST elevation V2-V4. Echo: anterior wall hypokinesis.',
     'diagnosis': 'Anterior STEMI',
     'plan': 'Aspirin 325mg, clopidogrel load, heparin, urgent PCI within 90 min.'},
]

PROCEDURES = {
    'sim-appendectomy': APPENDECTOMY_STEPS,
    'sim-cpr': [
        {'index': 1, 'title': 'Scene Safety & Responsiveness', 'instruction': 'Ensure the scene is safe, tap and shout to check responsiveness.', 'instrument': 'hands', 'critical': True, 'safe_actions': ['assess']},
        {'index': 2, 'title': 'Call for Help', 'instruction': 'Activate emergency response and request an AED.', 'instrument': 'phone', 'critical': True, 'safe_actions': ['call']},
        {'index': 3, 'title': 'Check Pulse & Breathing', 'instruction': 'Check for carotid pulse for no more than 10 seconds.', 'instrument': 'hands', 'critical': True, 'safe_actions': ['check-pulse']},
        {'index': 4, 'title': 'Begin Chest Compressions', 'instruction': '30 compressions at 100-120/min, depth 5-6 cm on lower half of sternum.', 'instrument': 'hands', 'critical': True, 'safe_actions': ['compress'], 'mistakes':[{'action':'slow','severity':'critical','consequence':'Inadequate perfusion'}]},
        {'index': 5, 'title': 'Open Airway', 'instruction': 'Head-tilt / chin-lift (or jaw-thrust if trauma suspected).', 'instrument': 'hands', 'critical': False, 'safe_actions': ['airway']},
        {'index': 6, 'title': 'Give 2 Rescue Breaths', 'instruction': 'Each breath over 1 second, watch chest rise.', 'instrument': 'bag-mask', 'critical': False, 'safe_actions': ['ventilate']},
        {'index': 7, 'title': 'Attach AED', 'instruction': 'Apply pads, let AED analyze rhythm.', 'instrument': 'aed', 'critical': True, 'safe_actions': ['attach']},
        {'index': 8, 'title': 'Shock if Advised & Resume CPR', 'instruction': 'Clear the patient, deliver shock, immediately resume compressions for 2 minutes.', 'instrument': 'aed', 'critical': True, 'safe_actions': ['shock']},
    ],
    'sim-suture': [
        {'index': 1, 'title': 'Wound Assessment', 'instruction': 'Inspect wound for depth, contamination, and vascular status.', 'instrument': 'forceps', 'critical': False, 'safe_actions': ['assess']},
        {'index': 2, 'title': 'Irrigate & Clean', 'instruction': 'Irrigate with sterile saline until visibly clean.', 'instrument': 'syringe', 'critical': True, 'safe_actions': ['irrigate']},
        {'index': 3, 'title': 'Local Anesthesia', 'instruction': 'Infiltrate lidocaine 1% along wound edges.', 'instrument': 'syringe', 'critical': True, 'safe_actions': ['inject']},
        {'index': 4, 'title': 'Load Needle', 'instruction': 'Grasp needle 2/3 back from tip with needle holder.', 'instrument': 'needle-holder', 'critical': False, 'safe_actions': ['load']},
        {'index': 5, 'title': 'Place Simple Interrupted Suture', 'instruction': 'Enter skin at 90°, exit equidistant on opposite side, 3-4 mm bites.', 'instrument': 'needle-holder', 'critical': True, 'safe_actions': ['suture'], 'mistakes':[{'action':'shallow','severity':'moderate','consequence':'Wound dehiscence risk'}]},
        {'index': 6, 'title': 'Instrument Tie', 'instruction': 'Two throws for the first knot, then alternate. Do not strangulate tissue.', 'instrument': 'needle-holder', 'critical': True, 'safe_actions': ['tie']},
        {'index': 7, 'title': 'Cut Suture', 'instruction': 'Leave 5 mm tails.', 'instrument': 'scissors', 'critical': False, 'safe_actions': ['cut']},
        {'index': 8, 'title': 'Dress Wound', 'instruction': 'Apply sterile non-adherent dressing.', 'instrument': 'dressing', 'critical': False, 'safe_actions': ['dress']},
    ],
    'sim-ctscan': [
        {'index': 1, 'title': 'Verify Study & Orientation', 'instruction': 'Confirm patient ID, study date, and orientation (R/L markers).', 'instrument': 'viewer', 'critical': True, 'safe_actions': ['verify']},
        {'index': 2, 'title': 'Assess Skull & Bone Windows', 'instruction': 'Look for fractures, especially at temporal bones and skull base.', 'instrument': 'viewer', 'critical': True, 'safe_actions': ['scan-bone']},
        {'index': 3, 'title': 'Extra-axial Spaces', 'instruction': 'Rule out epidural/subdural/subarachnoid hemorrhage.', 'instrument': 'viewer', 'critical': True, 'safe_actions': ['scan-extra'], 'mistakes':[{'action':'miss-bleed','severity':'critical','consequence':'Missed intracranial hemorrhage'}]},
        {'index': 4, 'title': 'Brain Parenchyma', 'instruction': 'Assess grey-white differentiation and for hypodensities suggesting infarct.', 'instrument': 'viewer', 'critical': True, 'safe_actions': ['scan-brain']},
        {'index': 5, 'title': 'Ventricles & Midline', 'instruction': 'Check ventricular size, midline shift, effacement of sulci.', 'instrument': 'viewer', 'critical': True, 'safe_actions': ['scan-ventricles']},
        {'index': 6, 'title': 'Formulate Report', 'instruction': 'Structured findings + impression + recommend next study.', 'instrument': 'viewer', 'critical': False, 'safe_actions': ['report']},
    ],
}

PROCEDURE_META = {
    'sim-appendectomy': {'title': 'Open Appendectomy', 'context': 'RLQ · McBurney incision', 'instruments': ['scrub-brush','gloves','drape','marker','scalpel','cautery','scissors','forceps','clamp','suture','needle-holder','dressing']},
    'sim-cpr': {'title': 'Adult BLS / CPR', 'context': 'Emergency Bay · Adult Arrest', 'instruments': ['hands','phone','bag-mask','aed']},
    'sim-suture': {'title': 'Simple Interrupted Suturing', 'context': 'Minor OT · 4 cm forearm laceration', 'instruments': ['forceps','syringe','needle-holder','scissors','dressing']},
    'sim-ctscan': {'title': 'Head CT Interpretation', 'context': 'Radiology Reading Room · Non-contrast Head CT', 'instruments': ['viewer']},
}

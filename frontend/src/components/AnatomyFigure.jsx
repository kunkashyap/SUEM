import React from 'react';

/**
 * Detailed layered anatomical figure — professional medical illustration style.
 * All layers respond to opacity control 0–1.
 */
export default function AnatomyFigure({ layers = {}, className = '', spin = false, onStructureClick }) {
  const op = (id, def = 1) => (layers[id] !== undefined ? layers[id] : def);
  const clickable = (id, cb) => (onStructureClick ? { onClick: () => onStructureClick(id, cb), style: { cursor: 'pointer' } } : {});

  return (
    <svg viewBox="0 0 320 640" className={className} xmlns="http://www.w3.org/2000/svg" style={spin ? { animation: 'anat-spin 24s linear infinite', transformStyle: 'preserve-3d' } : undefined}>
      <defs>
        <linearGradient id="skinG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5D0A9" /><stop offset="50%" stopColor="#EDBB8F" /><stop offset="100%" stopColor="#D6A075" />
        </linearGradient>
        <linearGradient id="muscleG" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#B91C1C" /><stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="boneG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEFCE8" /><stop offset="100%" stopColor="#D4D4C4" />
        </linearGradient>
        <radialGradient id="organG"><stop offset="0%" stopColor="#EF4444" /><stop offset="100%" stopColor="#7C1D1D" /></radialGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="0.6" /></filter>
      </defs>

      {/* Base outline (always faint) */}
      <path d="M160 30 Q205 30 218 78 Q225 115 218 128 Q245 138 258 168 L268 240 L275 320 L272 380 L260 410 Q250 460 240 500 L228 620 L200 620 L196 520 L188 460 L180 430 L172 460 L164 520 L160 620 L132 620 L120 500 Q110 460 100 410 L88 380 L85 320 L92 240 L102 168 Q115 138 142 128 Q135 115 142 78 Q155 30 160 30 Z"
        fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />

      {/* SKIN layer */}
      <g opacity={op('skin', 1)} data-testid="anat-skin" {...clickable('skin', 'Skin')}>
        <ellipse cx="160" cy="78" rx="42" ry="52" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        <path d="M148 125 Q160 132 172 125 L172 148 Q160 154 148 148 Z" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.6" />
        <path d="M108 150 Q160 138 212 150 Q248 168 258 220 L268 320 L262 400 Q252 440 240 470 L215 470 L215 380 L200 380 L200 470 L120 470 L120 380 L105 380 L105 470 L80 470 Q68 440 58 400 L52 320 L62 220 Q72 168 108 150 Z"
          fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        <path d="M62 220 L38 270 L28 340 L20 400 L36 405 L44 340 L58 275 Z" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        <path d="M258 220 L282 270 L292 340 L300 400 L284 405 L276 340 L262 275 Z" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        <path d="M120 470 L112 550 L108 620 L138 620 L142 560 L148 490 Z" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        <path d="M200 470 L208 550 L212 620 L182 620 L178 560 L172 490 Z" fill="url(#skinG)" stroke="#8B4513" strokeWidth="0.8" />
        {/* Facial hint */}
        <g opacity="0.35" stroke="#8B4513" strokeWidth="0.6" fill="none">
          <ellipse cx="148" cy="72" rx="3" ry="4" /><ellipse cx="172" cy="72" rx="3" ry="4" />
          <path d="M156 90 Q160 96 164 90" /><path d="M152 108 Q160 114 168 108" />
        </g>
      </g>

      {/* MUSCLE layer */}
      <g opacity={op('muscle', 0)} data-testid="anat-muscle" {...clickable('muscle', 'Muscle')}>
        {/* Pectoralis */}
        <path d="M115 165 Q160 155 205 165 L200 210 Q180 218 160 218 Q140 218 120 210 Z" fill="url(#muscleG)" />
        <path d="M118 168 Q135 178 152 178 L152 205 Q135 210 122 205 Z" fill="#B91C1C" opacity="0.6" />
        <path d="M168 178 Q185 178 202 168 L198 205 Q185 210 168 205 Z" fill="#B91C1C" opacity="0.6" />
        {/* Rectus abdominis - six-pack */}
        <g fill="url(#muscleG)" stroke="#7F1D1D" strokeWidth="0.5">
          <path d="M144 218 L176 218 L175 250 L145 250 Z" data-testid="st-rectus" />
          <path d="M144 254 L176 254 L175 285 L145 285 Z" />
          <path d="M144 289 L176 289 L175 320 L145 320 Z" />
          <path d="M146 324 L174 324 L172 358 L148 358 Z" />
        </g>
        {/* Biceps */}
        <path d="M58 220 Q52 260 54 300 L68 300 Q72 260 72 220 Z" fill="url(#muscleG)" />
        <path d="M262 220 Q268 260 266 300 L252 300 Q248 260 248 220 Z" fill="url(#muscleG)" />
        {/* Quadriceps */}
        <path d="M118 475 Q112 540 116 605 L142 605 Q148 540 148 475 Z" fill="url(#muscleG)" />
        <path d="M202 475 Q208 540 204 605 L178 605 Q172 540 172 475 Z" fill="url(#muscleG)" />
        {/* Deltoid */}
        <ellipse cx="82" cy="180" rx="18" ry="24" fill="url(#muscleG)" />
        <ellipse cx="238" cy="180" rx="18" ry="24" fill="url(#muscleG)" />
        {/* Face muscles hint */}
        <ellipse cx="160" cy="78" rx="30" ry="42" fill="#B91C1C" opacity="0.45" />
      </g>

      {/* BONES layer */}
      <g opacity={op('bones', 0)} data-testid="anat-bones" {...clickable('bones', 'Skeleton')}>
        {/* Skull */}
        <path d="M138 40 Q160 30 182 40 Q195 60 195 90 Q195 118 178 128 L142 128 Q125 118 125 90 Q125 60 138 40 Z"
          fill="url(#boneG)" stroke="#78716C" strokeWidth="0.8" data-testid="st-skull" />
        <path d="M145 100 L175 100 L170 118 L150 118 Z" fill="#57534E" opacity="0.4" />
        <ellipse cx="148" cy="86" rx="4" ry="5" fill="#1F2937" /><ellipse cx="172" cy="86" rx="4" ry="5" fill="#1F2937" />
        {/* Cervical vertebrae */}
        {[0,1,2,3,4,5,6].map(i => <ellipse key={`c${i}`} cx="160" cy={130 + i*4} rx="6" ry="1.8" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.4" />)}
        {/* Clavicle */}
        <path d="M105 158 Q135 152 158 156 L158 162 Q135 158 105 164 Z" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        <path d="M215 158 Q185 152 162 156 L162 162 Q185 158 215 164 Z" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        {/* Rib cage */}
        <g fill="none" stroke="#78716C" strokeWidth="1.2">
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={`rib${i}`} d={`M${115 + i*0.5} ${175 + i*10} Q160 ${168 + i*10} ${205 - i*0.5} ${175 + i*10}`} />
          ))}
        </g>
        {/* Sternum */}
        <rect x="156" y="170" width="8" height="90" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        {/* Spine - vertebrae */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <ellipse key={`v${i}`} cx="160" cy={175 + i*15} rx="7" ry="4" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" data-testid={i === 0 ? 'st-vertebrae' : undefined} />
        ))}
        {/* Pelvis */}
        <path d="M118 370 Q160 358 202 370 Q212 400 200 430 L180 430 Q170 415 160 415 Q150 415 140 430 L120 430 Q108 400 118 370 Z" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.8" />
        {/* Humerus */}
        <rect x="66" y="185" width="12" height="130" rx="6" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.6" data-testid="st-humerus" />
        <rect x="242" y="185" width="12" height="130" rx="6" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.6" />
        {/* Radius/Ulna */}
        <rect x="44" y="315" width="6" height="90" rx="3" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        <rect x="54" y="315" width="6" height="90" rx="3" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        <rect x="260" y="315" width="6" height="90" rx="3" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        <rect x="270" y="315" width="6" height="90" rx="3" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.5" />
        {/* Femur */}
        <rect x="124" y="435" width="14" height="145" rx="7" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.6" data-testid="st-femur" />
        <rect x="182" y="435" width="14" height="145" rx="7" fill="url(#boneG)" stroke="#78716C" strokeWidth="0.6" />
        {/* Tibia/Fibula */}
        <rect x="126" y="585" width="8" height="0" fill="url(#boneG)" />
      </g>

      {/* ORGANS layer */}
      <g opacity={op('organs', 0)} data-testid="anat-organs">
        {/* Heart */}
        <path d="M148 180 Q135 175 132 195 Q132 215 152 230 Q162 235 172 230 Q192 215 192 195 Q189 175 176 180 Q168 178 162 186 Q156 178 148 180 Z"
          fill="url(#organG)" stroke="#7F1D1D" strokeWidth="0.8" data-testid="st-heart" {...clickable('st-heart', 'Heart')} />
        <path d="M162 186 L162 226 M148 195 Q168 205 176 195" stroke="#450A0A" strokeWidth="0.5" fill="none" opacity="0.6" />
        {/* Lungs */}
        <path d="M118 175 Q108 195 108 240 Q112 275 138 275 Q148 275 148 245 L148 195 Q140 175 118 175 Z"
          fill="#EC4899" opacity="0.7" stroke="#831843" strokeWidth="0.6" data-testid="st-lungs" {...clickable('st-lungs', 'Lungs')} />
        <path d="M202 175 Q212 195 212 240 Q208 275 182 275 Q172 275 172 245 L172 195 Q180 175 202 175 Z"
          fill="#EC4899" opacity="0.7" stroke="#831843" strokeWidth="0.6" />
        {/* Liver */}
        <path d="M118 270 Q118 310 165 315 L200 315 Q205 280 185 268 Z" fill="#7C2D12" opacity="0.9" stroke="#431407" strokeWidth="0.6" data-testid="st-liver" {...clickable('st-liver', 'Liver')} />
        {/* Stomach */}
        <path d="M172 285 Q195 285 200 305 Q198 328 178 325 Q168 320 168 305 Z" fill="#F97316" opacity="0.85" stroke="#7C2D12" strokeWidth="0.5" />
        {/* Intestines */}
        <g stroke="#DC2626" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M132 335 Q118 350 128 365 Q142 372 152 358 Q160 344 148 335" />
          <path d="M170 345 Q190 350 188 368 Q180 384 162 378 Q150 370 158 355" />
          <path d="M140 385 Q155 395 170 385 Q182 372 168 365" />
        </g>
        {/* Kidney - right */}
        <path d="M112 310 Q106 325 112 348 Q124 352 128 335 Q128 320 120 308 Z" fill="#7C2D12" opacity="0.9" data-testid="st-kidney" {...clickable('st-kidney', 'Kidney')} />
        <path d="M208 310 Q214 325 208 348 Q196 352 192 335 Q192 320 200 308 Z" fill="#7C2D12" opacity="0.9" />
        {/* Appendix */}
        <path d="M182 388 L188 415 L186 430 L180 428 L178 410 Z" fill="#DC2626" data-testid="st-appendix" {...clickable('st-appendix', 'Appendix')} />
        {/* Bladder */}
        <ellipse cx="160" cy="410" rx="18" ry="12" fill="#FDE68A" opacity="0.85" stroke="#92400E" strokeWidth="0.5" />
      </g>

      {/* ARTERIES */}
      <g opacity={op('arteries', 0)} data-testid="anat-arteries" stroke="#DC2626" fill="none" strokeLinecap="round">
        <path d="M160 130 L160 175" strokeWidth="3" data-testid="st-carotid" />
        <path d="M160 175 Q158 220 156 320 L152 400" strokeWidth="4" data-testid="st-aorta" />
        <path d="M156 320 L128 400 L120 500 L116 600" strokeWidth="2.5" data-testid="st-femoral-a" />
        <path d="M156 320 L188 400 L200 500 L204 600" strokeWidth="2.5" />
        <path d="M160 165 L108 190 L72 250 L58 320 L48 400" strokeWidth="1.8" />
        <path d="M160 165 L212 190 L248 250 L262 320 L272 400" strokeWidth="1.8" />
        <path d="M160 175 L145 210 L125 250" strokeWidth="1.2" />
        <path d="M160 175 L175 210 L195 250" strokeWidth="1.2" />
      </g>

      {/* VEINS */}
      <g opacity={op('veins', 0)} data-testid="anat-veins" stroke="#1D4ED8" fill="none" strokeLinecap="round">
        <path d="M164 130 L164 175" strokeWidth="3" data-testid="st-jugular" />
        <path d="M164 175 Q166 220 168 320 L164 400" strokeWidth="4" data-testid="st-svc" />
        <path d="M164 320 L136 400 L128 500 L124 600" strokeWidth="2.5" data-testid="st-femoral-v" />
        <path d="M164 320 L196 400 L208 500 L212 600" strokeWidth="2.5" />
        <path d="M164 165 L112 195 L76 255 L62 325" strokeWidth="1.8" />
        <path d="M164 165 L216 195 L252 255 L266 325" strokeWidth="1.8" />
      </g>

      {/* NERVES */}
      <g opacity={op('nerves', 0)} data-testid="anat-nerves" stroke="#F59E0B" fill="none" strokeDasharray="4 3" strokeLinecap="round">
        <path d="M160 90 L160 170 L162 260 L165 360 L170 470 L172 600" strokeWidth="1.6" data-testid="st-vagus" />
        <path d="M160 170 L108 200 L60 270 L42 340" strokeWidth="1.4" data-testid="st-median" />
        <path d="M160 170 L212 200 L260 270 L278 340" strokeWidth="1.4" />
        <path d="M165 400 L130 490 L118 600" strokeWidth="1.4" data-testid="st-sciatic" />
        <path d="M165 400 L200 490 L212 600" strokeWidth="1.4" />
      </g>

      {/* Highlight ring for selected element (optional overlay) */}
    </svg>
  );
}

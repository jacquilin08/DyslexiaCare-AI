/** Original SVG artwork — companions, dragon growth stages, egg, hero scene. No emoji, no external images. */

export type CreatureKind = "dragon" | "fox" | "owl" | "rabbit";

export function DragonArt({ stage = 2, className = "" }: { stage?: number; className?: string }) {
  const wing = stage >= 2;
  const horns = stage >= 3;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Dragon companion">
      <defs>
        <linearGradient id="dgBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--arcane)" />
        </linearGradient>
        <radialGradient id="dgGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="105" r="82" fill="url(#dgGlow)" />
      {wing && (
        <g opacity="0.95">
          <path d="M96 96 C60 60, 26 66, 20 92 C42 88, 60 96, 74 116 Z" fill="var(--arcane)" opacity="0.85" />
          <path d="M104 96 C140 60, 174 66, 180 92 C158 88, 140 96, 126 116 Z" fill="var(--arcane)" opacity="0.85" />
        </g>
      )}
      <path
        d="M100 150 C74 150, 58 132, 58 110 C58 84, 76 66, 100 66 C124 66, 142 84, 142 110 C142 132, 126 150, 100 150 Z"
        fill="url(#dgBody)"
      />
      <path d="M100 146 C86 146, 76 134, 76 120 C76 108, 86 100, 100 100 C114 100, 124 108, 124 120 C124 134, 114 146, 100 146 Z" fill="var(--gold)" opacity="0.35" />
      {horns && (
        <>
          <path d="M84 70 L74 46 L92 62 Z" fill="var(--gold)" />
          <path d="M116 70 L126 46 L108 62 Z" fill="var(--gold)" />
        </>
      )}
      <circle cx="88" cy="102" r="6.5" fill="var(--card)" />
      <circle cx="112" cy="102" r="6.5" fill="var(--card)" />
      <circle cx="89" cy="103" r="3" fill="var(--ink)" />
      <circle cx="113" cy="103" r="3" fill="var(--ink)" />
      <path d="M92 122 Q100 130 108 122" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M142 128 C166 132, 172 152, 156 164 C160 150, 150 142, 138 142 Z" fill="var(--primary)" opacity="0.9" />
      {stage >= 4 && (
        <g opacity="0.9">
          <circle cx="44" cy="140" r="4" fill="var(--gold)" />
          <circle cx="160" cy="60" r="3" fill="var(--gold)" />
          <circle cx="34" cy="70" r="3" fill="var(--gold)" />
        </g>
      )}
    </svg>
  );
}

export function EggArt({
  crackLevel = 0,
  className = "",
}: {
  crackLevel?: 0 | 1 | 2 | 3;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 200" className={className} role="img" aria-label="Dragon egg">
      <defs>
        <linearGradient id="eggShell" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="var(--parchment)" />
          <stop offset="60%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
        <radialGradient id="eggAura" cx="50%" cy="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="112" rx="76" ry="86" fill="url(#eggAura)" />
      <path
        d="M80 16 C112 16, 140 62, 140 110 C140 156, 113 190, 80 190 C47 190, 20 156, 20 110 C20 62, 48 16, 80 16 Z"
        fill="url(#eggShell)"
      />
      <path d="M52 70 q28 14 56 0" stroke="var(--card)" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M44 104 q36 16 72 0" stroke="var(--card)" strokeWidth="5" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M50 140 q30 14 60 0" stroke="var(--card)" strokeWidth="5" fill="none" opacity="0.25" strokeLinecap="round" />
      {crackLevel >= 1 && (
        <path d="M80 40 L70 72 L88 88 L74 118" stroke="var(--card)" strokeWidth="4" fill="none" strokeLinecap="round" />
      )}
      {crackLevel >= 2 && (
        <>
          <path d="M74 118 L92 136 L78 166" stroke="var(--card)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M70 72 L44 84" stroke="var(--card)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M88 88 L118 78" stroke="var(--card)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}
      {crackLevel >= 3 && (
        <path
          d="M20 112 L44 100 L62 118 L82 98 L102 120 L124 100 L140 112 L140 118 L20 118 Z"
          fill="var(--background)"
          opacity="0.9"
        />
      )}
    </svg>
  );
}

export function CompanionArt({ kind, className = "" }: { kind: CreatureKind; className?: string }) {
  if (kind === "dragon") return <DragonArt stage={3} className={className} />;
  if (kind === "fox")
    return (
      <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Fox companion">
        <circle cx="100" cy="106" r="76" fill="var(--accent)" opacity="0.35" />
        <path d="M46 66 L60 22 L92 54 Z" fill="var(--primary)" />
        <path d="M154 66 L140 22 L108 54 Z" fill="var(--primary)" />
        <path d="M100 156 C66 156, 46 128, 46 100 C46 74, 70 54, 100 54 C130 54, 154 74, 154 100 C154 128, 134 156, 100 156 Z" fill="var(--primary)" />
        <path d="M100 156 C82 156, 70 140, 70 126 C70 112, 84 104, 100 104 C116 104, 130 112, 130 126 C130 140, 118 156, 100 156 Z" fill="var(--parchment)" />
        <circle cx="84" cy="100" r="6" fill="var(--ink)" />
        <circle cx="116" cy="100" r="6" fill="var(--ink)" />
        <circle cx="100" cy="126" r="6" fill="var(--ink)" />
      </svg>
    );
  if (kind === "owl")
    return (
      <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Owl companion">
        <circle cx="100" cy="106" r="76" fill="var(--accent)" opacity="0.35" />
        <path d="M100 170 C64 170, 44 140, 44 104 C44 66, 68 40, 100 40 C132 40, 156 66, 156 104 C156 140, 136 170, 100 170 Z" fill="var(--arcane)" />
        <circle cx="80" cy="94" r="22" fill="var(--parchment)" />
        <circle cx="120" cy="94" r="22" fill="var(--parchment)" />
        <circle cx="80" cy="94" r="9" fill="var(--ink)" />
        <circle cx="120" cy="94" r="9" fill="var(--ink)" />
        <path d="M100 108 L90 122 L110 122 Z" fill="var(--gold)" />
        <path d="M62 52 L78 66 M138 52 L122 66" stroke="var(--arcane)" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Rabbit companion">
      <circle cx="100" cy="112" r="74" fill="var(--accent)" opacity="0.35" />
      <ellipse cx="78" cy="52" rx="14" ry="38" fill="var(--muted-foreground)" opacity="0.55" />
      <ellipse cx="122" cy="52" rx="14" ry="38" fill="var(--muted-foreground)" opacity="0.55" />
      <circle cx="100" cy="118" r="54" fill="var(--parchment)" />
      <circle cx="84" cy="112" r="6" fill="var(--ink)" />
      <circle cx="116" cy="112" r="6" fill="var(--ink)" />
      <path d="M92 132 Q100 140 108 132" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export type SkillKey = "reading" | "phonics" | "spelling" | "vocabulary" | "comprehension";

/**
 * Small themed island illustration for a level card, keyed to its
 * skill area. Same hand-drawn SVG style as the rest of art.tsx —
 * no external images, no emoji.
 */
export function IslandIcon({ skillKey, className = "" }: { skillKey: SkillKey; className?: string }) {
  const common = (
    <>
      <ellipse cx="32" cy="46" rx="26" ry="8" fill="url(#islandBase)" />
      <path d="M10 47 L32 64 L54 47 Z" fill="var(--arcane)" opacity="0.65" />
    </>
  );
  const defs = (
    <defs>
      <linearGradient id="islandBase" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--success)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--arcane)" stopOpacity="0.85" />
      </linearGradient>
    </defs>
  );

  if (skillKey === "reading") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Island with an open book">
        {defs}
        {common}
        <path d="M20 40 V22 Q32 16 32 22 V40 Q32 34 20 34 Z" fill="var(--parchment)" />
        <path d="M44 40 V22 Q32 16 32 22 V40 Q32 34 44 34 Z" fill="var(--parchment)" />
        <path d="M22 26 H30 M22 31 H30 M34 26 H42 M34 31 H42" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    );
  }

  if (skillKey === "phonics") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Island with a chiming bell">
        {defs}
        {common}
        <path d="M32 14 C24 14, 22 24, 22 30 C22 34, 20 36, 18 38 H46 C44 36, 42 34, 42 30 C42 24, 40 14, 32 14 Z" fill="var(--gold)" />
        <circle cx="32" cy="41" r="3.4" fill="var(--gold)" />
        <path d="M12 24 Q16 28 12 32 M52 24 Q48 28 52 32" stroke="var(--gold)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  if (skillKey === "spelling") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Island with a quill and inkwell">
        {defs}
        {common}
        <path d="M24 40 L42 14 L46 18 L28 44 Z" fill="var(--primary)" />
        <path d="M42 14 L46 18" stroke="var(--gold)" strokeWidth="1.6" />
        <ellipse cx="24" cy="42" rx="6" ry="4" fill="var(--ink)" opacity="0.85" />
      </svg>
    );
  }

  if (skillKey === "vocabulary") {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Island with a treasure chest">
        {defs}
        {common}
        <rect x="18" y="26" width="28" height="16" rx="2" fill="var(--primary)" />
        <path d="M18 26 Q32 16 46 26" fill="none" stroke="var(--gold)" strokeWidth="2.4" />
        <rect x="29" y="30" width="6" height="6" rx="1.4" fill="var(--gold)" />
      </svg>
    );
  }

  // comprehension
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Island with a glowing scroll">
      {defs}
      {common}
      <rect x="20" y="16" width="24" height="26" rx="3" fill="var(--parchment)" />
      <circle cx="20" cy="20" r="3.4" fill="var(--gold)" />
      <circle cx="44" cy="38" r="3.4" fill="var(--gold)" />
      <path d="M24 24 H40 M24 29 H40 M24 34 H34" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  const stars = [
    [40, 40],
    [120, 24],
    [230, 52],
    [340, 30],
    [420, 70],
    [70, 110],
    [300, 96],
    [470, 34],
  ];
  return (
    <svg viewBox="0 0 520 420" className={className} role="img" aria-label="Floating learning islands with a dragon and glowing path">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--arcane)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="isle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--success)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--arcane)" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="520" height="420" rx="26" fill="url(#sky)" />
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.8} fill="var(--gold)" className="animate-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      <path
        d="M90 320 C160 300, 170 250, 240 232 C310 214, 330 168, 400 148"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeDasharray="10 12"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* islands */}
      <g className="animate-float-soft">
        <ellipse cx="96" cy="330" rx="62" ry="18" fill="url(#isle)" />
        <path d="M40 332 L96 392 L152 332 Z" fill="var(--arcane)" opacity="0.7" />
        <rect x="76" y="300" width="40" height="26" rx="5" fill="var(--card)" />
        <rect x="76" y="300" width="40" height="8" rx="4" fill="var(--primary)" />
      </g>
      <g className="animate-float-soft" style={{ animationDelay: "1.2s" }}>
        <ellipse cx="246" cy="240" rx="54" ry="16" fill="url(#isle)" />
        <path d="M198 242 L246 292 L294 242 Z" fill="var(--arcane)" opacity="0.7" />
        <g transform="translate(226,196) scale(0.34)">
          <EggArt crackLevel={1} />
        </g>
      </g>
      <g className="animate-float-soft" style={{ animationDelay: "2.1s" }}>
        <ellipse cx="404" cy="158" rx="58" ry="17" fill="url(#isle)" />
        <path d="M352 160 L404 214 L456 160 Z" fill="var(--arcane)" opacity="0.7" />
        <g transform="translate(348,58) scale(0.56)">
          <DragonArt stage={3} />
        </g>
      </g>
      {/* level markers */}
      {[
        [150, 296],
        [318, 206],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="var(--card)" stroke="var(--primary)" strokeWidth="3" />
          <text x={x} y={y! + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--primary)">
            {i + 2}
          </text>
        </g>
      ))}
      {/* particles */}
      {[
        [180, 200],
        [280, 320],
        [440, 250],
        [120, 240],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--primary)" opacity="0.5" className="animate-float-soft" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
    </svg>
  );
}
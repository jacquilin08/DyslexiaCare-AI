/**
 * Original SVG artwork — realistic dragon companion, hatching egg, hero scene.
 * The dragon is a fully hand-drawn creature: snout, curved horns, membrane wings
 * with finger bones, spine ridge, claws, tail spade and ember fire. No emoji,
 * no external images.
 */

export type CreatureKind = "dragon" | "fox" | "owl" | "rabbit";

/**
 * A detailed, realistic dragon rendered in the app's design tokens.
 * Gains features as the stage grows:
 *  - stage 0–1: hatchling — round, big eyes, nub wings, no horns
 *  - stage 2:   young — full membrane wings + first horns
 *  - stage 3:   adult — secondary horns, shoulder spikes, belly plates
 *  - stage 4:   sovereign — crown spikes, fire core, ember aura
 */
export type DragonMood = "neutral" | "happy" | "sad";

export function DragonArt({
  stage = 2,
  mood = "neutral",
  className = "",
}: {
  stage?: number;
  mood?: DragonMood;
  className?: string;
}) {
  const hatchling = stage <= 1;
  const hasWings = stage >= 2;
  const hasHorns = stage >= 2;
  const hasSecondaryHorns = stage >= 3;
  const hasSpikes = stage >= 3;
  const hasCrown = stage >= 4;
  const hasFire = stage >= 4;
  const hasEmbers = stage >= 3;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${mood !== "neutral" ? "animate-grow-pop" : ""}`}
      role="img"
      aria-label={`Dragon companion, ${mood}`}
    >
      <defs>
        <linearGradient id="rdBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--arcane)" />
        </linearGradient>
        <linearGradient id="rdBodyLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="rdAura" cx="50%" cy="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rdWing" cx="45%" cy="30%">
          <stop offset="0%" stopColor="var(--arcane)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--arcane)" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="rdFire" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.85" />
          <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow aura */}
      <circle cx="100" cy="100" r="88" fill="url(#rdAura)" />

      {/* Fire core — sovereign */}
      {hasFire && <circle cx="100" cy="112" r="46" fill="url(#rdFire)" />}

      {/* Ember particles */}
      {hasEmbers && (
        <g className="animate-twinkle">
          <circle cx="34" cy="52" r="2.8" fill="var(--gold)" />
          <circle cx="166" cy="58" r="2.3" fill="var(--gold)" />
          <circle cx="26" cy="122" r="2" fill="var(--gold)" opacity="0.8" />
          <circle cx="176" cy="118" r="2.5" fill="var(--gold)" opacity="0.8" />
          <circle cx="52" cy="32" r="1.9" fill="var(--primary)" opacity="0.7" />
          <circle cx="148" cy="34" r="2.1" fill="var(--primary)" opacity="0.7" />
        </g>
      )}

      {/* Tail */}
      <path
        d={
          hatchling
            ? "M100 158 C 88 162, 74 160, 64 150 C 56 141, 54 130, 57 120 L 64 124 C 61 132, 63 140, 70 146 C 80 154, 94 155, 100 150 Z"
            : "M100 168 C 82 174, 56 170, 40 154 C 27 140, 24 122, 30 108 L 40 114 C 35 126, 37 140, 48 149 C 62 160, 84 164, 100 158 Z"
        }
        fill="url(#rdBody)"
      />
      {/* Tail spade */}
      <path
        d={
          hatchling
            ? "M57 120 L 48 110 L 44 118 L 52 127 L 62 128 Z"
            : "M30 108 L 14 94 L 8 106 L 18 118 L 34 120 Z"
        }
        fill="var(--gold)"
        opacity="0.9"
      />

      {/* Wings */}
      {hasWings ? (
        <g opacity={stage === 2 ? 0.95 : 1}>
          {/* Left wing */}
          <path
            d="M55 92 C 44 70, 30 55, 20 44 C 18 54, 15 62, 12 70 C 20 74, 28 80, 32 90 C 40 98, 50 104, 57 110 C 60 102, 60 96, 55 92 Z"
            fill="url(#rdWing)"
          />
          <path d="M55 92 C 46 78, 32 62, 20 44" stroke="var(--arcane)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M40 76 C 28 74, 20 72, 12 70" stroke="var(--arcane)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M50 96 C 42 94, 37 92, 32 90" stroke="var(--arcane)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          {/* Right wing */}
          <path
            d="M145 92 C 156 70, 170 55, 180 44 C 182 54, 185 62, 188 70 C 180 74, 172 80, 168 90 C 160 98, 150 104, 143 110 C 140 102, 140 96, 145 92 Z"
            fill="url(#rdWing)"
          />
          <path d="M145 92 C 154 78, 168 62, 180 44" stroke="var(--arcane)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M160 76 C 172 74, 180 72, 188 70" stroke="var(--arcane)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M150 96 C 158 94, 163 92, 168 90" stroke="var(--arcane)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        /* Hatchling nub wings */
        <g opacity="0.7">
          <path d="M62 92 C 50 80, 42 68, 40 58 C 48 64, 56 74, 60 86 L 62 92 Z" fill="url(#rdWing)" />
          <path d="M138 92 C 150 80, 158 68, 160 58 C 152 64, 144 74, 140 86 L 138 92 Z" fill="url(#rdWing)" />
        </g>
      )}

      {/* Back/claw feet */}
      <g>
        <path d="M76 138 C 72 150, 66 158, 58 162 L 56 154 C 62 151, 66 144, 68 136 Z" fill="var(--arcane)" opacity="0.8" />
        <path d="M68 158 L 58 166 L 70 162 Z" fill="var(--parchment)" />
        <path d="M70 163 L 62 172 L 74 167 Z" fill="var(--parchment)" />
        <path d="M74 166 L 68 175 L 78 169 Z" fill="var(--parchment)" />
        <path d="M124 138 C 128 150, 134 158, 142 162 L 144 154 C 138 151, 134 144, 132 136 Z" fill="var(--arcane)" opacity="0.8" />
        <path d="M132 158 L 142 166 L 130 162 Z" fill="var(--parchment)" />
        <path d="M130 163 L 138 172 L 126 167 Z" fill="var(--parchment)" />
        <path d="M126 166 L 132 175 L 122 169 Z" fill="var(--parchment)" />
      </g>

      {/* Body */}
      <path
        d={
          hatchling
            ? "M100 160 C 84 160, 70 146, 68 126 C 66 108, 74 94, 88 88 L 112 88 C 126 94, 134 108, 132 126 C 130 146, 116 160, 100 160 Z"
            : "M100 166 C 82 166, 63 148, 61 122 C 59 100, 71 83, 87 77 L 113 77 C 129 83, 141 100, 139 122 C 137 148, 118 166, 100 166 Z"
        }
        fill="url(#rdBody)"
      />

      {/* Chest highlights — pectorals */}
      <path d="M74 104 C 78 116, 88 124, 100 126 C 98 116, 92 108, 86 100 Z" fill="var(--parchment)" opacity="0.18" />
      <path d="M126 104 C 122 116, 112 124, 100 126 C 102 116, 108 108, 114 100 Z" fill="var(--parchment)" opacity="0.18" />

      {/* Belly plates — adult+ */}
      {!hatchling && (
        <g fill="none" stroke="var(--gold)" strokeWidth="1.6" opacity="0.5" strokeLinecap="round">
          <path d="M86 132 Q100 140 114 132" />
          <path d="M88 142 Q100 149 112 142" />
          <path d="M90 152 Q100 158 110 152" />
        </g>
      )}

      {/* Scale texture */}
      <g fill="none" stroke="var(--arcane)" strokeWidth="1.4" opacity="0.4" strokeLinecap="round">
        <path d="M70 118 Q76 112 82 118" />
        <path d="M74 126 Q80 120 86 126" />
        <path d="M118 118 Q124 112 130 118" />
        <path d="M114 126 Q120 120 126 126" />
        <path d="M92 96 Q96 92 100 96 Q104 92 108 96" />
      </g>

      {/* Front arms + claws */}
      <g>
        <path d="M78 100 C 66 112, 60 126, 64 140 C 70 144, 79 140, 81 131 C 80 121, 79 110, 79 100 Z" fill="var(--arcane)" opacity="0.85" />
        <path d="M62 139 L 52 146 L 64 144 Z" fill="var(--parchment)" />
        <path d="M66 143 L 58 152 L 69 148 Z" fill="var(--parchment)" />
        <path d="M70 146 L 65 156 L 74 150 Z" fill="var(--parchment)" />
        <path d="M122 100 C 134 112, 140 126, 136 140 C 130 144, 121 140, 119 131 C 120 121, 121 110, 121 100 Z" fill="var(--arcane)" opacity="0.85" />
        <path d="M138 139 L 148 146 L 136 144 Z" fill="var(--parchment)" />
        <path d="M134 143 L 142 152 L 131 148 Z" fill="var(--parchment)" />
        <path d="M130 146 L 135 156 L 126 150 Z" fill="var(--parchment)" />
      </g>

      {/* Neck */}
      <path d="M86 80 C 82 64, 83 52, 91 44 L 109 44 C 117 52, 118 64, 114 80 Z" fill="url(#rdBody)" />

      {/* Neck plates — adult+ */}
      {!hatchling && (
        <path
          d="M92 52 L 94 42 L 98 50 M106 42 L 108 52 L 102 44"
          stroke="var(--gold)"
          strokeWidth="1.6"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
      )}

      {/* Head */}
      <g>
        {/* Jaw */}
        <path
          d={
            hatchling
              ? "M86 58 C 78 62, 74 68, 76 74 C 82 80, 118 80, 124 74 C 126 68, 122 62, 114 58 Z"
              : "M85 56 C 75 60, 70 70, 74 78 C 82 84, 118 84, 126 78 C 130 70, 125 60, 115 56 Z"
          }
          fill="url(#rdBodyLight)"
        />
        {/* Skull */}
        <path
          d={
            hatchling
              ? "M100 28 C 90 28, 83 36, 84 45 C 85 53, 90 59, 97 62 L 103 62 C 110 59, 115 53, 116 45 C 117 36, 110 28, 100 28 Z"
              : "M100 24 C 88 24, 79 33, 80 44 C 81 52, 86 59, 94 63 L 106 63 C 114 59, 119 52, 120 44 C 121 33, 112 24, 100 24 Z"
          }
          fill="url(#rdBody)"
        />
        {/* Crown spikes — sovereign */}
        {hasCrown && <path d="M91 25 L 86 12 L 96 21 L 100 8 L 104 21 L 114 12 L 109 25 Z" fill="var(--gold)" />}
        {/* Nostrils */}
        <ellipse cx="92" cy="66" rx="3" ry="2" fill="var(--background)" opacity="0.5" />
        <ellipse cx="108" cy="66" rx="3" ry="2" fill="var(--background)" opacity="0.5" />
        {/* Fangs */}
        <path d="M80 72 L 76 80 L 85 75 Z" fill="var(--parchment)" />
        <path d="M120 72 L 124 80 L 115 75 Z" fill="var(--parchment)" />

        {/* Mouth — reacts to mood */}
        {mood === "happy" && (
          <path d="M91 71 C 95 76, 105 76, 109 71" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {mood === "sad" && (
          <path d="M91 76 C 95 71, 105 71, 109 76" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Brows — reinforce mood, sit above the eyes */}
        {mood === "happy" && (
          <>
            <path d="M82 41 C 85 38, 90 38, 93 40" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
            <path d="M118 41 C 115 38, 110 38, 107 40" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
          </>
        )}
        {mood === "sad" && (
          <>
            <path d="M82 40 C 86 43, 91 44, 94 42" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
            <path d="M118 40 C 114 43, 109 44, 106 42" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
            {/* single tear */}
            <path d="M85 55 C 84 59, 84 63, 86 66 C 88 63, 88 59, 86 55 Z" fill="var(--arcane)" opacity="0.85" />
          </>
        )}

        {/* Ear frills */}
        <path d="M79 40 L 66 32 L 64 44 L 73 49 Z" fill="var(--arcane)" opacity="0.75" />
        <path d="M121 40 L 134 32 L 136 44 L 127 49 Z" fill="var(--arcane)" opacity="0.75" />

        {/* Eyes — almond socket, glowing iris, slit pupil */}
        <g>
          <path d="M87 44 C 81 46, 80 53, 85 56 C 90 55, 92 49, 87 44 Z" fill="var(--foreground)" opacity="0.9" />
          <ellipse cx="87" cy="50" rx="3.4" ry="2.6" fill="var(--gold)" />
          <ellipse cx="87" cy="50" rx="0.9" ry="2.4" fill="var(--ink)" />
          <path d="M113 44 C 119 46, 120 53, 115 56 C 110 55, 108 49, 113 44 Z" fill="var(--foreground)" opacity="0.9" />
          <ellipse cx="113" cy="50" rx="3.4" ry="2.6" fill="var(--gold)" />
          <ellipse cx="113" cy="50" rx="0.9" ry="2.4" fill="var(--ink)" />
        </g>

        {/* Main horns */}
        {hasHorns && (
          <>
            <path d="M88 36 C 75 22, 58 18, 46 10 C 60 14, 76 22, 87 31 Z" fill="var(--gold)" opacity="0.95" />
            <path d="M112 36 C 125 22, 142 18, 154 10 C 140 14, 124 22, 113 31 Z" fill="var(--gold)" opacity="0.95" />
          </>
        )}
        {/* Secondary horns — adult+ */}
        {hasSecondaryHorns && (
          <>
            <path d="M94 32 C 86 20, 74 16, 62 12 C 74 14, 86 22, 92 30 Z" fill="var(--arcane)" opacity="0.8" />
            <path d="M106 32 C 114 20, 126 16, 138 12 C 126 14, 114 22, 108 30 Z" fill="var(--arcane)" opacity="0.8" />
          </>
        )}

        {/* Shoulder spikes — adult+ */}
        {hasSpikes && (
          <>
            <path d="M70 82 L 58 72 L 66 84 L 52 80 L 62 90 L 46 92 L 60 98 Z" fill="var(--gold)" opacity="0.85" />
            <path d="M130 82 L 142 72 L 134 84 L 148 80 L 138 90 L 154 92 L 140 98 Z" fill="var(--gold)" opacity="0.85" />
          </>
        )}
      </g>

      {/* Fire breath swirl — sovereign */}
      {hasFire && (
        <g opacity="0.9">
          <path d="M100 74 C 92 66, 96 58, 100 52 C 104 58, 108 66, 100 74 Z" fill="var(--gold)" />
          <path d="M100 52 C 94 46, 90 38, 94 30 C 100 34, 106 40, 100 52 Z" fill="var(--gold)" opacity="0.55" />
          <circle cx="92" cy="30" r="2.5" fill="var(--gold)" opacity="0.8" />
          <circle cx="108" cy="26" r="2" fill="var(--gold)" opacity="0.7" />
        </g>
      )}
    </svg>
  );
}

/**
 * A dragon egg with realistic 3D shading, shell mottling, a specular highlight,
 * and dramatic glowing cracks that open to reveal the hatchling inside.
 */
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
        <radialGradient id="eggShellReal" cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor="var(--parchment)" />
          <stop offset="50%" stopColor="var(--parchment)" />
          <stop offset="74%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--primary)" />
        </radialGradient>
        <radialGradient id="eggAura" cx="50%" cy="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eggGlow" cx="50%" cy="55%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="80" cy="114" rx="78" ry="88" fill="url(#eggAura)" />

      {/* Egg body */}
      <path
        d="M80 14 C114 14, 142 62, 142 112 C142 158, 114 192, 80 192 C46 192, 18 158, 18 112 C18 62, 46 14, 80 14 Z"
        fill="url(#eggShellReal)"
      />

      {/* Specular highlight */}
      <ellipse cx="58" cy="52" rx="12" ry="20" fill="var(--foreground)" opacity="0.1" transform="rotate(-18 58 52)" />
      <path
        d="M50 58 C 58 38, 72 26, 86 24 C 74 30, 62 42, 56 58 C 53 64, 51 70, 50 74 C 51 66, 50 62, 50 58 Z"
        fill="var(--foreground)"
        opacity="0.14"
      />

      {/* Shell mottling */}
      <g fill="var(--primary)" opacity="0.18">
        <ellipse cx="52" cy="80" rx="3" ry="4" />
        <ellipse cx="108" cy="64" rx="2.5" ry="3.5" />
        <ellipse cx="68" cy="132" rx="3.5" ry="4.5" />
        <ellipse cx="118" cy="122" rx="3" ry="4" />
        <ellipse cx="96" cy="92" rx="2" ry="2.8" />
        <ellipse cx="60" cy="162" rx="2.5" ry="3" />
        <ellipse cx="100" cy="154" rx="2.8" ry="3.6" />
      </g>
      <g fill="var(--parchment)" opacity="0.4">
        <ellipse cx="44" cy="114" rx="2.5" ry="3" />
        <ellipse cx="128" cy="92" rx="2" ry="2.6" />
        <ellipse cx="92" cy="58" rx="2" ry="2.5" />
        <ellipse cx="120" cy="150" rx="2.2" ry="2.8" />
      </g>

      {/* Crack level 1 — first hairline cracks */}
      {crackLevel >= 1 && (
        <>
          <path
            d="M80 36 L70 68 L86 84 L72 116"
            stroke="var(--card)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M70 68 L46 82" stroke="var(--card)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Crack level 2 — cracks widen and glow from within */}
      {crackLevel >= 2 && (
        <>
          <path
            d="M72 116 L90 134 L76 164"
            stroke="var(--card)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M86 84 L116 72" stroke="var(--card)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M46 82 L32 96" stroke="var(--card)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M116 72 L138 84" stroke="var(--card)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Ember glow seeping through cracks */}
          <path
            d="M80 36 L70 68 L86 84 L72 116"
            stroke="var(--gold)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M72 116 L90 134 L76 164"
            stroke="var(--gold)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        </>
      )}

      {/* Crack level 3 — the top cracks open, glow + hatchling eye inside */}
      {crackLevel >= 3 && (
        <>
          <path
            d="M18 108 L44 98 L64 112 L82 96 L102 116 L124 98 L142 108 L142 114 C114 100 46 100 18 114 Z"
            fill="var(--background)"
            opacity="0.95"
          />
          <path
            d="M18 110 L44 100 L64 114 L82 98 L102 118 L124 100 L142 110 L142 114 L18 114 Z"
            fill="var(--card)"
            opacity="0.9"
          />
          {/* Inner glow */}
          <ellipse cx="80" cy="128" rx="48" ry="36" fill="url(#eggGlow)" />
          {/* The hatchling peeking out */}
          <path d="M62 132 C 74 124, 86 124, 98 132 C 84 128, 76 128, 62 132 Z" fill="var(--background)" />
          <ellipse cx="80" cy="130" rx="9" ry="6" fill="var(--gold)" />
          <ellipse cx="80" cy="130" rx="2" ry="5.5" fill="var(--ink)" />
        </>
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
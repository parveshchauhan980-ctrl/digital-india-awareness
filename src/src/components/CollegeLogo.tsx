import { cn } from "@/utils/cn";

/**
 * Rajiv Gandhi College of Arts, Commerce & Science — Vashi, Navi Mumbai.
 * Sainath Education Trust — "Trust Transforms Life".
 *
 * Faithful SVG reconstruction of the official college crest so it scales
 * crisply on every screen. Colours match the printed emblem
 * (red banner, gold rays, green ribbon, dark-red text plate).
 */
export function CollegeLogo({
  className,
  showCaption = false,
  ariaLabel = "Rajiv Gandhi College of Arts, Commerce & Science — Sainath Education Trust",
}: {
  className?: string;
  showCaption?: boolean;
  ariaLabel?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center",
        showCaption ? "gap-1.5" : "",
        className,
      )}
    >
      <svg
        viewBox="0 0 200 220"
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="cl-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a11c1c" />
            <stop offset="100%" stopColor="#7c1414" />
          </linearGradient>
          <radialGradient id="cl-sun" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#fff8b0" />
            <stop offset="55%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          <linearGradient id="cl-ribbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="cl-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="cl-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <path
            id="cl-trust-top"
            d="M 30 62 Q 100 8 170 62"
            fill="none"
          />
        </defs>

        {/* ---- Top shield with "SAINATH EDUCATION TRUST" arch ---- */}
        <path
          d="M22 66 Q100 4 178 66 L178 78 Q100 20 22 78 Z"
          fill="url(#cl-shield)"
          stroke="#450a0a"
          strokeWidth="1.4"
        />
        <text
          fontSize="10.5"
          fontWeight="800"
          fill="#fff8dc"
          letterSpacing="2.4"
          style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
        >
          <textPath href="#cl-trust-top" startOffset="50%" textAnchor="middle">
            SAINATH EDUCATION TRUST
          </textPath>
        </text>
        {/* Subtle red banner curl */}
        <path
          d="M8 68 Q14 74 22 66 L22 82 Q14 78 8 84 Z"
          fill="#6b0f0f"
        />
        <path
          d="M192 68 Q186 74 178 66 L178 82 Q186 78 192 84 Z"
          fill="#6b0f0f"
        />

        {/* ---- Central sunburst / rays ---- */}
        <g transform="translate(100 118)">
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 20;
            const x1 = Math.cos(angle) * 30;
            const y1 = Math.sin(angle) * 30;
            const x2 = Math.cos(angle) * 46;
            const y2 = Math.sin(angle) * 46;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.9"
              />
            );
          })}
          <circle r="30" fill="url(#cl-sun)" stroke="#d97706" strokeWidth="1.2" />

          {/* Lit lamp / diya */}
          <g>
            {/* Flame */}
            <path
              d="M0 -18 C -6 -12 -6 -4 0 -2 C 6 -4 6 -12 0 -18 Z"
              fill="url(#cl-flame)"
            />
            <path
              d="M0 -14 C -3 -10 -3 -4 0 -3 C 3 -4 3 -10 0 -14 Z"
              fill="#fef9c3"
              opacity="0.9"
            />
            {/* Wick */}
            <rect x="-0.8" y="-3" width="1.6" height="4" fill="#7c2d12" />
            {/* Lamp bowl */}
            <path
              d="M -14 2 Q 0 -2 14 2 Q 14 10 0 12 Q -14 10 -14 2 Z"
              fill="#7f1d1d"
              stroke="#450a0a"
              strokeWidth="1.1"
            />
            {/* Lamp base */}
            <rect
              x="-9"
              y="12"
              width="18"
              height="4"
              rx="1.4"
              fill="#7f1d1d"
              stroke="#450a0a"
              strokeWidth="0.9"
            />
          </g>
        </g>

        {/* ---- Green ribbon: "TRUST TRANSFORMS LIFE" ---- */}
        <g>
          {/* Left tail */}
          <path
            d="M6 168 L28 162 L28 178 L6 184 Z"
            fill="#166534"
          />
          {/* Right tail */}
          <path
            d="M194 168 L172 162 L172 178 L194 184 Z"
            fill="#166534"
          />
          {/* Main ribbon */}
          <path
            d="M18 158 Q100 148 182 158 L182 178 Q100 168 18 178 Z"
            fill="url(#cl-ribbon)"
            stroke="#14532d"
            strokeWidth="1"
          />
          <text
            x="100"
            y="171.5"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="800"
            fill="#ffffff"
            letterSpacing="1.6"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            "TRUST TRANSFORMS LIFE"
          </text>
        </g>

        {/* ---- Bottom college name plate ---- */}
        <g>
          <rect
            x="14"
            y="186"
            width="172"
            height="28"
            rx="3"
            fill="url(#cl-plate)"
            stroke="#450a0a"
            strokeWidth="1"
          />
          <text
            x="100"
            y="199"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#fff8dc"
            letterSpacing="1"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            RAJIV GANDHI COLLEGE
          </text>
          <text
            x="100"
            y="211"
            textAnchor="middle"
            fontSize="7.4"
            fontWeight="700"
            fill="#fde68a"
            letterSpacing="1.5"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            OF ARTS COMMERCE &amp; SCIENCE
          </text>
        </g>
      </svg>

      {showCaption ? (
        <span className="text-center text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          Sainath Education Trust
        </span>
      ) : null}
    </span>
  );
}

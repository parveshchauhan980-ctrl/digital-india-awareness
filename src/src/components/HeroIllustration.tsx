/**
 * Custom inline SVG illustration for the hero section.
 * A phone showing a QR payment, a digital document card and floating
 * service chips, set on an abstract India-shaped backdrop.
 * Rendered inline so it needs no external asset request.
 */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 460"
      role="img"
      aria-label="Illustration of digital services: a mobile phone with a QR code, a digital document and a secure payment"
      className="h-auto w-full max-w-[520px]"
    >
      <defs>
        <linearGradient id="hi-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="55%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#ffedd5" />
        </linearGradient>
        <linearGradient id="hi-phone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="hi-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0eaff" />
        </linearGradient>
        <linearGradient id="hi-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="hi-saffron" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="hi-doc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <filter id="hi-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="18"
            floodColor="#1e3a8a"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* Backdrop */}
      <circle cx="258" cy="228" r="196" fill="url(#hi-sky)" />
      <circle
        cx="258"
        cy="228"
        r="196"
        fill="none"
        stroke="#93c5fd"
        strokeOpacity="0.5"
        strokeDasharray="3 9"
      />

      {/* Chakra rings */}
      <g stroke="#60a5fa" strokeOpacity="0.45" fill="none">
        <circle cx="258" cy="228" r="150" strokeWidth="1.4" />
        <circle cx="258" cy="228" r="112" strokeWidth="1" strokeDasharray="2 8" />
      </g>
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * Math.PI) / 6;
        return (
          <line
            key={index}
            x1={258 + Math.cos(angle) * 112}
            y1={228 + Math.sin(angle) * 112}
            x2={258 + Math.cos(angle) * 150}
            y2={228 + Math.sin(angle) * 150}
            stroke="#60a5fa"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        );
      })}

      {/* Document card (behind phone) */}
      <g filter="url(#hi-shadow)">
        <rect
          x="58"
          y="150"
          width="182"
          height="124"
          rx="16"
          fill="url(#hi-doc)"
          stroke="#bfdbfe"
        />
      </g>
      <rect x="58" y="150" width="182" height="30" rx="16" fill="url(#hi-saffron)" />
      <rect x="58" y="164" width="182" height="16" fill="url(#hi-saffron)" />
      <rect x="76" y="196" width="72" height="9" rx="4.5" fill="#94a3b8" />
      <rect x="76" y="216" width="120" height="7" rx="3.5" fill="#cbd5e1" />
      <rect x="76" y="231" width="98" height="7" rx="3.5" fill="#cbd5e1" />
      <rect x="76" y="246" width="112" height="7" rx="3.5" fill="#cbd5e1" />
      <circle cx="204" cy="236" r="17" fill="none" stroke="#16a34a" strokeWidth="3" />
      <path
        d="M196.5 236.5l5 5 9.5-10"
        fill="none"
        stroke="#16a34a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Phone */}
      <g filter="url(#hi-shadow)">
        <rect x="222" y="86" width="164" height="288" rx="30" fill="url(#hi-phone)" />
      </g>
      <rect x="232" y="96" width="144" height="268" rx="24" fill="url(#hi-screen)" />
      <rect x="278" y="104" width="52" height="7" rx="3.5" fill="#172554" opacity="0.85" />

      {/* Screen: header */}
      <rect x="246" y="126" width="116" height="30" rx="10" fill="#dbeafe" />
      <rect x="254" y="137" width="58" height="8" rx="4" fill="#1d4ed8" />
      <circle cx="347" cy="141" r="8" fill="#fb923c" />

      {/* Screen: QR code */}
      <rect
        x="258"
        y="168"
        width="92"
        height="92"
        rx="10"
        fill="#ffffff"
        stroke="#bfdbfe"
      />
      <g fill="#172554">
        <rect x="268" y="178" width="24" height="24" rx="4" />
        <rect x="316" y="178" width="24" height="24" rx="4" />
        <rect x="268" y="226" width="24" height="24" rx="4" />
        <rect x="298" y="184" width="10" height="10" rx="2" />
        <rect x="298" y="206" width="10" height="10" rx="2" />
        <rect x="322" y="212" width="10" height="10" rx="2" />
        <rect x="276" y="210" width="10" height="10" rx="2" />
        <rect x="310" y="236" width="10" height="10" rx="2" />
        <rect x="286" y="238" width="10" height="10" rx="2" />
      </g>
      <g fill="#ffffff">
        <rect x="273" y="183" width="14" height="14" rx="2" />
        <rect x="321" y="183" width="14" height="14" rx="2" />
        <rect x="273" y="231" width="14" height="14" rx="2" />
      </g>
      <g fill="#172554">
        <rect x="277" y="187" width="6" height="6" rx="1.5" />
        <rect x="325" y="187" width="6" height="6" rx="1.5" />
        <rect x="277" y="235" width="6" height="6" rx="1.5" />
      </g>

      {/* Screen: pay button */}
      <rect x="246" y="274" width="116" height="34" rx="11" fill="url(#hi-green)" />
      <rect x="268" y="288" width="72" height="7" rx="3.5" fill="#ffffff" opacity="0.95" />

      {/* Screen: secure footer */}
      <g>
        <rect x="246" y="320" width="116" height="30" rx="10" fill="#f1f5f9" />
        <path
          d="M293 332h14v10h-14z"
          fill="#64748b"
        />
        <path
          d="M296 332v-3a4 4 0 018 0v3"
          fill="none"
          stroke="#64748b"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect x="312" y="335" width="42" height="6" rx="3" fill="#cbd5e1" />
      </g>

      {/* Floating chip: UPI */}
      <g filter="url(#hi-shadow)">
        <rect x="368" y="196" width="118" height="52" rx="14" fill="#ffffff" stroke="#bbf7d0" />
      </g>
      <rect x="380" y="210" width="28" height="24" rx="7" fill="url(#hi-green)" />
      <path
        d="M388 222l4 4 8-8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="416" y="212" width="58" height="8" rx="4" fill="#15803d" />
      <rect x="416" y="228" width="40" height="7" rx="3.5" fill="#bbf7d0" />

      {/* Floating chip: safety */}
      <g filter="url(#hi-shadow)">
        <rect x="40" y="292" width="150" height="56" rx="16" fill="#ffffff" stroke="#fed7aa" />
      </g>
      <rect x="54" y="306" width="28" height="28" rx="8" fill="url(#hi-saffron)" />
      <path
        d="M68 314v6l4 4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="92" y="310" width="78" height="8" rx="4" fill="#ea580c" />
      <rect x="92" y="326" width="56" height="7" rx="3.5" fill="#fed7aa" />

      {/* Floating chip: cloud documents */}
      <g filter="url(#hi-shadow)">
        <rect x="330" y="330" width="146" height="50" rx="14" fill="#ffffff" stroke="#bfdbfe" />
      </g>
      <path
        d="M352 362a9 9 0 010-18 12 12 0 0123-3 8 8 0 01-1 21h-22z"
        fill="#2563eb"
      />
      <rect x="382" y="342" width="72" height="8" rx="4" fill="#1d4ed8" />
      <rect x="382" y="357" width="48" height="7" rx="3.5" fill="#bfdbfe" />

      {/* Base tricolour bar */}
      <rect x="150" y="418" width="216" height="7" rx="3.5" fill="#fb923c" />
      <rect x="150" y="418" width="72" height="7" rx="3.5" fill="#ffffff" />
      <rect x="294" y="418" width="72" height="7" rx="3.5" fill="#16a34a" />
    </svg>
  );
}

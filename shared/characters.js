// Flex, Blob, Dan and props, drawn once and reused on every page.
// Use them in any panel with <use href="#flexBody"/>, <use href="#blobSmug"/> etc.
// Available: flexBody, flexHappy, flexPanic, blobBody, blobSmug, blobShades,
//            danBody, cookie, gutWall, and the pattern "shelf" (fill="url(#shelf)").
document.body.insertAdjacentHTML('afterbegin', `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <pattern id="shelf" width="64" height="72" patternUnits="userSpaceOnUse">
      <rect width="64" height="72" fill="#F3EFE6"/>
      <rect x="4" y="18" width="16" height="48" fill="#F28C8C" stroke="#17131A" stroke-width="2"/>
      <rect x="22" y="30" width="18" height="36" fill="#7CC6C1" stroke="#17131A" stroke-width="2"/>
      <rect x="42" y="12" width="17" height="54" fill="#F7D774" stroke="#17131A" stroke-width="2"/>
      <rect y="66" width="64" height="6" fill="#9B8F86"/>
    </pattern>

    <!-- FLEX: the muscle -->
    <g id="flexBody">
      <path d="M-18 55 L-22 76 M18 55 L22 76" stroke="#17131A" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="-26" cy="78" rx="11" ry="5" fill="#17131A"/><ellipse cx="26" cy="78" rx="11" ry="5" fill="#17131A"/>
      <g id="flexArm">
        <path d="M-42 -2 C-72 -2 -88 -26 -76 -52 L-62 -54 C-66 -36 -60 -26 -42 -22 Z" fill="#E23A4E" stroke="#17131A" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="-70" cy="-60" r="10" fill="#E23A4E" stroke="#17131A" stroke-width="4"/>
      </g>
      <use href="#flexArm" transform="scale(-1,1)"/>
      <path d="M-44 60 C-62 10 -52 -62 0 -66 C52 -62 62 10 44 60 Q0 70 -44 60 Z" fill="#E23A4E" stroke="#17131A" stroke-width="4"/>
      <path d="M-26 -42 Q-33 5 -22 50 M0 -54 Q-6 5 0 58 M26 -42 Q33 5 22 50" stroke="#A51F33" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M-47 -40 Q0 -54 47 -40 L49 -27 Q0 -41 -49 -27 Z" fill="#fff" stroke="#17131A" stroke-width="3"/>
      <path d="M47 -34 L64 -44 M47 -32 L62 -24" stroke="#17131A" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g id="flexHappy">
      <ellipse cx="-16" cy="-8" rx="10" ry="12" fill="#fff" stroke="#17131A" stroke-width="3"/>
      <ellipse cx="16" cy="-8" rx="10" ry="12" fill="#fff" stroke="#17131A" stroke-width="3"/>
      <circle cx="-14" cy="-5" r="4.5" fill="#17131A"/><circle cx="18" cy="-5" r="4.5" fill="#17131A"/>
      <path d="M-28 -25 L-8 -21 M28 -25 L8 -21" stroke="#17131A" stroke-width="4" stroke-linecap="round"/>
      <path d="M-18 14 Q0 38 18 14 Z" fill="#17131A"/><path d="M-12 17 L12 17" stroke="#fff" stroke-width="3"/>
    </g>
    <g id="flexPanic">
      <circle cx="-16" cy="-8" r="12" fill="#fff" stroke="#17131A" stroke-width="3"/>
      <circle cx="16" cy="-8" r="12" fill="#fff" stroke="#17131A" stroke-width="3"/>
      <circle cx="-16" cy="-8" r="2.5" fill="#17131A"/><circle cx="16" cy="-8" r="2.5" fill="#17131A"/>
      <path d="M-28 -24 L-8 -30 M28 -24 L8 -30" stroke="#17131A" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="0" cy="22" rx="9" ry="12" fill="#17131A"/>
      <path d="M36 -26 q6 10 0 14 q-6 -4 0 -14z" fill="#8FD3F4" stroke="#17131A" stroke-width="2"/>
    </g>

    <!-- BLOB: the fat -->
    <g id="blobBody">
      <path d="M-62 60 C-84 20 -62 -50 0 -54 C62 -50 84 20 62 60 C30 72 -30 72 -62 60 Z" fill="#FFC83D" stroke="#17131A" stroke-width="4"/>
      <ellipse cx="-30" cy="-26" rx="14" ry="8" fill="#FFF3C9" transform="rotate(-30 -30 -26)"/>
      <ellipse cx="0" cy="34" rx="34" ry="18" fill="#FFE7A1"/>
      <path d="M-66 18 q-16 6 -12 20 M66 18 q16 6 12 20" stroke="#17131A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="-34" cy="12" r="7" fill="#F59C8B" opacity=".7"/><circle cx="34" cy="12" r="7" fill="#F59C8B" opacity=".7"/>
    </g>
    <g id="blobSmug">
      <path d="M-26 -6 Q-16 -14 -6 -6" stroke="#17131A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-26 -6 Q-16 0 -6 -6 Z M6 -6 Q16 0 26 -6 Z" fill="#17131A"/>
      <path d="M6 -6 Q16 -14 26 -6" stroke="#17131A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-28 -22 L-8 -18 M8 -20 L28 -26" stroke="#17131A" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M-12 16 Q4 24 16 10" stroke="#17131A" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
    <g id="blobShades">
      <path d="M-34 -14 L34 -14 L30 0 Q18 8 6 0 L2 -8 L-2 -8 L-6 0 Q-18 8 -30 0 Z" fill="#17131A"/>
      <path d="M-26 -10 L-16 -10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M-14 16 Q2 28 18 12" stroke="#17131A" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>

    <!-- DAN: the host -->
    <g id="danBody">
      <path d="M-46 112 L-40 46 Q0 26 40 46 L46 112 Z" fill="#4B5BA6" stroke="#17131A" stroke-width="4" stroke-linejoin="round"/>
      <path d="M-14 36 Q0 50 14 36" fill="none" stroke="#17131A" stroke-width="3"/>
      <path d="M-10 70 L10 70 M0 70 L0 98" stroke="#DDE2F5" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="31" fill="#F2C29B" stroke="#17131A" stroke-width="4"/>
      <path d="M-32 -2 Q-32 -40 0 -38 Q32 -40 32 -2 Q12 -24 -32 -2 Z" fill="#17131A"/>
    </g>
    <g id="cookie">
      <circle r="16" fill="#C98A4B" stroke="#17131A" stroke-width="3"/>
      <circle cx="-6" cy="-5" r="3" fill="#4A2A14"/><circle cx="6" cy="-2" r="2.6" fill="#4A2A14"/><circle cx="-1" cy="7" r="2.8" fill="#4A2A14"/>
    </g>

    <g id="gutWall">
      <path d="M0 40 Q40 20 80 40 T160 40 T240 40 T320 40 T400 40 T480 40 T560 40 T640 40 T720 40 T800 40" stroke="#EBAFA6" stroke-width="5" fill="none"/>
      <path d="M0 110 Q40 90 80 110 T160 110 T240 110 T320 110 T400 110 T480 110 T560 110 T640 110 T720 110 T800 110" stroke="#EBAFA6" stroke-width="5" fill="none"/>
    </g>
  </defs>
</svg>
`);

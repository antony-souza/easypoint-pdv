export function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="2.75"
        y="4.25"
        width="14.5"
        height="11.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4.25 6 5.75 4.25L15.75 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="8.25"
        width="13"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.25 8.25V6.5a3.75 3.75 0 0 1 7.5 0v1.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="12.75" r="1" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10s2.5-4.25 7.5-4.25S17.5 10 17.5 10 15 14.25 10 14.25 2.5 10 2.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 3.25 17 16.75M8.25 5.95A8.8 8.8 0 0 1 10 5.75c5 0 7.5 4.25 7.5 4.25a13.8 13.8 0 0 1-2.25 2.55M5.3 7.15C3.45 8.25 2.5 10 2.5 10S5 14.25 10 14.25c.8 0 1.53-.12 2.2-.32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6.5 12.25 3.55 3.55L17.75 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

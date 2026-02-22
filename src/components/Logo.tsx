"use client";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
      >
        <rect width="36" height="36" rx="8" fill="#fbbf24" />
        <path
          d="M18 8L8 17H11V27H16V22H20V27H25V17H28L18 8Z"
          fill="white"
        />
      </svg>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black tracking-tight text-black">
          home<span className="font-black">select</span>
        </span>
        <span className="text-sm font-bold text-slate-500">Dubai</span>
      </div>
    </div>
  );
}

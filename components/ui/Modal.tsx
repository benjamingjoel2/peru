"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
};

/** Native <dialog>: focus trap, Esc to close and inert background come for free. */
export function Modal({ open, onClose, labelledBy, children, className = "" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      if (!open) document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={`m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-sm bg-cream p-0 text-ink shadow-2xl backdrop:bg-indigo-deep/70 backdrop:backdrop-blur-sm ${className}`}
    >
      <div className="woven-stripe" aria-hidden />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-5 grid h-10 w-10 place-items-center rounded-full text-2xl text-indigo hover:bg-cream-deep"
        aria-label="Close"
      >
        ×
      </button>
      {children}
    </dialog>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BudgetPoints } from "./BudgetPanel";
import { EnquiryForm } from "./EnquiryForm";
import { Emph } from "@/components/ui/Heading";

/** Step 1: "Does this fit your budget?" → Step 2: the form → Step 3: confirmation (inside the form). */
export function EnquireModal({ open, journey, onClose }: { open: boolean; journey?: string; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset each time the modal opens
      setStep(1);
      setFits(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} labelledBy="enquire-title">
      <div className="p-5 sm:p-8">
        <p className="eyebrow text-stone-dark">Step {step} of 2</p>
        {step === 1 ? (
          <>
            <h2 id="enquire-title" className="mt-2 pr-10 text-3xl text-indigo sm:text-4xl">
              <Emph text="Does this fit your *budget*?" />
            </h2>
            <p className="mt-3 text-stone-dark">Every journey is private and planned around you. Here&apos;s what to expect before we start.</p>
            <div className="mt-6 rounded-sm bg-cream-deep/60 p-5">
              <BudgetPoints />
            </div>
            <label className="mt-6 flex items-start gap-3 rounded-sm border-2 border-mustard bg-mustard/10 p-4 font-semibold text-indigo">
              <input type="checkbox" required checked={fits} onChange={(e) => setFits(e.target.checked)} className="mt-1 h-5 w-5 accent-cochineal" />
              This fits what I have in mind
            </label>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                disabled={!fits}
                onClick={() => setStep(2)}
                className="min-h-12 rounded-full bg-cochineal px-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
            {!fits && <p className="mt-2 text-right text-xs text-stone-dark">Tick the box to continue.</p>}
          </>
        ) : (
          <>
            <h2 id="enquire-title" className="mt-2 pr-10 text-3xl text-indigo sm:text-4xl">
              <Emph text="Tell us about *your* Peru" />
            </h2>
            <p className="mb-6 mt-3 text-stone-dark">A few details help your Peru Specialist come back with ideas that fit. It takes about three minutes.</p>
            <EnquiryForm journey={journey} budgetConfirmed />
            <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm font-semibold text-stone-dark underline">
              ← Back
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

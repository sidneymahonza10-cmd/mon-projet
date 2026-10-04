/** Champ de formulaire avec libellé et message d'erreur reliés. */
export function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-taupe">
        {label} {hint && <span className="text-taupe/70">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-[#a2432f]">
          {error}
        </p>
      )}
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isPhone = (v: string) => /^[+\d][\d\s.-]{7,}$/.test(v.trim());

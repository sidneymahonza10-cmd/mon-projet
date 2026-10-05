/** Champ de formulaire avec libellé et message d'erreur reliés. */
export function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-taupe">
        {label} {hint && <span className="text-taupe">{hint}</span>}
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

// Mêmes règles que la validation serveur (src/app/api/lead/route.ts)
export const isEmail = (v: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(v.trim());
export const isPhone = (v: string) => {
  const t = v.trim();
  const n = t.replace(/\D/g, "").length;
  return /^[+\d][\d\s().-]+$/.test(t) && n >= 9 && n <= 15;
};

import { HONEYPOT } from "@/lib/leads";

/** Champ piège anti-spam : hors écran, ignoré par les lecteurs d'écran et le clavier. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label>
        Ne pas remplir ce champ
        <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { goals, propertyTypes } from "@/data/content";
import { site, whatsappHref } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Stepper } from "@/components/ui/Stepper";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Field, isEmail, isPhone } from "@/components/ui/Field";
import { sendLead } from "@/lib/leads";
import { cn } from "@/lib/cn";

type Lead = { city: string; type: string; bedrooms: number; guests: number; goals: string[]; name: string; phone: string; email: string };
const steps = ["Votre logement", "Votre objectif", "Vos coordonnées"];
const empty: Lead = { city: "", type: "Appartement", bedrooms: 1, guests: 2, goals: [], name: "", phone: "", email: "" };

export function ContactForm() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [lead, setLead] = useState<Lead>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = <K extends keyof Lead>(k: K, v: Lead[K]) => {
    setLead((l) => ({ ...l, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(s: number) {
    const e: typeof errors = {};
    if (s === 0 && !lead.city.trim()) e.city = "Indiquez la ville du logement.";
    if (s === 1 && lead.goals.length === 0) e.goals = "Choisissez au moins un objectif.";
    if (s === 2) {
      if (!lead.name.trim()) e.name = "Indiquez votre nom.";
      if (!isPhone(lead.phone)) e.phone = "Saisissez un numéro de téléphone valide.";
      if (!isEmail(lead.email)) e.email = "Saisissez une adresse e-mail valide (ex. nom@domaine.fr).";
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`${uid}-${first}`)?.focus();
    return !first;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) {
      if (!validate(step)) return;
      setDir(1);
      setStep((s) => s + 1);
      return;
    }
    if (!validate(2)) return;
    setStatus("sending");
    setStatus((await sendLead({ source: "estimation", ...lead })) ? "done" : "error");
  }

  const progress = status === "done" ? 100 : ((step + 1) / steps.length) * 100;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-cream py-28 sm:py-36">
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="contact-title" className="font-display text-[2.7rem] leading-[1.0] sm:text-6xl lg:text-[4.6rem]">
            <SplitWords text="Parlons de" className="block" />
            <SplitWords text="votre logement." delay={0.1} className="block italic text-caramel-deep" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-taupe">Trois étapes, une minute. Nous analysons votre projet et revenons vers vous avec une estimation personnalisée.</p>
            <ul className="mt-10 space-y-4 text-espresso">
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors hover:text-caramel-deep">
                  <WhatsAppIcon className="size-5 text-caramel" /> WhatsApp, réponse rapide
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <Phone className="size-5 text-caramel" strokeWidth={1.5} /> <span className="select-all">{site.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-caramel" strokeWidth={1.5} /> <span className="select-all">{site.contact.email}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-porcelain p-6 shadow-[0_50px_90px_-60px_rgba(42,32,26,0.55)] sm:p-10">
            <div className="mb-8">
              <div className="flex justify-between text-xs">
                {steps.map((s, i) => (
                  <span key={s} className={cn("transition-colors", i <= step || status === "done" ? "text-espresso" : "text-taupe/70", i !== step && "hidden sm:inline")}>
                    <span className="num text-caramel-deep">{i + 1}.</span> {s}
                  </span>
                ))}
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-linen" role="progressbar" aria-label="Progression du formulaire" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                <motion.div className="h-full rounded-full bg-caramel" animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              {status === "done" ? (
                <Success key="done" title="Merci. NOVESYA va analyser votre projet et revenir vers vous." />
              ) : (
                <motion.form key={step} onSubmit={submit} noValidate initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <h3 className="font-display text-3xl text-espresso">{steps[step]}</h3>

                  {step === 0 && (
                    <div className="mt-6 space-y-5">
                      <Field id={`${uid}-city`} label="Ville" error={errors.city}>
                        <input id={`${uid}-city`} className="field" autoComplete="address-level2" placeholder="Ex. Évry-Courcouronnes" value={lead.city} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city || undefined} aria-describedby={errors.city ? `${uid}-city-err` : undefined} />
                      </Field>
                      <Field id={`${uid}-type`} label="Type de logement">
                        <select id={`${uid}-type`} className="field" value={lead.type} onChange={(e) => set("type", e.target.value)}>
                          {propertyTypes.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Stepper id={`${uid}-bedrooms`} label="Chambres" value={lead.bedrooms} min={0} max={8} onChange={(v) => set("bedrooms", v)} format={(v) => (v === 0 ? "Studio" : String(v))} />
                        <Stepper id={`${uid}-guests`} label="Voyageurs" value={lead.guests} min={1} max={16} onChange={(v) => set("guests", v)} />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <fieldset className="mt-6" aria-describedby={errors.goals ? `${uid}-goals-err` : undefined}>
                      <legend className="mb-4 text-sm text-taupe">Plusieurs choix possibles</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {goals.map((g, gi) => {
                          const on = lead.goals.includes(g);
                          return (
                            <label key={g} className={cn("flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-caramel-deep", on ? "border-caramel bg-caramel/10 text-espresso" : "border-hairline text-espresso hover:border-dune")}>
                              <input id={gi === 0 ? `${uid}-goals` : undefined} type="checkbox" className="sr-only" checked={on} onChange={() => set("goals", on ? lead.goals.filter((x) => x !== g) : [...lead.goals, g])} />
                              <span className={cn("grid size-5 shrink-0 place-items-center rounded-md border transition-colors", on ? "border-caramel bg-caramel text-porcelain" : "border-dune")}>{on && <Check className="size-3.5" strokeWidth={3} />}</span>
                              {g}
                            </label>
                          );
                        })}
                      </div>
                      {errors.goals && (
                        <p id={`${uid}-goals-err`} role="alert" className="mt-3 text-sm text-[#a2432f]">
                          {errors.goals}
                        </p>
                      )}
                    </fieldset>
                  )}

                  {step === 2 && (
                    <div className="mt-6 space-y-5">
                      <Field id={`${uid}-name`} label="Nom" error={errors.name}>
                        <input id={`${uid}-name`} className="field" autoComplete="name" value={lead.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
                      </Field>
                      <Field id={`${uid}-phone`} label="Téléphone" error={errors.phone}>
                        <input id={`${uid}-phone`} type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="06 12 34 56 78" value={lead.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone || undefined} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
                      </Field>
                      <Field id={`${uid}-email`} label="Email" error={errors.email}>
                        <input id={`${uid}-email`} type="email" inputMode="email" className="field" autoComplete="email" placeholder="nom@domaine.fr" value={lead.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
                      </Field>
                      <p className="text-xs leading-relaxed text-taupe">
                        Vos informations servent uniquement à vous recontacter au sujet de votre logement. <a href="/confidentialite" className="underline hover:text-espresso">Politique de confidentialité</a>.
                      </p>
                      {status === "error" && (
                        <p role="alert" className="text-sm text-[#a2432f]">
                          L&apos;envoi n&apos;a pas abouti. Réessayez, ou écrivez-nous directement sur WhatsApp.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {step > 0 ? (
                      <button type="button" onClick={() => { setDir(-1); setStep((s) => s - 1); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-taupe transition-colors hover:text-espresso">
                        <ArrowLeft className="size-4" /> Retour
                      </button>
                    ) : (
                      <span className="hidden sm:block" />
                    )}
                    <MagneticButton type="submit" variant="primary" size="lg" disabled={status === "sending"} strength={0.12} className="w-full sm:w-auto">
                      {step < 2 ? "Continuer" : status === "sending" ? "Envoi en cours…" : "Recevoir mon estimation"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Success({ title, text = "Réponse sous 24h, sans engagement." }: { title: string; text?: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="py-10 text-center" role="status">
      <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }} className="mx-auto grid size-16 place-items-center rounded-full bg-caramel text-porcelain">
        <Check className="size-7" strokeWidth={2.5} />
      </motion.span>
      <p className="mx-auto mt-7 max-w-sm font-display text-3xl leading-tight text-espresso">{title}</p>
      <p className="mt-3 text-taupe">{text}</p>
    </motion.div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lock, PhoneCall, Sparkles } from "lucide-react";
import { planChoices, plans } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { TiltCard } from "@/components/ui/TiltCard";
import { Field, isEmail, isPhone } from "@/components/ui/Field";
import { Success } from "@/components/sections/ContactForm";
import { sendLead } from "@/lib/leads";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

const promises = [
  { icon: PhoneCall, title: "Un appel personnalisé", text: "Un conseiller NOVESYA vous contacte en privé sous 24h." },
  { icon: Sparkles, title: "Une offre sur mesure", text: "Nos conditions sont adaptées à votre logement et à vos objectifs." },
  { icon: Lock, title: "Sans engagement", text: "Vos coordonnées restent confidentielles et ne sont jamais cédées." },
];

export function FormulesPage() {
  const uid = useId();
  const [choice, setChoice] = useState<string>("Premium");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // Pré-sélection depuis le lien (#essentielle / #premium)
  useEffect(() => {
    const h = location.hash.slice(1);
    const plan = plans.find((p) => p.id === h);
    if (plan) queueMicrotask(() => setChoice(plan.name));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isPhone(phone)) next.phone = "Saisissez un numéro de téléphone valide (ex. 06 12 34 56 78).";
    if (!isEmail(email)) next.email = "Saisissez une adresse e-mail valide (ex. nom@domaine.fr).";
    setErrors(next);
    if (next.phone) return document.getElementById(`${uid}-phone`)?.focus();
    if (next.email) return document.getElementById(`${uid}-email`)?.focus();
    setStatus("sending");
    setStatus((await sendLead({ source: "formules", formule: choice, name, phone, email })) ? "done" : "error");
  }

  const pick = (name: string) => {
    setChoice(name);
    document.getElementById("rappel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ───────── En-tête ───────── */}
      <section className="relative overflow-hidden bg-cream pb-16 pt-40 sm:pt-48">
        <div aria-hidden="true" className="absolute -left-40 top-20 size-[34rem] rounded-full bg-sand/50 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-sage-soft blur-[100px]" />
        <div className="container-x relative text-center">
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
            <SplitWords text="Nos formules," className="block" />
            <SplitWords text="pensées pour votre bien." delay={0.15} className="block italic text-caramel-deep" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-taupe sm:text-xl">
              Comparez nos deux niveaux d&apos;accompagnement, puis laissez-nous vos coordonnées : un conseiller vous présente nos conditions en privé.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Formules ───────── */}
      <section aria-label="Comparer les formules" className="bg-cream pb-24">
        <div className="container-x">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            {plans.map((plan, i) => {
              const premium = plan.featured;
              const selected = choice === plan.name;
              return (
                <motion.div key={plan.id} id={plan.id} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.12, ease }}>
                  <TiltCard max={4} className={cn("h-full overflow-hidden rounded-[2.25rem] transition-shadow duration-500", premium ? "bg-forest text-porcelain" : "border border-hairline bg-porcelain", selected ? "shadow-[0_0_0_3px_var(--color-caramel),0_50px_90px_-50px_rgba(42,32,26,0.6)]" : "shadow-[0_40px_80px_-60px_rgba(42,32,26,0.5)]")}>
                    <article className="relative z-10 flex h-full flex-col p-8 sm:p-11">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={cn("text-[0.75rem] font-medium tracking-[0.22em]", premium ? "text-sand" : "text-caramel-deep")}>FORMULE {plan.code}</p>
                          <h2 className="mt-3 font-display text-5xl sm:text-6xl">{plan.name}</h2>
                        </div>
                        {premium && <span className="rounded-full bg-caramel px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.18em] text-porcelain">LA PLUS CHOISIE</span>}
                      </div>
                      <p className={cn("mt-4 text-lg", premium ? "text-mint-ink" : "text-taupe")}>{plan.pitch}</p>
                      <p className={cn("mt-2 text-sm", premium ? "text-sand" : "text-caramel-deep")}>{plan.ideal}</p>
                      {plan.intro && <p className="mt-8 font-medium text-sand">{plan.intro}</p>}
                      <ul className={cn("space-y-3.5 border-t pt-6", plan.intro ? "mt-4" : "mt-8", premium ? "border-porcelain/15" : "border-hairline")}>
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", premium ? "bg-caramel text-porcelain" : "bg-espresso text-porcelain")}>
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span className={premium ? "text-porcelain/90" : "text-espresso/85"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-10">
                        <MagneticButton onClick={() => pick(plan.name)} variant={premium ? "caramel" : "primary"} size="lg" className="w-full" strength={0.12}>
                          {selected ? "Formule sélectionnée" : `Choisir ${plan.name}`}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </MagneticButton>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Prise de contact privée ───────── */}
      <section id="rappel" aria-labelledby="rappel-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-forest py-24 text-porcelain sm:rounded-t-[3.5rem] sm:py-32">
        <div aria-hidden="true" className="absolute -right-32 -top-32 size-[30rem] rounded-full bg-caramel/25 blur-[110px]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 id="rappel-title" className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl">
              <SplitWords text="Recevez nos conditions" className="block" />
              <SplitWords text="en privé." delay={0.1} className="block italic text-sand" />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mint-ink">Laissez votre numéro et votre e-mail. Nous vous contactons personnellement pour vous présenter la formule adaptée à votre logement.</p>
            </Reveal>
            <ul className="mt-12 space-y-6">
              {promises.map((p, i) => (
                <motion.li key={p.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease }} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-porcelain/10 text-sand">
                    <p.icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block font-medium">{p.title}</span>
                    <span className="block text-mint-ink">{p.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-porcelain p-6 text-espresso shadow-[0_60px_100px_-50px_rgba(0,0,0,0.6)] sm:p-10">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <Success key="done" title="Merci ! Un conseiller NOVESYA vous contacte en privé très bientôt." text={`Formule : ${choice} · Réponse sous 24h.`} />
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }} className="space-y-5">
                    <fieldset>
                      <legend className="mb-3 text-sm text-taupe">Formule qui vous intéresse</legend>
                      <div className="flex flex-wrap gap-2">
                        {planChoices.map((c) => (
                          <label key={c} className={cn("relative cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-caramel-deep", choice === c ? "border-espresso text-porcelain" : "border-hairline hover:border-dune")}>
                            {choice === c && <motion.span layoutId="choice-pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                            <input type="radio" name="formule" value={c} checked={choice === c} onChange={() => setChoice(c)} className="sr-only" />
                            <span className="relative">{c}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <Field id={`${uid}-name`} label="Prénom" hint="(facultatif)">
                      <input id={`${uid}-name`} className="field" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Field>
                    <Field id={`${uid}-phone`} label="Téléphone" error={errors.phone}>
                      <input id={`${uid}-phone`} type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="06 12 34 56 78" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((x) => ({ ...x, phone: undefined })); }} aria-invalid={!!errors.phone || undefined} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
                    </Field>
                    <Field id={`${uid}-email`} label="E-mail" error={errors.email}>
                      <input id={`${uid}-email`} type="email" inputMode="email" className="field" autoComplete="email" placeholder="nom@domaine.fr" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
                    </Field>
                    {status === "error" && (
                      <p role="alert" className="text-sm text-[#a2432f]">
                        L&apos;envoi n&apos;a pas abouti. Réessayez, ou écrivez-nous directement sur WhatsApp.
                      </p>
                    )}
                    <MagneticButton type="submit" variant="caramel" size="lg" className="w-full" disabled={status === "sending"} strength={0.12}>
                      {status === "sending" ? "Envoi en cours…" : "Être recontacté en privé"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>
                    <p className="text-center text-xs leading-relaxed text-taupe">
                      Vos coordonnées servent uniquement à vous recontacter. <a href="/confidentialite" className="underline hover:text-espresso">Politique de confidentialité</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

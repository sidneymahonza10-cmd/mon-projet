import { cn } from "@/lib/cn";
import { SplitWords } from "./SplitWords";
import { Reveal } from "./Reveal";

type Props = {
  title: string;
  accent?: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  id?: string;
  size?: "md" | "lg";
};

/** Titre de section : serif éditorial, seconde ligne en italique caramel, mots qui montent un à un. */
export function SectionHeading({ title, accent, description, tone = "light", align = "left", className, id, size = "md" }: Props) {
  const onDark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-4xl", className)}>
      <h2
        id={id}
        className={cn(
          "font-display font-normal leading-[1.0]",
          size === "lg" ? "text-[2.75rem] sm:text-6xl lg:text-[5.25rem]" : "text-[2.5rem] sm:text-[3.4rem] lg:text-[4.4rem]",
          onDark ? "text-porcelain" : "text-espresso",
        )}
      >
        <SplitWords text={title} className="block" />
        {accent && <SplitWords text={accent} delay={0.12} className={cn("block italic", onDark ? "text-sand" : "text-caramel-deep")} />}
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p className={cn("mt-7 max-w-[58ch] text-[1.06rem] leading-relaxed sm:text-lg", align === "center" && "mx-auto", onDark ? "text-mint-ink" : "text-taupe")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

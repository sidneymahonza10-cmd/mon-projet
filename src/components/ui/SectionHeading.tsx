import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  title: string;
  accent?: string;
  description?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Titre de section : serif éditorial, seconde ligne en italique dorée (signature de la marque). */
export function SectionHeading({ title, accent, description, tone = "dark", align = "left", className, id }: Props) {
  const onDark = tone === "dark";
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <h2
        id={id}
        className={cn(
          "font-display text-[2.4rem] leading-[1.02] font-normal sm:text-5xl lg:text-[4rem]",
          onDark ? "text-paper" : "text-ink",
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={cn("block italic", onDark ? "text-gold-soft" : "text-gold-deep")}>{accent}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[60ch] text-[1.05rem] leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            onDark ? "text-mist" : "text-stone",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

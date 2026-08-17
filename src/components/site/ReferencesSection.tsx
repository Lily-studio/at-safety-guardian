import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import redalLogo from "@/assets/references/redal.webp.asset.json";
import safranLogo from "@/assets/references/safran.svg.asset.json";
import danoneLogo from "@/assets/references/danone.png.asset.json";
import cocaColaLogo from "@/assets/references/coca-cola.svg.asset.json";
import colgateLogo from "@/assets/references/colgate-palmolive.svg.asset.json";
import learLogo from "@/assets/references/lear.svg.asset.json";
import driscollsLogo from "@/assets/references/driscolls.png.asset.json";
import pasteurLogo from "@/assets/references/institut-pasteur-maroc.png.asset.json";
import irizarLogo from "@/assets/references/irizar.svg.asset.json";
import alsaLogo from "@/assets/references/alsa.svg.asset.json";
import novecLogo from "@/assets/references/novec.png.asset.json";
import uirLogo from "@/assets/references/uir.png.asset.json";

type AssetPointer = { url: string };
const assetUrl = (asset: unknown) => (asset as AssetPointer).url;

const logos = [
  { name: "REDAL", src: assetUrl(redalLogo) },
  { name: "Groupe Safran", src: assetUrl(safranLogo) },
  { name: "Danone", src: assetUrl(danoneLogo) },
  { name: "Coca-Cola", src: assetUrl(cocaColaLogo) },
  { name: "Colgate-Palmolive", src: assetUrl(colgateLogo) },
  { name: "Lear Corporation", src: assetUrl(learLogo) },
  { name: "Driscoll's", src: assetUrl(driscollsLogo) },
  { name: "Institut Pasteur", src: assetUrl(pasteurLogo) },
  { name: "IRIZAR", src: assetUrl(irizarLogo) },
  { name: "ALSA", src: assetUrl(alsaLogo) },
  { name: "NOVEC", src: assetUrl(novecLogo) },
  { name: "Université Internationale de Rabat", src: assetUrl(uirLogo) },
];

type LogoItem = (typeof logos)[number];

function Row({ items, duration, reverse = false }: { items: LogoItem[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-3">
      <div
        className="flex w-max items-center gap-10 sm:gap-14 animate-[marquee_var(--d)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--d" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={`Logo ${logo.name} — client d'AT SAFETY PRIVE`}
            loading="lazy"
            decoding="async"
            aria-hidden={i >= items.length ? true : undefined}
            className="h-10 sm:h-12 w-auto max-w-[150px] shrink-0 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

export function ReferencesSection() {
  const { t } = useI18n();
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);
  return (
    <section id="references" className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="08" title={t("references.title")} subtitle={t("references.subtitle")} />
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="mt-12 space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={row1} duration={40} />
        <Row items={row2} duration={50} reverse />
      </div>
    </section>
  );
}

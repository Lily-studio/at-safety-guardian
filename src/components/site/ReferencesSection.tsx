import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import redalLogo from "@/assets/references/redal.webp.asset.json";
import safranLogo from "@/assets/references/safran.svg.asset.json";
import danoneLogo from "@/assets/references/danone.png.asset.json";
import cocaColaLogo from "@/assets/references/coca-cola.svg.asset.json";
import ocpLogo from "@/assets/references/ocp-group.png.asset.json";
import oncfLogo from "@/assets/references/oncf.png.asset.json";
import managemLogo from "@/assets/references/managem.png.asset.json";
import cosumarLogo from "@/assets/references/cosumar.png.asset.json";
import lesieurLogo from "@/assets/references/lesieur-cristal.jpg.asset.json";
import renaultLogo from "@/assets/references/renault.svg.asset.json";

import alliancesLogo from "@/assets/references/alliances.png.asset.json";
import lafargeLogo from "@/assets/references/lafargeholcim-maroc.svg.asset.json";
import holcimLogo from "@/assets/references/holcim.svg.asset.json";
import nestleLogo from "@/assets/references/nestle.svg.asset.json";
import centraleDanoneLogo from "@/assets/references/centrale-danone.png.asset.json";
import marocTelecomLogo from "@/assets/references/maroc-telecom.svg.asset.json";
import oneeLogo from "@/assets/references/onee.png.asset.json";
import attijariLogo from "@/assets/references/attijariwafa-bank.png.asset.json";
import bmceLogo from "@/assets/references/bmce-bank.png.asset.json";
import ramLogo from "@/assets/references/royal-air-maroc.svg.asset.json";
import ctmLogo from "@/assets/references/ctm.png.asset.json";
import marsaLogo from "@/assets/references/marsa-maroc.png.asset.json";
import somacaLogo from "@/assets/references/somaca.svg.asset.json";
import peugeotLogo from "@/assets/references/peugeot-maroc.svg.asset.json";
import yazakiLogo from "@/assets/references/yazaki.svg.asset.json";
import delphiLogo from "@/assets/references/delphi.svg.asset.json";
import bombardierLogo from "@/assets/references/bombardier.svg.asset.json";
import stLogo from "@/assets/references/stmicroelectronics.svg.asset.json";
import alstomLogo from "@/assets/references/alstom.svg.asset.json";
import colgateLogo from "@/assets/references/colgate-palmolive.svg.asset.json";
import pgLogo from "@/assets/references/procter-gamble.svg.asset.json";
import unileverLogo from "@/assets/references/unilever.svg.asset.json";

type AssetPointer = { url: string };
const assetUrl = (asset: unknown) => (asset as AssetPointer).url;

const logos = [
  { name: "REDAL", src: assetUrl(redalLogo) },
  { name: "Safran", src: assetUrl(safranLogo) },
  { name: "Danone", src: assetUrl(danoneLogo) },
  { name: "Coca-Cola", src: assetUrl(cocaColaLogo) },
  { name: "OCP Group", src: assetUrl(ocpLogo) },
  { name: "ONCF", src: assetUrl(oncfLogo) },
  { name: "Managem", src: assetUrl(managemLogo) },
  { name: "Cosumar", src: assetUrl(cosumarLogo) },
  { name: "Lesieur Cristal", src: assetUrl(lesieurLogo) },
  { name: "Renault", src: assetUrl(renaultLogo) },
  { name: "Marjane", src: assetUrl(marjaneLogo) },
  { name: "Alliances", src: assetUrl(alliancesLogo), dark: true },
  { name: "Lafarge", src: assetUrl(lafargeLogo) },
  { name: "Holcim", src: assetUrl(holcimLogo) },
  { name: "Nestlé", src: assetUrl(nestleLogo) },
  { name: "Centrale Danone", src: assetUrl(centraleDanoneLogo) },
  { name: "Maroc Telecom", src: assetUrl(marocTelecomLogo) },
  { name: "ONEE", src: assetUrl(oneeLogo) },
  { name: "Attijariwafa Bank", src: assetUrl(attijariLogo) },
  { name: "BMCE Bank", src: assetUrl(bmceLogo) },
  { name: "Royal Air Maroc", src: assetUrl(ramLogo) },
  { name: "CTM", src: assetUrl(ctmLogo) },
  { name: "Marsa Maroc", src: assetUrl(marsaLogo) },
  { name: "Somaca", src: assetUrl(somacaLogo) },
  { name: "Peugeot Maroc", src: assetUrl(peugeotLogo) },
  { name: "Yazaki", src: assetUrl(yazakiLogo) },
  { name: "Delphi", src: assetUrl(delphiLogo) },
  { name: "Bombardier", src: assetUrl(bombardierLogo) },
  { name: "STMicroelectronics", src: assetUrl(stLogo) },
  { name: "Alstom", src: assetUrl(alstomLogo) },
  { name: "Colgate-Palmolive", src: assetUrl(colgateLogo) },
  { name: "Procter & Gamble", src: assetUrl(pgLogo) },
  { name: "Unilever", src: assetUrl(unileverLogo) },
];

type LogoItem = (typeof logos)[number];

function Row({ items, duration, reverse = false }: { items: LogoItem[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-2">
      <div
        className="flex gap-6 w-max animate-[marquee_var(--d)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ["--d" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className={`shrink-0 h-20 min-w-[180px] px-6 flex items-center justify-center rounded-lg border border-border transition-colors hover:border-accent/40 ${logo.dark ? "bg-primary" : "bg-surface"}`}
          >
            <img src={logo.src} alt={`Logo ${logo.name}`} loading="lazy" className="max-h-12 max-w-[140px] object-contain" />
          </div>
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
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="08" title={t("references.title")} subtitle={t("references.subtitle")} />
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={row1} duration={45} />
        <Row items={row2} duration={55} reverse />
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

const stats = [
  { value: 500, suffix: "+", key: "why.stat1" },
  { value: 100, suffix: "+", key: "why.stat2" },
  { value: 98, suffix: "%", key: "why.stat3" },
  { value: 10, suffix: "+", key: "why.stat4" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const dur = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setN(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function StatsSection() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent">
            <span className="w-8 h-px bg-accent" /> 05
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t("why.title")}</h2>
          <p className="mt-4 text-white/80">{t("why.subtitle")}</p>
        </div>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent font-display">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm md:text-base text-white/80 uppercase tracking-wide">{t(s.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

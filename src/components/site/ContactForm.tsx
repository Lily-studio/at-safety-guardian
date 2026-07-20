import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

export function ContactForm() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  const field = "w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all";

  return (
    <section id="contact" className="section-y bg-surface">
      <div className="container-x grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent">
              <span className="w-8 h-px bg-accent" /> 10
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary">{t("contact.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
          </div>
          <ul className="space-y-4">
            {[
              { icon: Phone, label: t("contact.info.phone"), value: "+212 5XX XX XX XX" },
              { icon: Mail, label: t("contact.info.email"), value: "contact@atsafetyprive.ma" },
              { icon: MapPin, label: t("contact.info.location"), value: t("contact.info.locationVal") },
            ].map((it, i) => {
              const Icon = it.icon;
              return (
                <li key={i} className="flex gap-4 items-start p-4 bg-white rounded-lg border border-border">
                  <div className="w-11 h-11 rounded-md bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wide">{it.label}</p>
                    <p className="text-primary font-medium mt-0.5">{it.value}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="rounded-lg overflow-hidden border border-border h-56">
            <iframe
              title="Map — Morocco"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d215031.60!2d-7.62!3d33.57!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sMorocco!5e0!3m2!1sen!2sma!4v1"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 border border-border shadow-[var(--shadow-card)] space-y-4">
          {sent && (
            <div className="flex items-start gap-3 p-4 rounded-md bg-accent/10 text-accent border border-accent/20">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{t("contact.sent")}</p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormRow label={t("contact.name")} error={errors.name}>
              <input name="name" required className={field} autoComplete="name" />
            </FormRow>
            <FormRow label={t("contact.company")}>
              <input name="company" className={field} autoComplete="organization" />
            </FormRow>
            <FormRow label={t("contact.phone")} error={errors.phone}>
              <input name="phone" required type="tel" className={field} autoComplete="tel" />
            </FormRow>
            <FormRow label={t("contact.email")} error={errors.email}>
              <input name="email" required type="email" className={field} autoComplete="email" />
            </FormRow>
          </div>
          <FormRow label={t("contact.subject")} error={errors.subject}>
            <input name="subject" required className={field} />
          </FormRow>
          <FormRow label={t("contact.message")} error={errors.message}>
            <textarea name="message" required rows={5} className={field} />
          </FormRow>
          <button type="submit" className="btn-accent w-full sm:w-auto">
            {t("contact.send")} <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

function FormRow({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-primary mb-1.5">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

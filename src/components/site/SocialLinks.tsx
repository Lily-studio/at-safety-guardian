import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useCompany } from "@/lib/cms";

/**
 * Official social media links. Only accounts with a real URL (https://…)
 * configured in the admin settings are shown — placeholders are never rendered.
 * All links open in a new tab.
 */
export function SocialLinks({ dark = false, withLabels = true }: { dark?: boolean; withLabels?: boolean }) {
  const company = useCompany();
  const items = [
    { key: "facebook", href: company.facebook, icon: Facebook, label: "Facebook", name: "AT SAFETY PRIVE" },
    { key: "instagram", href: company.instagram, icon: Instagram, label: "Instagram", name: "@atsafety.prive" },
    { key: "linkedin", href: company.linkedin, icon: Linkedin, label: "LinkedIn", name: "AT SAFETY PRIVE" },
  ].filter((i) => i.href && i.href.startsWith("http"));

  if (!items.length) return null;

  const linkCls = dark
    ? "flex items-center gap-2.5 text-sm text-white/80 hover:text-accent transition-colors"
    : "flex items-center gap-2.5 text-sm text-primary/80 hover:text-accent transition-colors";
  const iconCls = dark
    ? "p-1.5 rounded-md bg-white/10 shrink-0"
    : "p-1.5 rounded-md bg-accent/10 text-accent shrink-0";

  return (
    <ul className={withLabels ? "space-y-2.5" : "flex gap-2"}>
      {items.map((i) => (
        <li key={i.key}>
          <a
            href={i.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
            aria-label={`${i.label} — ${i.name}`}
          >
            <span className={iconCls}>
              <i.icon size={16} aria-hidden="true" />
            </span>
            {withLabels && (
              <span>
                {i.label} · {i.name}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

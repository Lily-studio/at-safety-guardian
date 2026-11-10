<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- Meta Pixel lives in `src/lib/meta-pixel.ts` and uses Meta Consent Mode: base code loads with `fbq("consent","revoke")` by default and is granted only after explicit cookie consent (`localStorage "cookie-consent" === "accepted"`); all event helpers re-check consent, and no form/personal data is ever sent to Meta. Why: pixel must be detectable by Meta while tracking stays consent-first.
- Social links render only when the configured URL starts with `http` (see `SocialLinks`); placeholders like `#` must never be rendered as links. Why: the site must never show broken or invented social URLs.
- All WhatsApp entry points use `COMPANY_WHATSAPP` from `src/lib/whatsapp.ts`; the floating button and phone popover use `WHATSAPP_GREETING`. Why: one official number everywhere.
- Enquiry validation is shared in `src/lib/enquiry-schema.ts`; WhatsApp opening is synchronous through `src/lib/whatsapp-open.ts`, before saving, with a visible fallback link and save errors. Why: popup restrictions and network failures must not silently lose enquiries.

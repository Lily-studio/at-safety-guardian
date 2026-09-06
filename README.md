# AT Safety Hub

You are an expert senior UX/UI designer, SEO specialist, branding expert and senior full-stack web developer.

Create a COMPLETE production-ready multilingual website for a Moroccan company called:

AT SAFETY PRIVE

The website must look like an international HSE consulting company (similar to Bureau Veritas, SGS, Apave, Dekra, TÜV Rheinland, SOCOTEC) while keeping its own identity.

The design must inspire confidence, professionalism, expertise and corporate credibility.

The website must be extremely modern, premium, elegant, fast, responsive and optimized for conversion.

###################################################

GENERAL REQUIREMENTS

###################################################

Build a real business website, not a landing page.

Use a modern corporate style.

Primary colors:

• Dark Blue (#0B2C4D)

• Safety Orange (#F58220)

• White

• Light Gray backgrounds

Typography:

Modern clean fonts (Inter, Poppins or similar)

Style:

Minimal

Corporate

Premium

Professional

High-end

Animations:

Smooth fade

Subtle hover effects

Micro interactions

No excessive animations

Must be fully responsive:

Desktop

Laptop

Tablet

Mobile

Performance:

90+ Google PageSpeed

SEO optimized

Accessibility compliant

Bug-free

Production ready

###################################################

HEADER

###################################################

Sticky navigation bar

Logo on left

Menu:

Home

About Us

Training

HSE Consulting

References

Contact

Language Switcher

French | English

CTA Button

Request a Quote

###################################################

HERO SECTION

###################################################

Large professional background image showing HSE professionals wearing PPE in an industrial environment.

Dark overlay.

Headline:

AT SAFETY PRIVE

Health & Safety Training

Consulting

HSE Audits

Subheadline:

AT SAFETY PRIVE is a Moroccan consulting firm specialized in Occupational Health and Safety Training, Risk Prevention, Regulatory Compliance and HSE Management Systems.

Buttons:

Discover our Training

Request a Quote

Contact Us

Below the hero display three trust badges:

✔ Experienced Trainers

✔ Regulatory Compliance

✔ Nationwide Services

###################################################

ABOUT US

###################################################

Section title:

About AT SAFETY PRIVE

Content:

AT SAFETY PRIVE is a Moroccan consulting firm specialized in Occupational Health and Safety.

Created by experts from Civil Protection, HSE Engineering and Occupational Medicine, our mission is to help companies prevent workplace accidents, protect employees and build a strong safety culture.

We support organizations through:

• Health & Safety Training

• Risk Prevention

• HSE Consulting

• Safety Audits

• Regulatory Compliance

• HSE Management Systems

Create four elegant icon cards for our values:

Prevention

Professionalism

Field Expertise

Commitment to Safety

###################################################

TRAINING SECTION

###################################################

Create beautiful service cards.

Each card includes:

Professional icon

Title

Short description

Learn More button

Training programs:

Fire Safety

Fire Prevention

Extinguisher Training

Emergency Evacuation

First Aid at Work

CPR

Emergency Response

Patient Care

Manual Handling

Ergonomics

Prevention of Musculoskeletal Disorders

Working at Height

Harness

Scaffolding

Mobile Platforms

Electrical Safety Authorization

Electrical Risks

Lockout Tagout

Chemical Risks

Hazardous Materials

Safety Data Sheets

Road Safety

Defensive Driving

Accident Prevention

###################################################

CONSULTING & AUDITS

###################################################

Professional layout.

Three service blocks.

Safety Audits

Risk Assessment

Safety Inspections

Compliance Audits

Regulatory Compliance

Occupational Safety Regulations

Safety Procedures

Documentation

HSE Management Systems

Safety Policy

Emergency Plans

Evacuation Plans

Continuous Improvement

###################################################

WHY CHOOSE US

###################################################

Include animated statistics:

500+

Employees Trained

100+

Companies Supported

98%

Client Satisfaction

10+

Years of Experience

###################################################

INDUSTRIES WE SERVE

###################################################

Create elegant cards with icons.

Industry

Construction

Logistics

Hospitality

Food Industry

Manufacturing

Warehouses

Healthcare

Energy

###################################################

OUR PROCESS

###################################################

Timeline:

Step 1

Needs Assessment

↓

Step 2

Site Visit

↓

Step 3

Customized Proposal

↓

Step 4

Training / Audit

↓

Step 5

Certification & Follow-up

###################################################

CLIENT REFERENCES

###################################################

Professional carousel.

Placeholder logos.

Text:

Trusted by companies across Morocco in multiple industries.

###################################################

CALL TO ACTION

###################################################

Large orange section.

Headline:

Let's Improve Workplace Safety Together.

Button:

Request Your Free Quote

###################################################

CONTACT

###################################################

Professional contact form.

Fields:

Full Name

Company

Phone

Email

Subject

Message

Button:

Send Request

Display:

Phone

Email

Location:

Morocco

Embed Google Maps placeholder.

###################################################

FOOTER

###################################################

Professional footer.

Company description.

Quick Links.

Training.

Consulting.

Contact.

Social icons.

Copyright.

###################################################

SEO

###################################################

Fully optimized SEO.

Generate:

Unique title tags.

Meta descriptions.

Open Graph tags.

Twitter Cards.

Canonical URLs.

Schema.org structured data.

Organization schema.

Local Business schema.

Service schema.

Breadcrumb schema.

Generate robots.txt.

Generate sitemap.xml.

Semantic HTML.

Correct H1-H2-H3 hierarchy.

Image ALT text.

Internal linking.

Lazy loading.

Optimized Core Web Vitals.

###################################################

CONVERSION OPTIMIZATION

###################################################

Every page should include:

Request Quote buttons.

Call buttons.

Contact buttons.

Sticky CTA on mobile.

Professional forms.

Lead generation optimized.

###################################################

TECHNICAL REQUIREMENTS

###################################################

Use modern React architecture.

TypeScript.

Tailwind CSS.

Framer Motion.

Reusable components.

Component-based architecture.

Responsive Grid.

Dark mode ready.

Error boundaries.

Loading states.

404 page.

Cookie banner.

Privacy Policy page.

Terms & Conditions page.

Fully optimized code.

No placeholder Lorem Ipsum.

No bugs.

No broken links.

No layout shifts.

No accessibility issues.

###################################################

LANGUAGES

###################################################

Primary language:

French

Secondary language:

English

Create a language switcher.

All content must be translated professionally.

###################################################

FINAL GOAL

###################################################

The final website must look like it was designed by a premium digital agency for a multinational HSE consulting company.

It should immediately inspire trust, professionalism, authority and expertise, while maximizing conversions and SEO performance.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/03a10727-2abb-4ced-bd00-00d0dff80de1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying to Cloudflare Workers

`bun run build` produces both halves of the deployment:

- `dist/server/index.mjs` — the SSR worker (Nitro `cloudflare-module` preset)
- `dist/client/` — static assets, bound as `ASSETS` in `dist/server/wrangler.json`

Nitro also writes `.wrangler/deploy/config.json`, so from the repository root:

```bash
bun run cf:preview   # build + run the production worker locally
bun run cf:deploy    # build + deploy to Cloudflare
```

Run wrangler from the repository root (not from `dist/server`), otherwise it
reports a conflict between the generated wrangler config and the deploy config.

CI: `.github/workflows/deploy.yml` builds and deploys on push to `main`. It needs
the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Backend configuration: the app resolves the backend URL and publishable key from
`process.env`, then the build-time `VITE_*` values in the committed `.env`, then
public fallbacks in `src/lib/runtime-env.ts`. No Cloudflare environment variables
are required for the public site to render.

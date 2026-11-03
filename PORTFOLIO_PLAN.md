# Portfolio Plan: Ujjal Kumar Das × Barun Kr Paul

A joint portfolio website for two people who build software together. It
covers **professional work only**: products and platforms built for real users
and clients. PhD and academic research is left out on purpose.

The site has three jobs:

1. **Show** the software you have built and shipped.
2. **Prove** you can do it again, with case studies, live demos and results.
3. **Convert** visitors into conversations with a clear "Start a project" path.

Who it is for: clients (NGOs, startups, schools and institutions, law and
finance firms), agencies looking for partners, and recruiters.

---

## 1. Brand concept

**Name: not decided yet.** Four options stay open: **`k = 2`**, *Das & Paul
Studio*, *Twin Vector* and *DuoForge*. The site has a floating "Name preview"
switcher so you can see each one on the real page before choosing.

The idea behind it: two builders, one team. Tagline:
**"Two minds. One build."**

Logo idea: two glowing points orbiting a shared centre, then snapping into a "2".
(Check the domain and any trademark clash before you settle on a name.)

---

## 2. Look and feel: "Midnight Lab"

| Element | Direction |
|---|---|
| Palette | Near-black ink `#07080C` and deep-navy surfaces. An aurora accent gradient: cyan `#5EEAD4` → violet `#8B5CF6` → magenta `#F472B6`. Amber `#FBBF24` only for calls to action. Light mode: paper white with the same accents. |
| Type | Large, tight display headlines (Space Grotesk or Clash Display), Inter for body text, JetBrains Mono for data, labels and code. |
| Materials | Frosted-glass panels with 1px gradient borders, a faint dot grid, light film grain and soft glows. Used sparingly so it looks premium, not gimmicky. |
| Motion | Smooth scrolling, reveals tied to scroll, magnetic buttons, a custom glowing cursor, and morph transitions from the work grid into each case study. Everything respects `prefers-reduced-motion`. |
| Layout | Bento-grid project wall, generous whitespace, edge-to-edge media and a strong vertical rhythm. |

---

## 3. Signature features (what people will remember)

1. **Living particle hero.** About 3,000 glowing particles drift across the
   screen and converge into two bright points labelled *Ujjal* and *Barun*.
   On scroll they burst apart and regroup into the project categories
   (Mobile · Web · Platforms), and the cursor acts as a gravity well.
2. **3D device showcase.** Each flagship project floats in a phone or laptop
   frame that tilts with the cursor and plays a short screen recording of
   the real app.
3. **ASCII → photo portraits.** Reuse the ASCII portrait generator already in
   this repo (`generate.py`). Portraits start as ASCII art and resolve into
   real photos as you scroll.
4. **Terminal mode and a ⌘K command palette.** Visitors can type `whoami
   barun`, `projects`, `hire`, `neofetch` and more. It carries on the
   neofetch style of your current GitHub card.
5. **Live numbers.** Projects shipped, commits, languages and "last shipped
   2 days ago", pulled from GitHub at build time. `generate.py` already
   fetches these stats.
6. **Bengali / English toggle.** Rare in portfolios and authentic to you. It
   matters for AVK and for clients in West Bengal.
7. *(Later, optional)* **"Ask our portfolio" AI chat.** It answers questions
   about your projects and services. It needs an API key and a cost cap.

---

## 4. Site map

1. **Hero:** living particle field, names, tagline, two buttons (*See our
   work* / *Start a project*).
2. **The Duo:** two cards (photo, role, strengths, links) and a short
   "how we work together" strip.
3. **Selected Work:** a bento grid that opens into full case-study pages.
4. **Services:** Android apps · web platforms and portals · NGO and
   education management systems · dashboards and internal tools · AI
   features inside apps.
5. **How we work:** Discover → Design → Build → Launch → Support.
6. **Tech constellation:** an interactive orbit of your tools, grouped by
   area (Mobile, Web, Backend, Cloud).
7. **Journey:** a timeline of roles, launches and milestones.
8. **Impact and testimonials:** numbers plus quotes from AVK, clients and
   users.
9. **Contact:** a "Start a project" brief builder (project type, budget,
   timeline) plus email, WhatsApp and a booking link.

Extra pages:
- `/card`: a QR-code digital business card for in-person events.
- `/cv/ujjal` and `/cv/barun`: professional CVs you can view and download as
  PDF.
- A playful 404 page where the particles scatter.

---

## 5. Project inventory (draft from GitHub, please confirm)

| Project | What it is | Stack | How to show it |
|---|---|---|---|
| **IPO One** | Android app: six-stage IPO lifecycle dashboard, calendar, allotment checks across 9 registrars, Family Apply, reminders, themes | Kotlin, Material 3, Firebase/Firestore, WorkManager, Android Keystore | Flagship case study. Use **dummy PAN/UPI data** in every screenshot. |
| **AVK: Adivasi Vidyacharcha Kendra** | NGO education management, assessment and remote-monitoring platform for tribal children in Jungle Mahal, West Bengal | TypeScript | Flagship **social-impact** case study |
| **Question Paper Portal** | Previous-year university question papers with contributions, admin review and bulk import | JavaScript, Vercel | Live demo (already deployed) |
| **Gymlive 2026** ★ flagship | Live scoring and results system for the 70th West Bengal State School Games in Gymnastics 2026: judge scoring for MAG, WAG, Rhythmic and Acrobatic (U14/17/19), public results page, giant venue display with up to 8 hall cameras, Chief Judge approvals, audit trail, certificates | JavaScript, Firebase Realtime Database, Firebase Auth and Hosting, Web Crypto | **Flagship case study.** No photos of athletes (minors) without written consent, and no government emblems. |
| **Contact intelligence platform** (Fox & Mandal) | Internal platform; the repo is marked *confidential* | Python | **Only with written permission.** Even then, anonymise it ("for a leading law firm") and use no real data. |
| **Exam-Duty** (Ujjal) | *Description needed* | | To decide |

**Left out (research / PhD or personal):** GeoClusterLab, CCKM / OCKM /
OCKM-T, DNAK and CDK k-means, the clustering benchmark, the ADN review, the
image-encryption repos, Heusler alloy ML, Lung CT U-Net, `publications`,
`sikkim-tour`, `CSDataScience` and the profile README repo.

---

## 6. Case-study page template

1. Hero mockup (device frame, 3D tilt on hover)
2. The problem and who it is for
3. What we built: 3–5 highlights, each with a short looping screen recording
4. Architecture diagram
5. Tech-stack chips
6. Results: users, time saved, adoption
7. Who did what (Ujjal / Barun)
8. Links: Live · GitHub (if public) · Play Store or APK
9. Next project →

---

## 7. Technology

- **Framework:** Astro with React islands, TypeScript and Tailwind. Pages
  stay fast and static, and only the interactive parts ship JavaScript.
- **Graphics and motion:** Three.js (or OGL) for the hero, GSAP and Lenis
  for scrolling and motion.
- **Content:** one MDX file per project, so adding a project means adding
  one file.
- **Hosting:** Vercel (you already use it) on a custom domain. A GitHub
  Action rebuilds daily so the stats stay fresh.
- **Contact:** Web3Forms, Formspree or Resend for the form, Cal.com for
  booking, WhatsApp click-to-chat.
- **Analytics:** Vercel Analytics or Plausible/Umami (privacy-friendly, no
  cookie banner).
- **SEO:** an auto-generated social preview image (OG image) per page,
  schema.org `Person` and `Organization` data, and a sitemap.

**Quality bars:**
- Lighthouse score of 95 or more on mobile.
- Less than 150 KB of JavaScript before the hero; WebGL loads lazily.
- WCAG AA contrast and full keyboard navigation.
- A static fallback when WebGL is missing, and a reduced-motion mode.

---

## 8. Phases

| Phase | What happens |
|---|---|
| **0. Content and decisions** | You gather the items in section 9. *(in progress)* |
| **1. Concept preview** ✅ | A one-page visual prototype (hero, one work section, palette and type) so you can approve the look before the full build. |
| **2. Core build** ✅ (except deploy) | All sections, case studies for Gymlive 2026, IPO One, AVK and Question Paper Portal, the contact brief builder, command menu and light/dark themes. Code is in `portfolio/`. The preview deploy waits for the hosting decision. |
| **3. Depth** | The remaining case studies, terminal mode and the Bengali toggle. |
| **4. Polish** | Motion tuning, performance, accessibility, SEO, and testing on phones and desktops. |
| **5. Launch and marketing** | Domain; launch posts on LinkedIn from both of you; links from both GitHub profile READMEs; QR card; email signatures; submissions to showcase galleries (Awwwards, CSS Design Awards, SiteInspire). |

---

## 9. What we need from you

- [ ] **Brand name:** `k = 2`, Das & Paul Studio, Twin Vector or DuoForge (compare them with the Name preview switcher)
- [ ] **Where the code lives:** recommended is a new repo such as
      `barunkrpaul/portfolio`, added to the session. This repo is Barun's
      GitHub profile README, so the site should not live here.
- [ ] **Domain and hosting** preference (not decided)
- [ ] **Photos** of both of you: high resolution, with a plain or transparent
      background
- [ ] **Professional bios:** 3–4 lines each, plus roles and achievements
- [ ] **Confirmed project list.** For each project: a one-line impact
      statement, screenshots or screen recordings, live links, and who did what.
      Add any client work that is not on GitHub.
- [ ] **Fox & Mandal:** include it anonymised (with permission) or leave it out
- [ ] **2–4 testimonials:** AVK, clients, users
- [ ] **Contact details** to publish: email, WhatsApp, LinkedIn for both

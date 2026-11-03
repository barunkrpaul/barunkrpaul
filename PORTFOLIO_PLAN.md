# Portfolio Plan: Ujjal Kumar Das × Barun Kr Paul

A joint portfolio website for two people who build software together. It has
three jobs:

1. **Show** what you have built: products, platforms and research software.
2. **Prove** you can do it again, through case studies, live demos and papers.
3. **Convert** visitors into conversations with a clear "Start a project" path.

Who it is for: clients (NGOs, startups, institutions, law and finance firms),
academic collaborators, universities and recruiters.

---

## 1. Brand concept

**Proposed name: `k = 2`** (alternatives: *Centroid Studio*, *Das & Paul Labs*).

In k-means clustering, *k* is the number of clusters. Your research is
clustering, and there are two of you. Tagline:
**"Two minds. One convergence."**

Logo idea: two glowing points orbiting a shared centre, then snapping into a "2".
(Check the domain and any trademark clash before you settle on a name.)

---

## 2. Look and feel: "Midnight Lab"

| Element | Direction |
|---|---|
| Palette | Near-black ink `#07080C` and deep-navy surfaces. An aurora accent gradient: cyan `#5EEAD4` → violet `#8B5CF6` → magenta `#F472B6`. Amber `#FBBF24` only for calls to action. Light mode: paper white with the same accents. |
| Type | Large, tight display headlines (Space Grotesk or Clash Display), Inter for body text, JetBrains Mono for data, labels and code. |
| Materials | Frosted-glass panels with 1px gradient borders, a faint dot grid, light film grain and soft glows. Used sparingly so it looks premium, not gimmicky. |
| Motion | Smooth scrolling, reveals tied to scroll, magnetic buttons, a custom cursor that becomes a "centroid", and morph transitions from the work grid into each case study. Everything respects `prefers-reduced-motion`. |
| Layout | Bento-grid project wall, generous whitespace, edge-to-edge media and a strong vertical rhythm. |

---

## 3. Signature features (what people will remember)

1. **Living clustering hero.** About 3,000 particles drift across the screen
   while k-means runs live in a Web Worker. They converge into two glowing
   centroids labelled *Ujjal* and *Barun*. On scroll they split into project
   clusters (Apps · Web · Research · AI), and the cursor acts as a gravity
   well. The seeding uses your own CCKM idea, so the first thing visitors see
   is your research.
2. **Encrypt-on-hover.** Project images and portraits scramble into
   chaotic-map noise and decrypt as you hover. It is a small, real demo of
   your image-encryption work (a simplified client-side version of the
   chaotic keystream).
3. **ASCII → photo portraits.** Reuse the ASCII portrait generator already in
   this repo (`generate.py`). Portraits start as ASCII art and resolve into
   real photos as you scroll.
4. **Terminal mode and a ⌘K command palette.** Visitors can type `whoami
   barun`, `projects`, `hire`, `neofetch` and more. It carries on the
   neofetch style of your current GitHub card.
5. **Research playgrounds.**
   - A seeding visualiser comparing CCKM with k-means++: click to add points,
     step through iterations and compare the SSE.
   - An encryption metrics demo: histograms, correlation, NPCR/UACI.
6. **Live numbers.** Repos, commits, languages and "last shipped 2 days ago",
   pulled from GitHub at build time. `generate.py` already fetches these stats.
7. **Bengali / English toggle.** Rare in portfolios and authentic to you. It
   matters for AVK and for clients in West Bengal.
8. *(Later, optional)* **"Ask our portfolio" AI chat.** It answers questions
   about your projects and services. It needs an API key and a cost cap.

---

## 4. Site map

1. **Hero:** living clustering field, names, tagline, two buttons (*See our
   work* / *Start a project*).
2. **The Duo:** two cards (photo, role, strengths, links) and a short
   "how we work together" strip.
3. **Selected Work:** a bento grid that opens into full case-study pages.
4. **Research Lab:** algorithms, papers (DOI and one-click BibTeX copy),
   code repos and the playgrounds.
5. **Services:** Android apps · web platforms · AI/ML and research
   software · dashboards and data · education technology.
6. **Tech constellation:** an interactive orbit of your tools, grouped by
   cluster.
7. **Journey:** a timeline of education, roles and milestones.
8. **Impact and testimonials:** numbers plus quotes from AVK, clients and
   students.
9. **Contact:** a "Start a project" brief builder (project type, budget,
   timeline) plus email, WhatsApp and a booking link.

Extra pages:
- `/card`: a QR-code digital business card for in-person events.
- `/cv/ujjal` and `/cv/barun`: CVs you can view and download as PDF.
- `/lab-notes`: an optional blog.
- A playful 404 page where the points escape their cluster.

---

## 5. Project inventory (draft from GitHub, please confirm)

### Products and platforms

| Project | What it is | Stack | How to show it |
|---|---|---|---|
| **IPO One** | Android app: six-stage IPO lifecycle dashboard, calendar, allotment checks across 9 registrars, Family Apply, reminders, themes | Kotlin, Material 3, Firebase/Firestore, WorkManager, Android Keystore | Flagship case study. Use **dummy PAN/UPI data** in every screenshot. |
| **AVK: Adivasi Vidyacharcha Kendra** | NGO education management, assessment and remote-monitoring platform for tribal children in Jungle Mahal, West Bengal | TypeScript | Flagship **social-impact** case study |
| **Question Paper Portal** | Previous-year university question papers with contributions, admin review and bulk import | JavaScript, Vercel | Live demo (already deployed) |
| **GeoClusterLab** | Research platform for clustering based on computational geometry | FastAPI, React, Docker | Case study plus live demo |
| **Contact intelligence platform** (Fox & Mandal) | Internal platform; the repo is marked *confidential* | Python | **Only with written permission.** Even then, anonymise it ("for a leading law firm") and use no real data. |
| **Exam-Duty** (Ujjal) | *Description needed* | | To decide |

### Research software

- **CCKM / OCKM / OCKM-T:** deterministic k-means seeding through
  concentric-circle tessellation
- **DNAK k-means, CDK k-means, Geometric clustering benchmark**
- **ADN review:** a review of methods that automatically find the number of
  clusters, with its corpus and verification code
- **Image encryption:** KCGD (fractional-order Chen keystream), LEC-based,
  GNN-based
- **Heusler alloy ML:** leakage-free prediction of Curie temperature,
  magnetisation, formation energy and hull distance
- **Lung CT U-Net:** medical image segmentation

**Leave out:** `sikkim-tour` (personal), the profile README repo, and
`CSDataScience` (unless you want to show coursework).

---

## 6. Case-study page template

1. Hero mockup (device frame, 3D tilt on hover)
2. The problem and who it is for
3. What we built: 3–5 highlights, each with a short looping screen recording
4. Architecture diagram
5. Tech-stack chips
6. Results: users, time saved, papers, adoption
7. Who did what (Ujjal / Barun)
8. Links: Live · GitHub · Play Store or APK · Paper DOI
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
  schema.org `Person` and `Organization` data, a sitemap, and links to
  Google Scholar and ORCID.

**Quality bars:**
- Lighthouse score of 95 or more on mobile.
- Less than 150 KB of JavaScript before the hero; WebGL loads lazily.
- WCAG AA contrast and full keyboard navigation.
- A static fallback when WebGL is missing, and a reduced-motion mode.

---

## 8. Phases

| Phase | What happens |
|---|---|
| **0. Content and decisions** | You gather the items in section 9. |
| **1. Concept preview** | A one-page visual prototype (hero, one work section, palette and type) so you can approve the look before the full build. |
| **2. Core build** | All sections, the first two case studies (IPO One, AVK), the contact form, and a deploy to a preview URL. |
| **3. Depth** | The remaining case studies, research playgrounds, terminal mode and the Bengali toggle. |
| **4. Polish** | Motion tuning, performance, accessibility, SEO, and testing on phones and desktops. |
| **5. Launch and marketing** | Domain; launch posts on LinkedIn from both of you; links from both GitHub profile READMEs; QR card; email signatures; submissions to showcase galleries (Awwwards, CSS Design Awards, SiteInspire). |

---

## 9. What we need from you

- [ ] **Brand name:** `k = 2`, an alternative, or your own
- [ ] **Where the code lives:** recommended is a new repo such as
      `barunkrpaul/portfolio`, added to the session. This repo is Barun's
      GitHub profile README, so the site should not live here.
- [ ] **Domain** preference
- [ ] **Photos** of both of you: high resolution, with a plain or transparent
      background
- [ ] **Bios:** 3–4 lines each, plus roles, education, awards and
      achievements
- [ ] **Confirmed project list.** For each project: a one-line impact
      statement, screenshots or screen recordings, live links, and who did what
- [ ] **Fox & Mandal:** include it anonymised (with permission) or leave it out
- [ ] **Publications:** titles, venues and DOIs (the `publications` repo may
      already have them)
- [ ] **2–4 testimonials:** AVK, clients, students
- [ ] **Contact details** to publish: email, WhatsApp, LinkedIn for both

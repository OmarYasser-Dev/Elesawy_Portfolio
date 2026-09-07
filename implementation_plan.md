# Implementation Plan - Omar Yasser Developer Portfolio

Create a complete, single-page, visually polished and modern developer portfolio website for **Omar Yasser**, **Python Automation & Web Scraping Developer**, using **pure HTML5, CSS3, and vanilla JavaScript**.

## User Review Required

> [!IMPORTANT]
> - The portfolio defaults to **Dark Mode** with an optional **Light Mode** toggle, persisting in `localStorage`.
> - Strictly adheres to credibility guidelines: emphasizes hands-on projects, practical problem-solving, and continuous learning without inflating years of experience, fake companies, or senior claims.
> - Fully responsive across mobile, tablet, and desktop with zero dependencies (pure HTML/CSS/JS with Google Fonts).

## Architecture & Design System

### 1. Visual & Aesthetic Identity
- **Color Palette (Dark Default)**: Deep slate/zinc background (`#0b0f19`, `#111827`), elevated card surfaces (`#1e293b`, `#161f30`), clean borders (`rgba(255, 255, 255, 0.08)`), vibrant accents (`#38bdf8` Python/sky cyan, `#3b82f6` tech blue, `#10b981` automation green).
- **Light Theme**: Clean, crisp tech aesthetic (`#f8fafc` background, `#ffffff` cards, `#0f172a` text, `#0284c7` accents).
- **Typography**: Google Fonts [`Inter`](https://fonts.google.com/specimen/Inter) for clean, highly readable UI text & [`JetBrains Mono`](https://fonts.google.com/specimen/JetBrains+Mono) for terminal, code snippets, and tech badges.
- **Visual Features**:
  - Interactive hero terminal with automation script simulation.
  - Glassmorphic card surfaces with subtle hover glow.
  - Structured skill categories with micro-badge tags.
  - Clean "Hands-on Experience" timeline.
  - Responsive project showcase cards with feature lists and tech tags.
  - Prominent Career Objective callout box.
  - Polished contact form with accessible feedback and social links.

---

## Proposed Changes

### Structure & Organization

```
/
├── index.html          # Semantic HTML5 single-page structure & SEO tags
├── css/
│   └── style.css       # Complete CSS design system, variables, layouts & themes
└── js/
    └── script.js       # Theme toggle, mobile menu, scroll animations, active nav
```

---

### Component Breakdown

#### [NEW] [index.html](file:///f:/Developping/My%20Python2/Portfolio/index.html)
- **`<head>`**: SEO meta tags, Open Graph tags, viewport configuration, Google Fonts preconnect (`Inter` & `JetBrains Mono`), and link to CSS.
- **`<nav>` (Header)**: Brand title ("Omar Yasser / dev"), navigation links (`#hero`, `#about`, `#skills`, `#projects`, `#experience`, `#services`, `#contact`), Theme Toggle Button (Moon/Sun), Mobile Hamburger toggle.
- **`<section id="hero">`**:
  - Headline: "Omar Yasser", Sub-headline: "Python Automation & Web Scraping Developer".
  - Supporting copy: "Building practical automation, web scraping, browser automation, and data-processing solutions with Python."
  - Quick tech tags: `Python`, `Playwright`, `Web Scraping`, `Automation`, `Data Processing`.
  - Primary CTAs: "View Projects" and "Contact Me".
  - Interactive visual terminal preview simulating an automation pipeline run.
- **`<section id="about">`**:
  - Philosophy & background emphasizing practical automation that removes repetitive work.
  - Professional photo placeholder with clean technical SVG avatar frame.
  - Core tool highlights (`Python`, `Playwright`, `Requests`, `Pandas`, `ReportLab`, `PyInstaller`, `Git`).
- **`<section id="skills">`**:
  - 7 categorized skill cards: Programming, Web Automation, Web Scraping, Data Processing, Automation, Documents & Output, Development Tools.
- **`<section id="projects">`**:
  - 2 detailed featured project cards:
    1. *Freelancer Projects Manager (FPM)* — Desktop Automation & Workflow Tool for project versioning, client approvals, and delivery packaging.
    2. *Automated Product PDF Catalog* — Data-to-Document generation workflow from structured web data to Arabic-supported PDF output.
  - Features, tech badges, and GitHub CTA placeholders (`#`).
- **`<section id="experience">`**:
  - Non-fabricated development timeline with categories: *Python Automation Development*, *Web Scraping & Data Extraction*, *Browser Automation* labeled with "Hands-on Projects" & "Independent Development".
- **`<section id="services">`**:
  - 4 realistic service offerings: *Web Scraping*, *Web Automation*, *Business Process Automation*, *Data Processing & Automated Reports*.
- **`<section id="career-objective">`**:
  - Prominently styled callout showcasing Omar's objective to specialize in business automation and data-driven tools.
- **`<section id="contact">`**:
  - Clean contact form (Name, Email, Subject, Message, Submit button with client-side feedback).
  - Direct social links (GitHub, LinkedIn, YouTube, Facebook with `#` placeholders).
- **`<footer>`**:
  - Quick bio summary, social links, copyright (`© 2026 Omar Yasser`), and "Back to top" button.

#### [NEW] [css/style.css](file:///f:/Developping/My%20Python2/Portfolio/css/style.css)
- CSS Custom properties for dark/light themes.
- CSS Reset, typography hierarchy, fluid clamp font sizing.
- Layout grids and flex utilities.
- Card styling, glassmorphism, terminal mockups, timeline lines and dots.
- Form controls styling with focus rings and validation states.
- Micro-interactions, transitions, and hover states.
- Media queries for smooth mobile, tablet, and desktop breakpoints.

#### [NEW] [js/script.js](file:///f:/Developping/My%20Python2/Portfolio/js/script.js)
- Theme toggle with local storage persistence and system preference detection.
- Mobile navigation drawer toggle and outside-click dismissal.
- Active navigation link indicator on scroll using `IntersectionObserver`.
- Scroll reveal animations for sections and project cards.
- Terminal interactive animation / typing effect.
- Contact form client-side validation and feedback toast.
- Smooth scrolling for internal anchor links.

---

## Verification Plan

### Automated / Browser Verification
- Open the built page in the browser via `browser_subagent` to visually verify:
  1. Responsive layout across desktop (1920x1080), tablet (768x1024), and mobile (375x812) viewports.
  2. Theme toggle functionality (switching between dark and light modes cleanly).
  3. Interactive elements (mobile drawer, terminal animation, project cards hover, smooth scrolling, form submission).
  4. Accuracy of all text, headings, badges, and credibility rules.

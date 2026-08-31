# IITH Garage

*The builds for IIT-H* — the workshop that presents every system designed,
built and shipped for IIT Hyderabad in one place.

> Naming: "Garage" is the parent brand and sits on the `iith.online` apex.
> The projects it showcases keep their own names — Sanchari, Nivas, Ruchi —
> each on its own subdomain underneath.

**Status:** live at `iith.online` · **Repo:** `saichandanmettu/iith-garage`

Plain HTML, CSS and JavaScript. No build step, consistent with everything
else in the suite.

## What it covers

Seven projects, all deployed:

| Project | Where | Status |
|---|---|---|
| Abhyas | abhyas.iith.online | Live |
| Merch Store | store.iith.online | Live |
| IITH Athletics | athletics.iith.online | Live |
| IITH Sanchari | sanchari.iith.online | Live |
| Nivas | nivas.iith.online | Live |
| IITH Aquatics | aquatics.iith.online | Live |
| IITH Ruchi | ruchi.iith.online | Testing |

## Design

Overhauled 2026-08-31 to **"The Proving Ground"** — warm bone canvas, warm
near-black ink, one flame-orange accent (`#FF4A17`), colossal Anton condensed
display type, and a full-viewport "runway" that turns the seven builds into
seven hero panels. Body Inter, data JetBrains Mono. `assets/style.css` and
`assets/app.js` were rewritten from scratch; the previous travertine/Syne
design is in git history. `?flat` on the URL disables reveal-gating and
`100svh` sizing for screenshots.

## Editing it

`assets/data.js` is the single edit point — projects, statuses, roadmap,
timeline, stack matrix and costs all live there. The ground rules are
written at the top of that file and are worth reading before adding
anything:

1. **No usage metrics.** Nothing claims trips taken, orders placed or
   students reached — none of it is measured. Every figure on the site is a
   structural fact that can be checked by opening the project.
2. **No invented performance numbers.** No latency or uptime claims.
3. **Status is `live` / `testing` / `soon`**, and every project carries a
   `statusNote` saying plainly what does and does not work.
4. **`github` is set only for repos verified public** — a link that 404s is
   worse than no link.
5. **Never name a payment gateway** in user-facing copy.

Bump `?v=` on `style.css`, `data.js` and `app.js` in `index.html` on every
change — the CDN caches static assets for 7 days, and skipping this is
routinely the reason a fix appears not to have shipped.

## Worth knowing before building it out

This site's whole job is to describe the other projects, so it depends on
facts that live in their trackers and will go stale silently if they change.
Check each project's `KNOWN_ISSUES.md` before writing copy about it.

Secrets scan clean.

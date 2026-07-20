# Changelog

## [2026-07-20]
### Added
- **Data Integration (A012 Part 1)**: Created `api.js` frontend client. Connected `researchers.html` and `publications.html` to real-time `iram-backend` Cloudflare D1 APIs instead of static mock data.
- **Data Integration (A012 Part 2)**: Extended `api.js` to support Projects, Funding, and Conferences. Refactored `projects.html`, `funding.html`, and `conferences.html` to dynamically render real-time data using the `InteractiveTable` component.
- **Design System v2 (A008.2)**: Core component library (`navbar`, `sidebar`, `card`, `modal`, `table`).
- **Layout Framework & Dashboard (A008.4 & A009)**: SPA CSS Grid architecture and first Dashboard prototype.
- **Authentication Prototype (A010)**: Mock session manager (`auth.js`), login page, and role-based access control UI simulation.

### Removed
- Legacy documentation (`11-Contributing.md`, `16-Release-Notes.md`) in Sprint A008.1.

## v1.0.0 Foundation

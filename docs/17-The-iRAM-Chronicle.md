## 2026-07-09

### Sprint M1.1 — Deliverable #001

**Document:** `docs/00-Prologue.md`

**Status:** Accepted

The first official document of the iRAM project was completed and committed to the repository.

This document establishes the philosophy, mission, vision, engineering principles, and long-term purpose of iRAM.

It marks the official beginning of the documented history of the Universe of iRAM.

---

## Foundation Framework v1.1

### Deliverable D001

**Document**
`docs/00-Prologue.md`

**Version**
1.0.0

**Status**
Released

**Summary**

The first official document of the iRAM project was completed.

This document defines the philosophy, vision, mission, engineering principles, and long-term purpose of the project.

It serves as the opening chapter of the Universe of iRAM and establishes the foundation for all future documentation.

**Impact**

- Repository identity established.
- Documentation standard initiated.
- Foundation documentation officially started.

---

## 2026-07-17

### Sprint M2.2 — D1 Database Migration (Researchers Mapping)

**Components:** `iram-backend`, `iram-services`, `iram-db`

**Status:** Completed

**Summary:**

- **Data Extraction & Mapping:** Successfully extracted researcher data (English names) from the legacy system (`researchers.json` in `iram-scopus`) into a CSV file for manual Thai name mapping.
- **Schema Evolution:** Updated `d1-schema.sql` to introduce the `irResearcherProfile` table. This strategic decision ensures the original `irUser` table remains pristine while allowing us to securely link Thai names, academic titles (`fname_th`), and Scopus IDs to user accounts via a foreign key constraint.
- **Automated Migration:** Developed `import_researchers.py` to intelligently process the mapped CSV files, generate UUIDs, handle conflicts safely (`DO NOTHING` on duplicates), and compile robust SQL batch files.
- **Cloudflare D1 Execution:** Executed the compiled SQL scripts directly against the remote production database (`iram-db`) via Wrangler, successfully migrating over 300+ researcher profiles (across multiple batches) into the system seamlessly.

**Impact:**

- The central Cloudflare D1 Database is now successfully seeded with real, mapped researcher data.
- The `iram-backend` is now fully prepared to build APIs around this rich dataset.
- Zero downtime or structural damage to the core `irUser` architecture.

---

---

# 2026-07-17 — Repository Stabilization

Today marked an important milestone in the iRAM Experience project.

Following the completion of the A007 Frontend MVP, the repository entered a synchronization phase to consolidate local and remote development.

Several engineering activities were completed during this milestone.

- Repository synchronization
- Git rebase conflict resolution
- Documentation refinement
- Frontend refinement
- Documentation standardization
- Release preparation

The project also introduced several new repository documents.

- CHANGELOG
- CONTRIBUTING
- DEPLOYMENT

During synchronization, a merge conflict occurred in `docs/README.md`.

The conflict was resolved successfully without data loss, and the repository returned to a clean state.

The development environment is now fully synchronized and prepared for Sprint A008.

This milestone concludes the stabilization phase of the A007 release candidate.

---

# 2026-07-17 — Repository Stabilization

Today marked an important milestone in the iRAM Experience project.

Following the completion of the A007 Frontend MVP, the repository entered a synchronization phase to consolidate local and remote development.

Several engineering activities were completed during this milestone.

- Repository synchronization
- Git rebase conflict resolution
- Documentation refinement
- Frontend refinement
- Documentation standardization
- Release preparation

The project also introduced several new repository documents.

- CHANGELOG
- CONTRIBUTING
- DEPLOYMENT

During synchronization, a merge conflict occurred in `docs/README.md`.

The conflict was resolved successfully without data loss, and the repository returned to a clean state.

The development environment is now fully synchronized and prepared for Sprint A008.

This milestone concludes the stabilization phase of the A007 release candidate.

---

# 2026-07-20 — Phase 3: RMIS Platform Foundation

Today marked the transition from a promotional landing page to a functional web application platform. Adopting a **Feature-based Delivery** workflow, the following milestones were achieved:

- **Sprint A008.1 (Documentation Cleanup)**: Streamlined legacy documents to prepare for the new phase.
- **Sprint A008.2 (Design System v2)**: Created the foundational Component Library (UI Kit) to ensure reusable, consistent frontend elements (Navbar, Sidebar, Card, Table).
- **Sprint A008.4 & A009 (Dashboard Layout Framework)**: Introduced a Single Page Application (SPA) CSS Grid layout, successfully rendering the first interactive Dashboard prototype.
- **Sprint A010 (Authentication Prototype)**: Built a frontend mock session manager (`auth.js`) and a dedicated `login.html` page to simulate Role-Based Access Control (RBAC), restricting unauthorized access to the Dashboard.
- **Sprint A011 (Core Modules)**: Created UI interfaces for Research Projects, Researchers, Funding, Publications, and Conferences, fully integrated with RAM-U branding.
- **Sprint A012 (Data Integration - Part 1)**: Transitioned the platform from a static mockup to a dynamic application by integrating `iram-experience` with `iram-backend` (Cloudflare Workers/D1). The Researchers Directory and Publications modules now successfully render live data.

The architecture is now securely positioned to begin constructing the remaining Backend APIs (Sprint A012 Part 2).

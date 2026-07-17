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

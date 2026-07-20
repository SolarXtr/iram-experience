-----------------------

Title: Design System v2
Document ID: IRAM-DOC-023
Version: 2.0.0
Status: Active
Project: iRAM (Intelligent Research Administration & Management)
Phase: RMIS Platform Foundation
Created: 2026-07-20
----------------------

# 🎨 Design System v2

> *The foundational component library for the iRAM RMIS Platform.*

---

## 1. Overview

Design System v2 marks the transition from a purely promotional landing page to a fully functional Research Management Information System (RMIS). This system prioritizes **Component Reusability**, **Accessibility**, and **Consistency**.

## 2. Methodology

We are adopting a **UI Kit (Reference Library)** approach. 
Developers will reference the HTML snippets in `public/components/` and construct pages manually. This ensures maximum performance and SEO capabilities, anticipating the future introduction of a frontend build system (A008.6).

## 3. Core Components

| Component | Description | Location |
| --- | --- | --- |
| **Navbar** | Top navigation supporting user profiles and system alerts. | `public/components/navbar.html` |
| **Sidebar** | Module navigation (Dashboard, Projects, Funding). | `public/components/sidebar.html` |
| **Card** | Content containers for KPI metrics and summaries. | `public/components/card.html` |
| **Modal** | Accessible dialog windows for forms and confirmations. | `public/components/modal.html` |
| **Table** | Data grid for tabular RMIS data. | `public/components/table.html` |
| **Footer** | Standard application footer. | `public/components/footer.html` |

## 4. Design Tokens

All components rely on CSS variables defined in `styles.css`.
New component-specific styles are encapsulated in `public/assets/css/components.css`.

- **Primary**: `var(--primary)`
- **Secondary**: `var(--secondary)`
- **Background**: `var(--bg-color)`
- **Text**: `var(--text-color)`
- **Border Radius**: `4px` and `8px`

## 5. JavaScript Interactions

Interactive components (like Modals and Dropdowns) use vanilla JavaScript defined in `public/assets/js/components.js`.

---
**End of Document**

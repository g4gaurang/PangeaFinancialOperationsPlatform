# Pangea Financial Operations Platform Prototype

## Implementation plan

* [ ] Establish the React, TypeScript, Vite, styling, charting, and icon foundation.
* [ ] Define a central typed product model containing positioning, challenges, workflows, personas, capabilities, maturity, measures, integrations, controls, calls to action, colors, and icons.
* [ ] Build the portfolio shell, responsive navigation, command-center hero, persistent product switcher, challenge explorer, and reusable product narrative components.
* [ ] Build five distinct interactive product demonstrations from shared components and fictional data.
* [ ] Build the relationship map, role selector, AI governance flow, executive dashboard, security controls, architecture explorer, integration categories, adoption roadmap, service model, differentiators, and demonstration modal.
* [ ] Add metadata, a locally generated Open Graph image, GitHub Pages base configuration, deployment workflow, and repository documentation.
* [ ] Verify production build, static checks, claim guardrails, responsive layouts, keyboard behavior, modal focus, reduced motion, and visible fictional-data notices.
* [ ] Commit, push, create the pull request, and report deployment status.

## Design and implementation decisions

* Use one portfolio page with state-driven product exploration; this keeps cross-product context visible.
* Keep substantive product copy in `src/data/products.ts`; shared components consume the selected product.
* Use lightweight CSS and SVG visualizations for core interactions, with Recharts reserved for charts where axes and trends improve interpretation.
* Treat every displayed result as fictional and label it near the relevant view.
* Present integration, deployment, AI, and maturity language as configurable or conditional where implementation evidence is not yet approved.

## Review

Pending implementation and validation.

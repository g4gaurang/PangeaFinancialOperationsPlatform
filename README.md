# Pangea Financial Operations Platform

Interactive GitHub Pages prototype for a connected portfolio of five financial-management products:

* Pangea Pulse
* Pangea Direct
* Pangea Shield
* Pangea Scale
* Pangea Payroll — Pay & Workforce

## Local setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

The Vite base path is `/PangeaFinancialOperationsPlatform/`, matching the repository name. The Pages workflow builds and uploads `dist` when changes reach `main`.

## Content updates

Product content is maintained in `src/data/products.ts`. The typed model contains:

* Public names, descriptors, positioning, and buyer problems
* Capability groups and maturity labels
* Personas, workflow stages, measures, and open actions
* Integration categories and professional-review controls
* Disclaimers, calls to action, colors, and icon references
* Cross-product connections and business challenges

Comments in the data file identify where approved metrics, customer evidence, screenshots, maturity changes, and named integrations may be added. Shared React components render the selected product, so product copy can change without rebuilding the page structure.

## Product maturity

Each capability carries one of these labels:

* Available
* Configurable
* Available through integration
* Planned
* Concept

Labels describe the prototype content model and require product-owner confirmation before public release. Planned and concept items should not be described as available.

## Fictional information

Dashboard values, organization details, transactions, payroll records, scenarios, financial measures, dates, and workflow records in this repository are fictional. They do not represent Pangea results, customer results, or industry benchmarks.

Do not commit customer financial information, employee or payroll records, bank information, tax data, credentials, or other sensitive material.

## Professional-review safeguards

The experience places review language near financial reporting, proposed adjustments, valuation scenarios, control indicators, strategic models, payroll calculations, and filing-support workflows. Authorized personnel remain responsible for accounting conclusions, tax positions, valuation judgments, control assessments, payroll approvals, statutory filings, and consequential business decisions.

The prototype does not provide legal, tax, accounting, payroll, valuation, or investment advice. It does not claim autonomous posting, filing, approval, certification, or valuation.

## Platform and integration positioning

The architecture supports customer-approved public cloud, private cloud, on-premises, or hybrid infrastructure. Integration categories are presented as patterns using APIs, webhooks, events, secure files, approved middleware, or batch processing. A named source system must not be described as production-ready or prebuilt without approved evidence.

## GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Merge or push the implementation to `main`, or run the Pages workflow manually.

The expected site URL is:

`https://g4gaurang.github.io/PangeaFinancialOperationsPlatform/`

import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  CloudCog,
  Database,
  FileClock,
  FileSearch,
  Fingerprint,
  GitBranch,
  Layers3,
  Link2,
  LockKeyhole,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import {
  challenges,
  integrationCategories,
  portfolioPersonas,
  productById,
  productConnections,
  products,
  type ProductId,
} from "./data/products";
import { ProductSwitcher } from "./components/ProductSwitcher";
import { MaturityBadge } from "./components/MaturityBadge";
import { MiniBars, ProductDemo } from "./components/ProductDemo";
import { DemoModal } from "./components/DemoModal";
import "./styles/global.css";

const nav = [
  ["Platform", "platform"],
  ["Products", "products"],
  ["Business Challenges", "challenges"],
  ["How It Connects", "connects"],
  ["Analytics", "analytics"],
  ["Governance", "governance"],
  ["Adoption", "adoption"],
];

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Navigation({ onDemo }: { onDemo: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="Pangea home"><span className="brand-mark"><span/><span/><span/><span/><span/></span><span>PANGEA<small>FINANCIAL OPERATIONS</small></span></a>
      <button className="nav-toggle" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {nav.map(([label, anchor]) => <a href={`#${anchor}`} key={anchor} onClick={() => setOpen(false)}>{label}</a>)}
        <button type="button" onClick={onDemo}>Request a Demo</button>
      </nav>
    </header>
  );
}

function Hero({ selected, setSelected, onDemo }: { selected: ProductId; setSelected: (id: ProductId) => void; onDemo: () => void }) {
  const product = productById[selected];
  return (
    <section className="hero" id="platform">
      <div className="hero-copy">
        <p className="eyebrow">Pangea Financial Operations Platform</p>
        <h1>Connect financial operations with the decisions that shape the business.</h1>
        <p className="hero-lede">Pangea brings financial reporting, transaction diligence, governance, scenario planning, and payroll operations into a connected portfolio that works with your existing business systems.</p>
        <div className="hero-actions"><a className="button button--primary" href="#products">Explore the Product Portfolio <ArrowRight/></a><button className="button button--secondary" type="button" onClick={onDemo}>Request a Demonstration</button></div>
        <p className="hero-note"><CircleCheck/> Begin with one product. Extend the platform as financial priorities evolve.</p>
      </div>
      <div className="command-center" style={{ "--product-accent": product.accent } as React.CSSProperties}>
        <div className="command-top"><span>FINANCE COMMAND CENTER</span><span className="live-label"><i/> FICTIONAL DATA</span></div>
        <div className="command-body">
          <div className="node-orbit" aria-label="Select a Pangea product">
            <span className="orbit-line"/>
            {products.map((item, index) => (
              <button key={item.id} type="button" className={`orbit-node orbit-node--${index + 1} ${selected === item.id ? "active" : ""}`} style={{ "--node-accent": item.accent } as React.CSSProperties} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
                <span>{item.shortName}</span><small>{item.measures[0]}</small>
              </button>
            ))}
            <div className="orbit-core"><span>Connected</span><strong>Financial context</strong><small>Source-linked • Role-aware</small></div>
          </div>
          <div className="command-detail">
            <p className="eyebrow">{product.expandedName}</p>
            <h3>{product.purpose}</h3>
            <div className="command-meta"><span>Primary users<strong>{product.primaryUsers.slice(0, 2).join(" · ")}</strong></span><span>Current workflow<strong>{product.workflow[1].title} · {product.workflow[2].title}</strong></span></div>
            <MiniBars accent={product.accent}/>
            <div className="measure-row">{product.measures.slice(0, 3).map((measure, index) => <span key={measure}><small>{measure}</small><strong>{["Current", "Review", "Tracked"][index]}</strong></span>)}</div>
            <p className="illustrative">Illustrative product view using fictional data.</p>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#challenges">See the portfolio <ArrowDown/></a>
    </section>
  );
}

function ChallengeExplorer({ onSelectProduct }: { onSelectProduct: (id: ProductId) => void }) {
  const [active, setActive] = useState(0);
  const challenge = challenges[active];
  const product = productById[challenge.product];
  return (
    <section className="section section--light" id="challenges">
      <SectionIntro eyebrow="Business challenges" title="Finance teams need connected information, controlled workflows, and clearer decision support." copy="Select a challenge to see the affected roles, potential business effect, and relevant product response."/>
      <div className="challenge-layout">
        <div className="challenge-list" role="tablist" aria-label="Finance challenges">
          {challenges.map((item, index) => <button role="tab" aria-selected={active === index} key={item.title} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{item.title}</strong><ChevronRight/></button>)}
        </div>
        <article className="challenge-detail" style={{ "--product-accent": product.accent } as React.CSSProperties}>
          <p className="eyebrow">{product.publicName}</p><h3>{challenge.title}</h3><p className="large-copy">{challenge.detail}</p>
          <div className="detail-grid"><div><span>Who experiences it</span><p>{challenge.people}</p></div><div><span>Business effect</span><p>{challenge.effect}</p></div><div><span>Product response</span><p>{challenge.response}</p></div></div>
          <div className="monitor-row"><span>Measures to monitor</span>{challenge.measures.map((measure) => <b key={measure}>{measure}</b>)}</div>
          <button className="text-button" onClick={() => { onSelectProduct(challenge.product); document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" }); }}>View {product.shortName} <ArrowRight/></button>
        </article>
      </div>
    </section>
  );
}

function ProductExplorer({ selected, setSelected }: { selected: ProductId; setSelected: (id: ProductId) => void }) {
  const [view, setView] = useState<"overview" | "capabilities" | "workflow" | "personas" | "analytics" | "integrations" | "review">("overview");
  const product = productById[selected];
  const views = ["overview", "capabilities", "workflow", "personas", "analytics", "integrations", "review"] as const;
  return (
    <section className="section product-section" id="products" style={{ "--product-accent": product.accent } as React.CSSProperties}>
      <SectionIntro eyebrow="Product portfolio" title="One platform context. Five focused product experiences." copy="The selected product controls the overview, buyer challenges, workflow, personas, capabilities, demonstration, analytics, integrations, and professional-review controls."/>
      <ProductSwitcher active={selected} onChange={(id) => { setSelected(id); setView("overview"); }}/>
      <div className="product-shell">
        <aside className="product-side">
          <span className="product-number">0{products.findIndex((item) => item.id === selected) + 1}</span>
          <p className="eyebrow">{product.expandedName}</p><h3>{product.descriptor}</h3><p>{product.positioning}</p>
          <div className="product-side__services">{product.services.slice(0, 5).map((service) => <span key={service}>{service}</span>)}</div>
          <button className="button button--accent">{product.cta} <ArrowRight/></button>
        </aside>
        <div className="product-main">
          <div className="subnav" role="tablist" aria-label={`${product.shortName} content`}>
            {views.map((item) => <button key={item} role="tab" aria-selected={view === item} onClick={() => setView(item)}>{item}</button>)}
          </div>
          {view === "overview" && <div className="view-panel"><div className="overview-grid"><div><p className="eyebrow">Immediate priority</p><h3>{product.purpose}</h3><p>{product.positioning}</p></div><div className="metric-stack">{product.measures.map((measure, index) => <div key={measure}><span>{measure}</span><strong>{["Monitor", "Explain", "Review", "Trace"][index]}</strong></div>)}</div></div><ProductDemo product={product}/></div>}
          {view === "capabilities" && <div className="capability-grid">{product.capabilities.map((group) => <article key={group.title}><p className="eyebrow">{group.capabilities.length} capabilities</p><h3>{group.title}</h3>{group.capabilities.map((item) => <div className="capability-row" key={item.name}><span><strong>{item.name}</strong><small>{item.description}</small></span><MaturityBadge value={item.maturity}/></div>)}</article>)}</div>}
          {view === "workflow" && <div className="workflow-steps">{product.workflow.map((step, index) => <article key={step.title}><span>0{index + 1}</span><div><p className="eyebrow">{step.owner}</p><h3>{step.title}</h3><p>{step.detail}</p></div></article>)}</div>}
          {view === "personas" && <div className="persona-product-grid">{product.personas.map((persona) => <article key={persona.name}><span className="persona-icon">{persona.name.slice(0, 2).toUpperCase()}</span><h3>{persona.name}</h3><p>{persona.decisions}</p><dl><dt>Key workflows</dt><dd>{persona.workflows.join(" · ")}</dd><dt>Measures</dt><dd>{persona.measures.join(" · ")}</dd><dt>Approval</dt><dd>{persona.approvals}</dd></dl></article>)}</div>}
          {view === "analytics" && <div className="view-panel"><div className="overview-grid"><div><p className="eyebrow">Product analytics</p><h3>Trace measures to approved information.</h3><p>Drill-through patterns connect a displayed measure to its source period, mapping, assumption, and review status.</p></div><div className="source-trace"><span>Displayed measure</span><ArrowRight/><span>Calculation</span><ArrowRight/><span>Source record</span><ArrowRight/><span>Review history</span></div></div><ProductDemo product={product}/></div>}
          {view === "integrations" && <div className="integration-view"><div><p className="eyebrow">Relevant categories</p><h3>Connect through approved patterns.</h3><p>Connections may use APIs, webhooks, events, secure files, batch processing, or approved middleware. Source systems remain authoritative where appropriate.</p></div>{product.integrations.map((item) => <button key={item}><Link2/><span><strong>{item}</strong><small>Connection scope requires confirmation</small></span><ChevronRight/></button>)}</div>}
          {view === "review" && <div className="review-panel"><ShieldCheck/><div><p className="eyebrow">Professional-review control</p><h3>Authorized people remain accountable for consequential decisions.</h3><p>{product.reviewControl}</p><p>{product.disclaimer}</p></div></div>}
        </div>
      </div>
    </section>
  );
}

function RelationshipMap() {
  const [active, setActive] = useState(0);
  const connection = productConnections[active];
  return (
    <section className="section section--light" id="connects">
      <SectionIntro eyebrow="Connected portfolio" title="Information moves through configured connections and permissions." copy="Select a relationship to inspect the exchanged information, owner, approval, source, frequency, and audit record."/>
      <div className="relationship-layout">
        <div className="relationship-map">
          <div className="map-core"><Network/><span>Shared platform</span><small>Workflow · identity · audit history</small></div>
          {products.map((product, index) => <div key={product.id} className={`map-product map-product--${index + 1}`} style={{ "--product-accent": product.accent } as React.CSSProperties}><strong>{product.shortName}</strong><small>{product.descriptor.split("&")[0]}</small></div>)}
          <svg className="map-lines" viewBox="0 0 600 420" role="img" aria-label="Products connect through governed information flows"><path d="M110 90 C230 90 220 200 300 210"/><path d="M490 90 C370 90 380 200 300 210"/><path d="M80 320 C200 320 220 230 300 210"/><path d="M520 320 C400 320 380 230 300 210"/><path d="M300 380 L300 210"/></svg>
        </div>
        <div className="connection-panel">
          <div className="connection-tabs">{productConnections.map((item, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item.title}>{item.title}</button>)}</div>
          <p className="eyebrow">Configured information flow</p><h3>{connection.title}</h3><dl>
            <dt>Information exchanged</dt><dd>{connection.information}</dd><dt>Responsible owner</dt><dd>{connection.owner}</dd><dt>Required approval</dt><dd>{connection.approval}</dd><dt>Source system</dt><dd>{connection.source}</dd><dt>Frequency</dt><dd>{connection.frequency}</dd><dt>Audit record</dt><dd>{connection.audit}</dd>
          </dl>
          <p className="notice"><LockKeyhole/> Information does not flow without configured integrations and permissions.</p>
        </div>
      </div>
    </section>
  );
}

function RoleExperiences() {
  const [active, setActive] = useState(0);
  const role = portfolioPersonas[active];
  const roleProducts = products.filter((_, index) => (index + active) % 3 !== 1).slice(0, 3);
  return (
    <section className="section role-section">
      <SectionIntro eyebrow="Role-based experiences" title="A shared financial context, shaped around each responsibility."/>
      <div className="role-picker">{portfolioPersonas.map((persona, index) => <button key={persona} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{persona.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>{persona}</button>)}</div>
      <div className="role-detail"><div><p className="eyebrow">Selected experience</p><h3>{role}</h3><p>{role === "System Administrator" ? "Configure identity, permissions, integrations, environments, and monitoring." : `Review ${role.toLowerCase()} decisions using source-linked measures, assigned workflows, and recorded approvals.`}</p></div><div><span>Relevant products</span>{roleProducts.map((product) => <b key={product.id} style={{ borderColor: product.accent }}>{product.shortName}</b>)}</div><div><span>Approval responsibility</span><p>Limited to configured role and entity permissions; consequential decisions remain with authorized personnel.</p></div></div>
    </section>
  );
}

function AIAssistance() {
  const functions = ["Summarize financial trends", "Explain material variances", "Classify transaction documents", "Prepare a cash-flow narrative", "Identify missing diligence items", "Suggest adjustment categories", "Draft control-test summaries", "Organize audit requests", "Prepare scenario commentary", "Draft payroll exception summaries"];
  const flow = ["Approved source information", "AI-assisted analysis", "Source-linked draft", "Professional review", "Authorized decision", "Recorded outcome"];
  return (
    <section className="section ai-section">
      <div className="ai-heading"><div><p className="eyebrow"><Sparkles/> Governed AI assistance</p><h2>AI assistance grounded in approved financial information.</h2><p>Commercial, open-source, or frontier models may be used based on customer architecture, permissions, and governance.</p></div><div className="ai-functions">{functions.map((item) => <span key={item}><Bot/>{item}</span>)}</div></div>
      <div className="ai-flow">{flow.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < flow.length - 1 && <ArrowRight/>}</div>)}</div>
      <div className="guardrail-grid">
        <article><LockKeyhole/><h3>Authorized context</h3><p>Limit analysis to permitted data, products, and entities. External-model training on customer data requires authorization.</p></article>
        <article><FileSearch/><h3>Traceable drafts</h3><p>Identify generated content as draft, retain source links, and record model and prompt versions where configured.</p></article>
        <article><Fingerprint/><h3>Human decision</h3><p>Require professional review and capture corrections, overrides, and the authorized outcome.</p></article>
      </div>
      <p className="notice notice--wide">AI assistance does not provide legal, tax, accounting, payroll, valuation, or investment advice. It does not autonomously post entries, file taxes, approve payroll, certify controls, or finalize valuations.</p>
    </section>
  );
}

function FinanceDashboard() {
  const [entity, setEntity] = useState("Consolidated");
  const [period, setPeriod] = useState("Q3 2026");
  const [product, setProduct] = useState("Portfolio");
  const [drawer, setDrawer] = useState<string | null>(null);
  const measures = [
    ["Cash position", "$4.28m", "+2.4%", "Pulse"], ["Forecast variance", "($142k)", "Review", "Pulse"], ["Working capital", "41 days", "−3 days", "Pulse"], ["EBITDA trend", "$2.07m", "+4.1%", "Direct"], ["Transaction readiness", "72%", "6 open", "Direct"], ["Control exceptions", "4", "1 high", "Shield"], ["Statutory obligations", "7", "30 days", "Shield"], ["Active scenarios", "3", "1 approved", "Scale"], ["Payroll status", "In review", "2 items", "Payroll"], ["Reconciliation exceptions", "3", "Assigned", "Payroll"],
  ];
  return (
    <section className="section dashboard-section" id="analytics">
      <SectionIntro eyebrow="Executive portfolio dashboard" title="A decision view across finance operations." copy="Filter the fictional portfolio view, then open a measure to inspect its source and review status."/>
      <div className="dashboard">
        <div className="dashboard-toolbar"><div className="dashboard-title"><span className="brand-mark small"><span/><span/><span/><span/><span/></span><span>PORTFOLIO / EXECUTIVE VIEW<small>Updated 09:42 • Fictional</small></span></div><div className="dashboard-filters"><label>Entity<select value={entity} onChange={(e) => setEntity(e.target.value)}><option>Consolidated</option><option>North entity</option><option>Services entity</option></select></label><label>Period<select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Q3 2026</option><option>Aug 2026</option><option>FY 2026</option></select></label><label>Product<select value={product} onChange={(e) => setProduct(e.target.value)}><option>Portfolio</option>{products.map((item) => <option key={item.id}>{item.shortName}</option>)}</select></label></div></div>
        <div className="dashboard-content">
          <div className="dashboard-metrics">{measures.filter((item) => product === "Portfolio" || item[3] === product).map(([label, value, delta, source]) => <button key={label} onClick={() => setDrawer(label)}><span>{label}<small>{source}</small></span><strong>{value}</strong><b>{delta}</b><ChevronRight/></button>)}</div>
          <div className="dashboard-side"><p className="eyebrow">Attention queue</p><h3>5 items need review</h3>{["Cash assumption changed", "Control evidence overdue", "Payroll mapping exception"].map((item, index) => <button key={item} onClick={() => setDrawer(item)}><span><i className={`priority-${index}`}/><strong>{item}</strong><small>Assigned • fictional</small></span><ChevronRight/></button>)}</div>
        </div>
        {drawer && <div className="source-drawer" role="status"><div><p className="eyebrow">Source inspection</p><h3>{drawer}</h3><p>{entity} · {period} · Approved fictional source set</p><span>Source: sample ledger / scenario v3</span><span>Assumption: current approved case</span><span>Exception: reviewer assigned</span></div><button aria-label="Close source detail" onClick={() => setDrawer(null)}><X/></button></div>}
        <p className="dashboard-disclaimer">Illustrative analytics — not Pangea or customer results.</p>
      </div>
    </section>
  );
}

const securityControls = ["Role-based access", "Least-privilege configuration", "Multifactor authentication support", "Single sign-on integration", "Encryption", "Data masking", "Entity-level access", "Approval controls", "Segregation-of-duties support", "Retention configuration", "Audit history", "Integration monitoring", "Environment separation", "Backup and recovery", "Data-residency configuration"];

function GovernanceArchitecture() {
  const [layer, setLayer] = useState(1);
  const layers = [
    ["Experience Layer", "CFO dashboard · Finance workspace · Deal workspace · Risk and audit workspace · Planning workspace · Payroll portal · Executive reporting", Activity],
    ["Pangea Product Layer", "Pulse · Direct · Shield · Scale · Payroll", Boxes],
    ["Shared Platform Services", "Workflow · Approvals · Documents · Notifications · Rules · Analytics · AI assistance · Audit history · Configuration", Layers3],
    ["Integration Layer", "APIs · Webhooks · Events · Secure files · Approved middleware · Batch processing", GitBranch],
    ["Enterprise Systems", "Accounting · ERP · Banking · Payroll · HR · CRM · Documents · Electronic signature · Tax and statutory · Data warehouse", Database],
    ["Security and Governance", "Identity · Access · Encryption · Monitoring · Retention · Model governance · Backup and recovery", ShieldCheck],
    ["Deployment Foundation", "Customer-approved public cloud · Private cloud · On-premises · Hybrid environment", CloudCog],
  ] as const;
  return (
    <section className="section governance-section" id="governance">
      <SectionIntro eyebrow="Security and governance" title="Configurable controls for sensitive financial and workforce information." copy="The Pangea platform provides configurable controls that can support an organization’s security, privacy, financial governance, and recordkeeping requirements."/>
      <div className="security-grid">{securityControls.map((item) => <div key={item}><Check/>{item}</div>)}</div>
      <p className="governance-note">Control configuration does not guarantee compliance with GAAP, SOX, ICFR, tax law, payroll regulations, securities law, or another requirement.</p>
      <div className="architecture">
        <div className="architecture-copy"><p className="eyebrow">Platform-neutral architecture</p><h2>Fit the customer’s approved technology environment.</h2><p>Actual components depend on customer architecture, data readiness, jurisdiction requirements, and approved technology standards.</p><div className="architecture-detail"><span>Selected layer</span><h3>{layers[layer][0]}</h3><p>{layers[layer][1]}</p></div></div>
        <div className="architecture-layers">{layers.map(([title, detail, Icon], index) => <button key={title} className={layer === index ? "active" : ""} onClick={() => setLayer(index)}><Icon/><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight/></button>)}</div>
      </div>
    </section>
  );
}

function IntegrationsAdoption() {
  const [phase, setPhase] = useState(0);
  const phases = [
    ["Phase 1", "Connect the Finance Foundation", ["Select a priority product", "Connect approved source data", "Define roles and controls", "Establish baseline reporting", "Validate source reconciliation"]],
    ["Phase 2", "Configure Workflows", ["Configure calculations", "Establish approvals", "Set exception thresholds", "Introduce product workspaces", "Train users"]],
    ["Phase 3", "Expand Across Finance", ["Add another Pangea product", "Reuse shared data and controls", "Connect additional systems", "Introduce cross-product reporting", "Strengthen governance"]],
    ["Phase 4", "Improve and Scale", ["Refine models", "Add entities or jurisdictions", "Expand analytics", "Introduce governed AI assistance", "Continue workflow optimization"]],
  ] as const;
  return (
    <>
      <section className="section integration-section">
        <SectionIntro eyebrow="Integration ecosystem" title="Integration categories, not assumed connectors." copy="Connections use approved APIs, webhooks, events, secure files, middleware, or batch patterns. Named source-system examples require scope confirmation and are not represented by logos."/>
        <div className="integration-cloud">{integrationCategories.map((item, index) => <span key={item} className={`size-${index % 3}`}><Link2/>{item}</span>)}</div>
        <div className="integration-principles"><div><Database/><strong>Source authority</strong><p>Approved source systems remain authoritative where appropriate.</p></div><div><LockKeyhole/><strong>Customer ownership</strong><p>Customers retain ownership of financial and workforce information.</p></div><div><Workflow/><strong>Connection evidence</strong><p>Production readiness is stated only after connection scope and testing are documented.</p></div></div>
      </section>
      <section className="section adoption-section" id="adoption">
        <SectionIntro eyebrow="Modular adoption roadmap" title="Start with one priority. Extend through governed increments."/>
        <div className="roadmap">
          <div className="roadmap-tabs">{phases.map(([label, title], index) => <button key={label} className={phase === index ? "active" : ""} onClick={() => setPhase(index)}><span>{label}</span><strong>{title}</strong></button>)}</div>
          <div className="roadmap-detail"><p className="eyebrow">{phases[phase][0]}</p><h3>{phases[phase][1]}</h3>{phases[phase][2].map((step, index) => <div key={step}><span>0{index + 1}</span>{step}</div>)}</div>
        </div>
        <p className="notice notice--wide">Sequence and timing depend on customer priorities, data readiness, jurisdiction requirements, and implementation scope.</p>
      </section>
    </>
  );
}

function ServiceModelWhy() {
  const models = [
    ["Product Subscription", "Reusable capabilities, configurable workflows, dashboards, reports, data structures, integration patterns, documentation, and approved product updates.", Boxes],
    ["Implementation Services", "Discovery, architecture, configuration, data mapping, integration, migration, testing, training, deployment, and readiness support.", Workflow],
    ["Managed Services", "Production support, monitoring, release coordination, data-quality assistance, reporting support, configuration changes, integration support, and operational optimization.", FileClock],
    ["Professional Advisory Services", "Accounting, transaction, valuation, strategic planning, risk and control, payroll, and tax support provided under a defined advisory scope.", Building2],
  ] as const;
  const reasons = [
    ["Five connected finance products", "Focused workspaces share platform services and a governed financial context."],
    ["Modular adoption", "Begin with an immediate priority and add products as needs evolve."],
    ["Shared financial context", "Reuse approved structures, roles, and source relationships across workflows."],
    ["Source-level traceability", "Connect measures, assumptions, exceptions, and drafts to supporting records."],
    ["Configurable professional review", "Place authorized review before consequential accounting, payroll, control, valuation, or planning decisions."],
    ["Platform and deployment flexibility", "Fit approved public cloud, private cloud, on-premises, or hybrid architecture."],
  ];
  return (
    <>
      <section className="section service-section">
        <SectionIntro eyebrow="Product and service model" title="Keep software, implementation, operations, and professional advice distinct."/>
        <div className="service-grid">{models.map(([title, copy, Icon]) => <article key={title}><Icon/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="section why-section">
        <SectionIntro eyebrow="Why Pangea" title="Connected where context matters. Modular where priorities differ."/>
        <div className="why-grid">{reasons.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
    </>
  );
}

function FinalCTA({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="final-cta">
      <div><p className="eyebrow">A practical starting point</p><h2>Start with the finance priority that matters now.</h2><p>Explore how the Pangea portfolio can connect financial reporting, transaction preparation, governance, strategic planning, and payroll operations within your existing business environment.</p><div className="hero-actions"><button className="button button--light" onClick={onDemo}>Request a Product Demonstration <ArrowRight/></button><a className="button button--ghost" href="#adoption">Discuss Your Finance Transformation Roadmap</a></div></div>
      <div className="cta-network"><div className="cta-core">PANGEA<small>FINANCIAL OPERATIONS</small></div>{products.map((product, index) => <span key={product.id} className={`cta-node node-${index + 1}`} style={{ "--product-accent": product.accent } as React.CSSProperties}>{product.shortName}</span>)}</div>
    </section>
  );
}

function Footer() {
  return <footer><a className="brand brand--footer" href="#top"><span className="brand-mark"><span/><span/><span/><span/><span/></span><span>PANGEA<small>FINANCIAL OPERATIONS</small></span></a><p>Connected financial intelligence, transaction readiness, governance, strategic planning, and workforce operations.</p><div><a href="#products">Products</a><a href="#governance">Governance</a><a href="#adoption">Adoption</a></div><small>Prototype • Fictional information • Professional review required where stated</small></footer>;
}

export default function App() {
  const [selected, setSelected] = useState<ProductId>("pulse");
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation onDemo={() => setDemoOpen(true)}/>
      <main id="main">
        <Hero selected={selected} setSelected={setSelected} onDemo={() => setDemoOpen(true)}/>
        <ChallengeExplorer onSelectProduct={setSelected}/>
        <ProductExplorer selected={selected} setSelected={setSelected}/>
        <RelationshipMap/>
        <RoleExperiences/>
        <AIAssistance/>
        <FinanceDashboard/>
        <GovernanceArchitecture/>
        <IntegrationsAdoption/>
        <ServiceModelWhy/>
        <FinalCTA onDemo={() => setDemoOpen(true)}/>
      </main>
      <Footer/>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)}/>
    </>
  );
}

export type ProductId = "pulse" | "direct" | "shield" | "scale" | "payroll";
export type Maturity =
  | "Available"
  | "Configurable"
  | "Available through integration"
  | "Planned"
  | "Concept";

export interface Capability {
  name: string;
  description: string;
  maturity: Maturity;
}

export interface CapabilityGroup {
  title: string;
  capabilities: Capability[];
}

export interface WorkflowStep {
  title: string;
  detail: string;
  owner: string;
}

export interface Persona {
  name: string;
  decisions: string;
  workflows: string[];
  measures: string[];
  approvals: string;
}

export interface Product {
  id: ProductId;
  shortName: string;
  publicName: string;
  expandedName: string;
  descriptor: string;
  purpose: string;
  positioning: string;
  accent: string;
  icon: "Activity" | "ScanSearch" | "ShieldCheck" | "ChartNoAxesCombined" | "Users";
  primaryUsers: string[];
  services: string[];
  challenges: string[];
  measures: string[];
  openActions: string[];
  workflow: WorkflowStep[];
  capabilities: CapabilityGroup[];
  personas: Persona[];
  integrations: string[];
  reviewControl: string;
  disclaimer: string;
  cta: string;
}

const cap = (
  name: string,
  maturity: Maturity = "Configurable",
  description = "Configured to customer data, roles, and review requirements.",
): Capability => ({ name, maturity, description });

export const products: Product[] = [
  {
    id: "pulse",
    shortName: "Pulse",
    publicName: "Pangea Pulse",
    expandedName: "Pangea Pulse",
    descriptor: "Financial Intelligence & CFO Dashboard",
    purpose: "Turn approved finance and operating information into a current, traceable management view.",
    positioning:
      "Pangea Pulse connects approved accounting and operational information to provide finance leaders with current reporting, cash visibility, KPI monitoring, and management insights.",
    accent: "#20c7e8",
    icon: "Activity",
    primaryUsers: ["CFO", "Controller", "Head of Finance"],
    services: ["Accounting operations", "Financial reporting", "Cash-flow management", "Management reporting", "CFO decision support"],
    challenges: ["Fragmented reporting", "Limited cash visibility", "Slow management reporting"],
    measures: ["Cash position", "13-week outlook", "Budget variance", "DSO"],
    openActions: ["Review three mapping exceptions", "Approve downside scenario", "Resolve two aging items"],
    workflow: [
      { title: "Connect", detail: "Map approved ledgers and operating sources.", owner: "Finance systems" },
      { title: "Reconcile", detail: "Review source status, mappings, and period balances.", owner: "Controller" },
      { title: "Analyze", detail: "Assess performance, cash, and working-capital movement.", owner: "FP&A" },
      { title: "Decide", detail: "Approve assumptions and publish management materials.", owner: "CFO" },
    ],
    capabilities: [
      {
        title: "Financial Data Connections",
        capabilities: [
          cap("General-ledger synchronization", "Available through integration"),
          cap("Trial-balance ingestion", "Available"),
          cap("Bank and cash information", "Available through integration"),
          cap("Accounts receivable", "Available through integration"),
          cap("Accounts payable", "Available through integration"),
          cap("Budget information", "Available"),
          cap("Configurable source mappings"),
          cap("Reconciliation status", "Available"),
        ],
      },
      {
        title: "Financial Reporting",
        capabilities: [
          cap("Balance sheet", "Available"),
          cap("Profit and loss statement", "Available"),
          cap("Cash-flow statement", "Available"),
          cap("Period comparison", "Available"),
          cap("Entity and department views"),
          cap("Management reporting"),
          cap("Reporting adjustments"),
          cap("Source-level drill-down", "Available"),
          cap("GAAP-oriented reporting support", "Configurable", "Supports reporting preparation; authorized personnel determine accounting conclusions."),
        ],
      },
      {
        title: "Cash, Working Capital & KPIs",
        capabilities: [
          cap("Rolling 13-week cash forecast", "Available"),
          cap("Expected receipts"),
          cap("Planned disbursements"),
          cap("Working-capital drivers"),
          cap("Cash scenarios", "Available"),
          cap("Forecast assumptions", "Available"),
          cap("Variance analysis", "Available"),
          cap("Liquidity alerts"),
          cap("Burn rate, runway, and EBITDA trends"),
          cap("Gross margin and revenue growth"),
          cap("CAC and lifetime value", "Configurable", "Shown only where supported by approved source data."),
          cap("DSO and DPO", "Available"),
        ],
      },
    ],
    personas: [
      { name: "CFO", decisions: "Liquidity, performance, and capital priorities", workflows: ["Cash outlook", "Management reporting"], measures: ["Runway", "EBITDA trend"], approvals: "Scenario and management-report approval" },
      { name: "Controller", decisions: "Close quality and reporting readiness", workflows: ["Reconciliation", "Adjustment review"], measures: ["Mapping exceptions", "Close status"], approvals: "Reporting adjustments" },
      { name: "FP&A Leader", decisions: "Variance response and outlook", workflows: ["Budget comparison", "Cash assumptions"], measures: ["Forecast variance", "Working capital"], approvals: "Planning assumptions" },
    ],
    integrations: ["General ledger and accounting", "Banking and treasury", "Accounts receivable", "Accounts payable", "Data warehouse and analytics"],
    reviewControl: "Reporting adjustments, assumptions, and published materials retain owner, reviewer, source, and approval history.",
    disclaimer: "Illustrative model — not financial advice or a customer forecast.",
    cta: "Explore Pulse",
  },
  {
    id: "direct",
    shortName: "Direct",
    publicName: "Pangea Direct",
    expandedName: "Pangea Direct",
    descriptor: "Due Diligence & Valuation Engine",
    purpose: "Organize transaction evidence, proposed adjustments, and valuation assumptions in a reviewable workspace.",
    positioning:
      "Pangea Direct helps transaction teams organize financial diligence, document adjustments, analyze revenue quality, prepare valuation scenarios, and coordinate approved deal materials.",
    accent: "#7c83ff",
    icon: "ScanSearch",
    primaryUsers: ["Transaction Advisor", "Corporate Development", "PE Operating Partner"],
    services: ["Quality of earnings", "Valuation support", "M&A preparation", "Buy-side diligence", "Sell-side diligence", "Transaction advisory"],
    challenges: ["Difficult transaction preparation", "Disconnected evidence", "Untracked valuation assumptions"],
    measures: ["Diligence readiness", "Open requests", "Proposed adjustments", "Revenue concentration"],
    openActions: ["Review two proposed adjustments", "Answer four diligence requests", "Approve valuation assumptions"],
    workflow: [
      { title: "Ingest", detail: "Index approved statements, schedules, and deal materials.", owner: "Deal team" },
      { title: "Analyze", detail: "Classify revenue and document proposed adjustments.", owner: "Analyst" },
      { title: "Review", detail: "Link evidence, record notes, and compare versions.", owner: "Advisor" },
      { title: "Prepare", detail: "Release approved materials to authorized participants.", owner: "Transaction lead" },
    ],
    capabilities: [
      {
        title: "EBITDA Adjustment Tracker",
        capabilities: [
          cap("Adjustment ledger", "Available"),
          cap("Adjustment category"),
          cap("Reported amount and proposed adjustment", "Available"),
          cap("Supporting evidence", "Available"),
          cap("Owner and review status", "Available"),
          cap("Approval history", "Available"),
          cap("Version tracking", "Available"),
          cap("Management position"),
          cap("Advisor-reviewed amount"),
        ],
      },
      {
        title: "Revenue Quality Analysis",
        capabilities: [
          cap("Customer concentration", "Available"),
          cap("Revenue by customer and product", "Available"),
          cap("Recurring and non-recurring classifications"),
          cap("Seasonality and contract duration"),
          cap("Churn indicators"),
          cap("Revenue trends", "Available"),
          cap("Source-data completeness", "Available"),
        ],
      },
      {
        title: "Valuation & Data-Room Support",
        capabilities: [
          cap("Comparable-company inputs"),
          cap("Transaction and DCF assumptions"),
          cap("Multiple scenarios", "Available"),
          cap("Sensitivity analysis", "Available"),
          cap("Assumption history", "Available"),
          cap("Reviewer notes and version comparison", "Available"),
          cap("Secure data-room connection", "Available through integration", "Connects to an approved secure data-room capability."),
          cap("Diligence index and request tracking", "Available"),
          cap("Participant access and questions"),
        ],
      },
    ],
    personas: [
      { name: "Transaction Advisor", decisions: "Adjustment support and diligence priorities", workflows: ["Adjustment review", "Evidence requests"], measures: ["Open items", "Evidence coverage"], approvals: "Advisor-reviewed amounts" },
      { name: "Corporate Development", decisions: "Readiness and scenario selection", workflows: ["Diligence tracker", "Valuation scenarios"], measures: ["Readiness", "Sensitivity"], approvals: "Released deal materials" },
      { name: "PE Operating Partner", decisions: "Value drivers and follow-up priorities", workflows: ["Revenue quality", "Issue review"], measures: ["Concentration", "Proposed adjustments"], approvals: "Management position" },
    ],
    integrations: ["General ledger and accounting", "CRM", "Document management", "Electronic signature", "Data warehouse and analytics"],
    reviewControl: "Adjustments use proposed, analyst-reviewed, management-position, or advisor-reviewed statuses; the workspace does not independently validate them.",
    disclaimer: "Illustrative transaction analysis. Valuation and accounting conclusions require qualified professional review.",
    cta: "Explore Direct",
  },
  {
    id: "shield",
    shortName: "Shield",
    publicName: "Pangea Shield",
    expandedName: "Pangea Shield",
    descriptor: "Risk, Governance & Audit Vault",
    purpose: "Coordinate control evidence, exceptions, obligations, and external requests through traceable workflows.",
    positioning:
      "Pangea Shield helps organizations coordinate internal controls, audit evidence, statutory deadlines, external requests, and governance activity through traceable workflows.",
    accent: "#1bb8a8",
    icon: "ShieldCheck",
    primaryUsers: ["Internal Audit", "Risk & Compliance", "Controller"],
    services: ["Risk and governance", "Internal controls", "Audit readiness", "Statutory compliance coordination", "Tax-advisory support", "Entity compliance"],
    challenges: ["Manual control monitoring", "Scattered audit evidence", "Deadline risk"],
    measures: ["Control coverage", "Open exceptions", "Audit requests", "Upcoming obligations"],
    openActions: ["Review one control exception", "Release three audit responses", "Assign two statutory obligations"],
    workflow: [
      { title: "Register", detail: "Define controls, obligations, owners, and schedules.", owner: "Risk lead" },
      { title: "Collect", detail: "Request evidence and record configured indicators.", owner: "Control owner" },
      { title: "Review", detail: "Assess exceptions, notes, and remediation plans.", owner: "Reviewer" },
      { title: "Release", detail: "Approve external responses and retain activity history.", owner: "Authorized approver" },
    ],
    capabilities: [
      {
        title: "Internal Controls & ICFR",
        capabilities: [
          cap("Control register", "Available"),
          cap("Control owner and test schedule", "Available"),
          cap("Evidence request", "Available"),
          cap("Test result and exception", "Available"),
          cap("Remediation action", "Available"),
          cap("Reviewer approval", "Available"),
          cap("Control history", "Available"),
        ],
      },
      {
        title: "Journal-Entry Review Support",
        capabilities: [
          cap("Configured indicators"),
          cap("Unusual-entry review queue", "Available"),
          cap("Supporting evidence and reviewer notes", "Available"),
          cap("Disposition and escalation", "Available"),
          cap("Resolution history", "Available"),
        ],
      },
      {
        title: "Statutory Calendar & Liaison Portal",
        capabilities: [
          cap("Filing obligations and jurisdiction"),
          cap("Due date and assigned owner", "Available"),
          cap("Preparation and review status", "Available"),
          cap("Supporting and submission evidence", "Available"),
          cap("Reminder rules"),
          cap("Auditor and regulatory requests", "Available"),
          cap("Document exchange and Q&A"),
          cap("Internal approval and external release", "Available"),
          cap("Request activity history", "Available"),
        ],
      },
    ],
    personas: [
      { name: "Internal Audit and Risk", decisions: "Testing scope and remediation priority", workflows: ["Control testing", "Issue tracking"], measures: ["Exceptions", "Remediation age"], approvals: "Test and remediation review" },
      { name: "Controller", decisions: "Evidence readiness and obligation ownership", workflows: ["Audit requests", "Statutory calendar"], measures: ["Open requests", "Due dates"], approvals: "External release" },
      { name: "External Auditor or Advisor", decisions: "Request follow-up", workflows: ["Authorized document exchange"], measures: ["Request status"], approvals: "No internal approval authority" },
    ],
    integrations: ["General ledger and accounting", "Document management", "Tax and statutory filing", "Identity and access", "Electronic signature"],
    reviewControl: "An unusual entry is an indicator for review and does not establish fraud, error, or control failure.",
    disclaimer: "Illustrative governance workflow — not a compliance certification.",
    cta: "Explore Shield",
  },
  {
    id: "scale",
    shortName: "Scale",
    publicName: "Pangea Scale",
    expandedName: "Pangea Scale",
    descriptor: "Strategic Planning & Performance Modeler",
    purpose: "Connect business assumptions with projected financial and operational effects.",
    positioning:
      "Pangea Scale helps management evaluate strategic choices by connecting business assumptions with projected financial and operational effects.",
    accent: "#f3b44b",
    icon: "ChartNoAxesCombined",
    primaryUsers: ["FP&A Leader", "CFO", "Executive Team"],
    services: ["Strategic planning", "Management advisory", "FP&A", "Growth planning", "Operational-efficiency analysis", "Capital allocation"],
    challenges: ["Static planning", "Disconnected assumptions", "Unclear initiative effects"],
    measures: ["Projected revenue", "Margin effect", "Cash effect", "Headcount plan"],
    openActions: ["Approve growth assumptions", "Review downside case", "Update initiative dependency"],
    workflow: [
      { title: "Frame", detail: "Define objectives, cases, owners, and decision points.", owner: "Executive sponsor" },
      { title: "Model", detail: "Configure commercial, workforce, and capital assumptions.", owner: "FP&A" },
      { title: "Compare", detail: "Assess revenue, margin, cash, and capacity effects.", owner: "Finance leadership" },
      { title: "Commit", detail: "Approve a scenario and link initiatives to measures.", owner: "Executive team" },
    ],
    capabilities: [
      {
        title: "Scenario & Growth Engine",
        capabilities: [
          cap("Headcount and pricing scenarios", "Available"),
          cap("Revenue and demand assumptions", "Available"),
          cap("Capital and operating expense", "Available"),
          cap("Financing assumptions"),
          cap("Margin and cash effects", "Available"),
          cap("Sensitivity analysis", "Available"),
        ],
      },
      {
        title: "Operational Efficiency Matrix",
        capabilities: [
          cap("Unit economics"),
          cap("Cost drivers and capacity utilization"),
          cap("Productivity measures"),
          cap("Service-line economics"),
          cap("Trend comparison", "Available"),
          cap("Approved benchmark sources", "Available through integration", "Requires a licensed, identified, and current source."),
          cap("Internal performance targets"),
        ],
      },
      {
        title: "Strategic Roadmap Builder",
        capabilities: [
          cap("Objectives and initiatives", "Available"),
          cap("Owner and milestone", "Available"),
          cap("Financial assumption and operational measure", "Available"),
          cap("Dependencies and status", "Available"),
          cap("Decision checkpoints", "Available"),
        ],
      },
    ],
    personas: [
      { name: "FP&A Leader", decisions: "Scenario design and resource effects", workflows: ["Assumption modeling", "Sensitivity review"], measures: ["Revenue", "Margin", "Cash"], approvals: "Model version release" },
      { name: "Executive Team", decisions: "Strategic priorities and capital allocation", workflows: ["Case comparison", "Roadmap review"], measures: ["Cash effect", "Milestones"], approvals: "Selected scenario" },
      { name: "CFO", decisions: "Financial boundaries and funding", workflows: ["Scenario governance", "Decision materials"], measures: ["Liquidity", "Margin"], approvals: "Finance assumptions" },
    ],
    integrations: ["General ledger and accounting", "ERP", "CRM", "Human resources", "Data warehouse and analytics"],
    reviewControl: "Assumption changes, scenario versions, reviewer notes, and selected cases retain a dated record.",
    disclaimer: "Illustrative scenario model — not a forecast, commitment, or investment recommendation.",
    cta: "Explore Scale",
  },
  {
    id: "payroll",
    shortName: "Payroll",
    publicName: "Pangea Payroll",
    expandedName: "Pangea Payroll — Pay & Workforce",
    descriptor: "Payroll & Workforce Compliance Hub",
    purpose: "Connect payroll preparation, workforce records, review, journals, and filing-support activities.",
    positioning:
      "Pangea Payroll connects payroll preparation, workforce records, employee self-service, journal mapping, review, and filing-support workflows across configured jurisdictions.",
    accent: "#a879f7",
    icon: "Users",
    primaryUsers: ["Payroll Administrator", "Controller", "HR Operations"],
    services: ["Payroll administration", "Workforce finance", "Tax-withholding support", "Payroll accounting", "Employee and contractor records", "Filing coordination"],
    challenges: ["Disconnected payroll and accounting", "Repeated reconciliation", "Jurisdiction exceptions"],
    measures: ["Payroll status", "Review exceptions", "Journal reconciliation", "Filing calendar"],
    openActions: ["Resolve two payroll exceptions", "Approve masked journal batch", "Review one jurisdiction change"],
    workflow: [
      { title: "Prepare", detail: "Collect approved pay, time, benefit, and workforce inputs.", owner: "Payroll administrator" },
      { title: "Review", detail: "Evaluate exceptions and configured jurisdiction rules.", owner: "Payroll reviewer" },
      { title: "Approve", detail: "Authorize the payroll cycle and payment status.", owner: "Authorized approver" },
      { title: "Reconcile", detail: "Map journals, review differences, and coordinate filings.", owner: "Controller" },
    ],
    capabilities: [
      {
        title: "Payroll Preparation",
        capabilities: [
          cap("Pay periods and workforce records", "Available"),
          cap("Earnings, deductions, and benefits", "Available"),
          cap("Adjustments and time inputs", "Available through integration"),
          cap("Payroll review and approval", "Available"),
          cap("Payment status", "Available through integration"),
        ],
      },
      {
        title: "Multi-Jurisdiction & Self-Service",
        capabilities: [
          cap("Federal, state, and supported local rules"),
          cap("Work and residence location"),
          cap("Withholding configuration and effective dates"),
          cap("Rule version and exception review", "Available"),
          cap("Pay statements and tax documents", "Available through integration"),
          cap("Masked direct-deposit details", "Available through integration"),
          cap("Personal information and elections"),
          cap("Compensation history and support requests"),
        ],
      },
      {
        title: "Payroll-to-General-Ledger",
        capabilities: [
          cap("Account, department, and cost-center mappings"),
          cap("Payroll journals and allocation rules", "Available"),
          cap("Reconciliation and exception handling", "Available"),
          cap("Posting approval and status", "Available through integration"),
          cap("Filing coordination", "Available through integration", "Supports preparation and review; it does not claim autonomous filing."),
        ],
      },
    ],
    personas: [
      { name: "Payroll Administrator", decisions: "Cycle readiness and exception handling", workflows: ["Payroll review", "Filing coordination"], measures: ["Exceptions", "Cycle status"], approvals: "Preparation sign-off" },
      { name: "Controller", decisions: "Journal and reconciliation disposition", workflows: ["GL mapping", "Reconciliation"], measures: ["Journal differences"], approvals: "Posting approval" },
      { name: "Employee", decisions: "Personal record updates", workflows: ["Self-service"], measures: ["Document status"], approvals: "Personal changes only" },
    ],
    integrations: ["Payroll", "Human resources", "General ledger and accounting", "Banking and treasury", "Tax and statutory filing"],
    reviewControl: "Configured jurisdiction rules, exceptions, payment status, journal posting, and filing activities require authorized review.",
    disclaimer: "Fictional payroll information. Payroll calculations and filings require configured jurisdiction rules and authorized review.",
    cta: "Explore Payroll",
  },
];

export const productById = Object.fromEntries(products.map((product) => [product.id, product])) as Record<ProductId, Product>;

// Replace fictional measures only after approved metric definitions and evidence are available.
// Add customer evidence and product screenshots only after usage rights and claims review.
// Update maturity labels when product leadership approves evidence of availability.
// Name specific integrations only after connection scope and readiness are documented.

export const integrationCategories = [
  "General ledger and accounting",
  "ERP",
  "Banking and treasury",
  "Accounts receivable",
  "Accounts payable",
  "Payroll",
  "Human resources",
  "CRM",
  "Billing",
  "Expense management",
  "Document management",
  "Electronic signature",
  "Tax and statutory filing",
  "Data warehouse and analytics",
  "Identity and access",
];

export const portfolioPersonas = [
  "CFO",
  "Controller",
  "FP&A Leader",
  "Transaction Advisor",
  "Internal Audit and Risk",
  "Payroll Administrator",
  "Executive Team",
  "Private Equity Operating Partner",
  "External Auditor or Advisor",
  "System Administrator",
];

export interface Challenge {
  title: string;
  detail: string;
  people: string;
  effect: string;
  product: ProductId;
  response: string;
  measures: string[];
}

export const challenges: Challenge[] = [
  { title: "Fragmented financial reporting", detail: "Financial data may be distributed across accounting platforms, spreadsheets, bank accounts, and operational systems.", people: "CFO, Controller, FP&A", effect: "Reporting cycles can slow while teams reconcile sources.", product: "pulse", response: "Map approved sources into traceable reporting and reconciliation views.", measures: ["Close status", "Mapping exceptions", "Source freshness"] },
  { title: "Limited cash visibility", detail: "Management may lack a current view of expected receipts, payments, obligations, and liquidity scenarios.", people: "CFO, Treasury, Executive Team", effect: "Liquidity decisions may rely on delayed or disconnected assumptions.", product: "pulse", response: "Connect expected receipts, disbursements, and assumptions in a rolling cash view.", measures: ["Cash position", "13-week outlook", "DSO"] },
  { title: "Difficult transaction preparation", detail: "Financial adjustments, diligence materials, revenue analysis, and valuation assumptions may be tracked through disconnected workbooks.", people: "Corporate Development, Advisors, Finance", effect: "Evidence and review history can be difficult to trace.", product: "direct", response: "Organize proposed adjustments, source links, requests, and valuation scenarios.", measures: ["Open requests", "Evidence coverage", "Adjustment status"] },
  { title: "Manual control monitoring", detail: "Internal-control evidence, audit requests, statutory deadlines, and exceptions may depend on email and periodic review.", people: "Internal Audit, Risk, Controller", effect: "Ownership, deadlines, and remediation can become difficult to monitor.", product: "shield", response: "Coordinate control, evidence, obligation, and remediation workflows.", measures: ["Open exceptions", "Evidence status", "Due obligations"] },
  { title: "Static planning", detail: "Budgets and forecasts may not show the effect of changing price, staffing, demand, or capital assumptions.", people: "FP&A, CFO, Executive Team", effect: "Teams may struggle to compare decisions using shared assumptions.", product: "scale", response: "Compare fictional operating and financial effects across governed scenarios.", measures: ["Revenue effect", "Margin effect", "Cash effect"] },
  { title: "Disconnected payroll and accounting", detail: "Payroll calculations, workforce changes, journal entries, filings, and employee records may require repeated reconciliation.", people: "Payroll, HR Operations, Controller", effect: "Exceptions can move between teams without a shared status record.", product: "payroll", response: "Connect preparation, review, masked workforce records, journal mapping, and filing support.", measures: ["Cycle status", "Exceptions", "Reconciliation items"] },
];

export interface ProductConnection {
  from: ProductId;
  to: ProductId | "portfolio";
  title: string;
  information: string;
  owner: string;
  approval: string;
  source: string;
  frequency: string;
  audit: string;
}

export const productConnections: ProductConnection[] = [
  { from: "payroll", to: "pulse", title: "Payroll → Pulse", information: "Approved payroll expenses and journal information", owner: "Payroll administrator / Controller", approval: "Payroll and posting approval", source: "Approved payroll and general ledger systems", frequency: "Per approved pay cycle", audit: "Mapping, batch, reviewer, and posting record" },
  { from: "pulse", to: "scale", title: "Pulse → Scale", information: "Historical performance and cash information", owner: "FP&A Leader", approval: "Finance dataset approval", source: "Approved reporting view", frequency: "Per planning cycle", audit: "Source period and import version" },
  { from: "scale", to: "pulse", title: "Scale → Pulse", information: "Approved planning scenarios and budget inputs", owner: "FP&A Leader", approval: "CFO scenario approval", source: "Approved scenario version", frequency: "On approved release", audit: "Assumption and version history" },
  { from: "pulse", to: "direct", title: "Pulse → Direct", information: "Financial statements, trends, and supporting schedules", owner: "Transaction lead", approval: "Deal workspace release", source: "Approved financial reporting", frequency: "On request or approved refresh", audit: "Source links and release record" },
  { from: "direct", to: "shield", title: "Direct → Shield", information: "Diligence findings and identified control matters", owner: "Transaction and risk leads", approval: "Finding disposition approval", source: "Reviewed diligence record", frequency: "On approved finding", audit: "Finding, owner, and follow-up history" },
  { from: "shield", to: "portfolio", title: "Shield → Portfolio", information: "Controls, approvals, evidence, and compliance calendars", owner: "Risk and control owners", approval: "Configured workflow approval", source: "Governance workspace", frequency: "Event-driven or scheduled", audit: "Control, approval, and activity history" },
];

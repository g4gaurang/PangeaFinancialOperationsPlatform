import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, ChevronRight, CircleAlert, FileCheck2, LockKeyhole, SlidersHorizontal } from "lucide-react";
import type { Product } from "../data/products";

const weeks = ["W1", "W3", "W5", "W7", "W9", "W11", "W13"];

function PulseDemo({ accent }: { accent: string }) {
  const [collectionDays, setCollectionDays] = useState(38);
  const [plannedSpend, setPlannedSpend] = useState(120);
  const data = useMemo(
    () =>
      weeks.map((week, index) => ({
        week,
        base: 820 + index * 46 - Math.sin(index) * 90,
        scenario: 820 + index * (54 - (collectionDays - 30) * 1.4) - plannedSpend * (index > 2 ? 0.42 : 0.12),
      })),
    [collectionDays, plannedSpend],
  );
  return (
    <div className="demo-grid">
      <div className="chart-panel">
        <div className="panel-heading"><div><span className="eyebrow">13-week cash view</span><h4>Liquidity scenarios</h4></div><span className="status-dot">Fictional</span></div>
        <div className="chart-wrap" aria-label="Cash outlook chart. Scenario values update when assumptions change.">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs><linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity={0.35}/><stop offset="100%" stopColor={accent} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="#243545" vertical={false} />
              <XAxis dataKey="week" stroke="#8fa5b8" tickLine={false} axisLine={false} />
              <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
              <Tooltip contentStyle={{ background: "#102331", border: "1px solid #304759" }} formatter={(value) => [`$${Math.round(Number(value))}k`]} />
              <Area type="monotone" dataKey="base" stroke="#7d91a4" fill="transparent" strokeDasharray="5 4" />
              <Area type="monotone" dataKey="scenario" stroke={accent} fill="url(#pulseFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="control-panel">
        <span className="eyebrow"><SlidersHorizontal size={14} /> Scenario controls</span>
        <label>Collection timing <strong>{collectionDays} days</strong><input type="range" min="25" max="60" value={collectionDays} onChange={(event) => setCollectionDays(Number(event.target.value))} /></label>
        <label>Planned expenditure <strong>${plannedSpend}k</strong><input type="range" min="60" max="240" step="10" value={plannedSpend} onChange={(event) => setPlannedSpend(Number(event.target.value))} /></label>
        <div className="result-card"><span>Week 13 scenario</span><strong>${Math.round(data.at(-1)?.scenario ?? 0)}k</strong><small>Change is illustrative and not a customer forecast.</small></div>
      </div>
    </div>
  );
}

function DirectDemo() {
  const [selected, setSelected] = useState(0);
  const adjustments = [
    { label: "Reported EBITDA", value: 1840, state: "Source-linked" },
    { label: "Owner normalization", value: 145, state: "Analyst-reviewed" },
    { label: "One-time project", value: 82, state: "Proposed" },
    { label: "Run-rate hiring", value: -96, state: "Management position" },
  ];
  return (
    <div className="demo-grid">
      <div className="chart-panel">
        <div className="panel-heading"><div><span className="eyebrow">Adjustment workspace</span><h4>Fictional EBITDA bridge</h4></div><span className="status-dot">4 items</span></div>
        <div className="bridge" aria-label="EBITDA adjustment list">
          {adjustments.map((item, index) => (
            <button type="button" className={selected === index ? "bridge-row active" : "bridge-row"} onClick={() => setSelected(index)} key={item.label}>
              <span className="bridge-index">0{index + 1}</span><span><strong>{item.label}</strong><small>{item.state}</small></span><b>{item.value < 0 ? "−" : index ? "+" : ""}${Math.abs(item.value)}k</b>
            </button>
          ))}
        </div>
      </div>
      <div className="control-panel">
        <span className="eyebrow"><FileCheck2 size={14} /> Review record</span>
        <h4>{adjustments[selected].label}</h4>
        <p>Linked to fictional schedule FY26-A12. The source, reviewer notes, and version history remain visible.</p>
        <div className="timeline-mini"><span className="done">Submitted</span><span className={selected < 2 ? "done" : ""}>Reviewed</span><span>Approved</span></div>
        <button type="button" className="text-button">Open source record <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function ShieldDemo() {
  const [view, setView] = useState<"controls" | "requests">("controls");
  const rows = view === "controls"
    ? [["Revenue recognition review", "Evidence received", "Quarterly"], ["Vendor changes", "Exception open", "Monthly"], ["Access certification", "Review due", "Quarterly"]]
    : [["External request 024", "Response drafted", "2 days"], ["Evidence request 019", "Internal review", "4 days"], ["Tax schedule 008", "Assigned", "7 days"]];
  return (
    <div className="demo-grid">
      <div className="chart-panel">
        <div className="panel-heading"><div><span className="eyebrow">Governance workspace</span><h4>{view === "controls" ? "Control matrix" : "Audit request queue"}</h4></div><div className="segmented"><button className={view === "controls" ? "active" : ""} onClick={() => setView("controls")}>Controls</button><button className={view === "requests" ? "active" : ""} onClick={() => setView("requests")}>Requests</button></div></div>
        <div className="data-list">
          {rows.map(([name, status, cadence]) => <div className="data-row" key={name}><span><strong>{name}</strong><small>{cadence}</small></span><span className="review-status"><CircleAlert size={14} />{status}</span></div>)}
        </div>
      </div>
      <div className="control-panel">
        <span className="eyebrow"><LockKeyhole size={14} /> Review guardrail</span>
        <h4>Configured indicator</h4>
        <p>An unusual entry is an indicator for review and does not establish fraud, error, or control failure.</p>
        <div className="result-card"><span>Next obligation</span><strong>Sep 28</strong><small>Fictional calendar entry • owner assigned</small></div>
      </div>
    </div>
  );
}

function ScaleDemo({ accent }: { accent: string }) {
  const [growth, setGrowth] = useState(12);
  const [hires, setHires] = useState(8);
  const data = ["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => ({
    quarter,
    base: 2.1 + index * 0.18,
    growth: 2.1 + index * 0.18 + index * growth * 0.025 - hires * 0.006,
    downside: 2.05 + index * 0.07,
  }));
  return (
    <div className="demo-grid">
      <div className="chart-panel">
        <div className="panel-heading"><div><span className="eyebrow">Scenario comparison</span><h4>Projected revenue effect</h4></div><span className="status-dot">3 cases</span></div>
        <div className="chart-wrap" aria-label="Fictional scenario comparison chart">
          <ResponsiveContainer width="100%" height={220}><LineChart data={data}><CartesianGrid stroke="#243545" vertical={false}/><XAxis dataKey="quarter" stroke="#8fa5b8" tickLine={false} axisLine={false}/><YAxis hide/><Tooltip contentStyle={{ background: "#102331", border: "1px solid #304759" }} formatter={(value) => [`$${Number(value).toFixed(1)}m`]}/><Line dataKey="base" stroke="#7d91a4" strokeDasharray="4 4"/><Line dataKey="downside" stroke="#bd6f7d"/><Line dataKey="growth" stroke={accent} strokeWidth={3}/></LineChart></ResponsiveContainer>
        </div>
      </div>
      <div className="control-panel">
        <span className="eyebrow"><SlidersHorizontal size={14} /> Growth case</span>
        <label>Revenue growth <strong>{growth}%</strong><input type="range" min="2" max="25" value={growth} onChange={(event) => setGrowth(Number(event.target.value))}/></label>
        <label>Planned hires <strong>{hires}</strong><input type="range" min="0" max="24" value={hires} onChange={(event) => setHires(Number(event.target.value))}/></label>
        <div className="result-card"><span>Q4 growth case</span><strong>${data[3].growth.toFixed(1)}m</strong><small>Fictional scenario, not a commitment.</small></div>
      </div>
    </div>
  );
}

function PayrollDemo() {
  const [step, setStep] = useState(2);
  const steps = ["Inputs", "Exceptions", "Approval", "Journal", "Reconcile"];
  return (
    <div className="demo-grid">
      <div className="chart-panel">
        <div className="panel-heading"><div><span className="eyebrow">Payroll cycle</span><h4>Sep 15–30 • Fictional</h4></div><span className="status-dot">Masked data</span></div>
        <div className="payroll-steps">
          {steps.map((item, index) => <button key={item} onClick={() => setStep(index)} className={step === index ? "active" : index < step ? "done" : ""}><span>{index < step ? <Check size={14}/> : index + 1}</span>{item}</button>)}
        </div>
        <div className="payroll-summary">
          <div><span>Records</span><strong>128</strong></div><div><span>Review items</span><strong>2</strong></div><div><span>Net pay</span><strong>$•••,420</strong></div>
        </div>
      </div>
      <div className="control-panel">
        <span className="eyebrow"><FileCheck2 size={14} /> {steps[step]} review</span>
        <h4>{step === 2 ? "Authorized approval required" : `${steps[step]} workspace`}</h4>
        <p>Account details are masked. Configured rules and exceptions remain subject to authorized review.</p>
        <div className="data-row"><span><strong>Journal batch</strong><small>GL-PY-0926</small></span><span className="review-status">Pending</span></div>
      </div>
    </div>
  );
}

export function ProductDemo({ product }: { product: Product }) {
  return (
    <div className="product-demo" style={{ "--product-accent": product.accent } as React.CSSProperties}>
      {product.id === "pulse" && <PulseDemo accent={product.accent} />}
      {product.id === "direct" && <DirectDemo />}
      {product.id === "shield" && <ShieldDemo />}
      {product.id === "scale" && <ScaleDemo accent={product.accent} />}
      {product.id === "payroll" && <PayrollDemo />}
      <p className="demo-disclaimer">{product.disclaimer}</p>
    </div>
  );
}

export function MiniBars({ accent }: { accent: string }) {
  const data = [{ x: "Jan", a: 42 }, { x: "Feb", a: 57 }, { x: "Mar", a: 49 }, { x: "Apr", a: 68 }, { x: "May", a: 75 }];
  return <ResponsiveContainer width="100%" height={120}><BarChart data={data}><Bar dataKey="a" radius={[4, 4, 0, 0]}>{data.map((_, index) => <Cell key={index} fill={accent} opacity={0.42 + index * 0.12}/>)}</Bar><XAxis dataKey="x" hide/><YAxis hide/></BarChart></ResponsiveContainer>;
}

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { products } from "../data/products";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const fields = [
  ["name", "Name", "text", "Your name"],
  ["organization", "Organization", "text", "Organization name"],
  ["email", "Work email", "email", "name@organization.com"],
  ["role", "Role", "text", "Your role"],
  ["companySize", "Company size", "text", "Example: 250–500"],
  ["industry", "Industry", "text", "Your industry"],
  ["systems", "Current finance systems", "text", "Accounting, ERP, payroll…"],
  ["timeframe", "Desired timeframe", "text", "Example: This quarter"],
] as const;

export function DemoModal({ open, onClose }: DemoModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, input, select, textarea"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previous?.focus(); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="demo-title" ref={panelRef}>
        <button className="modal-close" type="button" aria-label="Close demonstration request" onClick={onClose} ref={closeRef}><X /></button>
        {submitted ? (
          <div className="confirmation" role="status">
            <span><Check size={28}/></span>
            <p className="eyebrow">Prototype confirmation</p>
            <h2 id="demo-title">Your request is ready for review.</h2>
            <p>This prototype did not transmit, store, or send the information you entered. In a production experience, the next step would be disclosed before submission.</p>
            <button className="button button--primary" onClick={onClose}>Return to the portfolio</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Request a demonstration</p>
            <h2 id="demo-title">Tell us about your finance priority.</h2>
            <p className="modal-intro">Fields stay in this browser session and are discarded when the page closes.</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              if (!form.get("name") || !form.get("email") || !form.get("challenge")) {
                setError("Add your name, work email, and primary finance challenge.");
                return;
              }
              setError("");
              setSubmitted(true);
            }}>
              <div className="form-grid">
                {fields.map(([name, label, type, placeholder]) => (
                  <label key={name}>{label}{name === "name" || name === "email" ? " *" : ""}<input name={name} type={type} placeholder={placeholder} aria-required={name === "name" || name === "email"} /></label>
                ))}
                <label>Product of interest<select name="product" defaultValue=""><option value="">Select a product</option>{products.map((product) => <option key={product.id}>{product.expandedName}</option>)}</select></label>
                <label>Primary finance challenge *<input name="challenge" placeholder="What would you like to improve?" aria-required="true"/></label>
                <label className="form-wide">Optional message<textarea name="message" rows={3} placeholder="Share useful context for a tailored discussion."/></label>
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="form-actions"><p>No information is transmitted or stored.</p><button className="button button--primary" type="submit">Review request</button></div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

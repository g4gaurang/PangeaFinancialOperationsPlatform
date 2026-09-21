import type { Maturity } from "../data/products";

export function MaturityBadge({ value }: { value: Maturity }) {
  return <span className={`maturity maturity--${value.toLowerCase().replaceAll(" ", "-")}`}>{value}</span>;
}

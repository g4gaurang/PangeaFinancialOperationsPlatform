import * as Icons from "lucide-react";
import { products, type ProductId } from "../data/products";

interface ProductSwitcherProps {
  active: ProductId;
  onChange: (id: ProductId) => void;
  compact?: boolean;
}

export function ProductSwitcher({ active, onChange, compact = false }: ProductSwitcherProps) {
  return (
    <div className={`product-switcher ${compact ? "product-switcher--compact" : ""}`} role="tablist" aria-label="Pangea products">
      {products.map((product) => {
        const Icon = Icons[product.icon];
        const selected = active === product.id;
        return (
          <button
            key={product.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className="product-switcher__item"
            style={{ "--product-accent": product.accent } as React.CSSProperties}
            onClick={() => onChange(product.id)}
          >
            <Icon aria-hidden="true" size={18} />
            <span>{product.shortName}</span>
          </button>
        );
      })}
    </div>
  );
}

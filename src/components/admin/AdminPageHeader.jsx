import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AdminPageHeader({ title, subtitle, breadcrumbs = [], actions = null }) {
  return (
    <div className="mb-8 flex flex-wrap items-end gap-6 justify-between">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="text-xs text-ink-tri font-mono uppercase tracking-wider flex items-center gap-2 mb-3">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="hover:text-ink transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="text-ink-sec mt-2">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

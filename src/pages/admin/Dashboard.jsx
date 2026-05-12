import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, LayoutGrid } from 'lucide-react';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import Button from '../../components/ui/Button.jsx';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    unwrap(api.get('/admin/dashboard'))
      .then(setData)
      .catch(() => setData({ counts: {}, recentContacts: [], recentSubscribers: [] }));
  }, []);

  if (!data) {
    return <div className="p-10 text-ink-sec">Loading…</div>;
  }

  const cards = [
    { label: 'New contacts (7d)', value: data.counts.newContacts7d ?? 0 },
    { label: 'Active subscribers', value: data.counts.activeSubscribers ?? 0 },
    { label: 'Published services', value: data.counts.publishedServices ?? 0 },
    { label: 'Published posts', value: data.counts.publishedPosts ?? 0 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10 max-w-6xl">
        <AdminPageHeader
          title="Dashboard"
          subtitle="The state of the factory floor."
          actions={
            <>
              <Button to="/admin/services/new" variant="secondary" arrow={false} icon={<LayoutGrid className="h-4 w-4" />}>
                New Service
              </Button>
              <Button to="/admin/posts/new" arrow={false} icon={<Plus className="h-4 w-4" />}>
                New Post
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cards.map((c) => (
            <div key={c.label} className="rounded-card border border-subtle bg-elevated p-6">
              <div className="text-3xl md:text-4xl font-mono font-medium text-ink">{c.value}</div>
              <div className="text-xs text-ink-tri uppercase tracking-wider mt-2">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-card border border-subtle bg-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink">Recent contacts</h2>
              <Link to="/admin/contacts" className="text-xs text-tangerine hover:underline font-mono uppercase tracking-wider">
                View all →
              </Link>
            </div>
            {data.recentContacts.length === 0 ? (
              <p className="text-sm text-ink-tri">No contacts yet.</p>
            ) : (
              <ul className="divide-y divide-subtle">
                {data.recentContacts.map((c) => (
                  <li key={c._id}>
                    <Link
                      to={`/admin/contacts/${c._id}`}
                      className="flex items-center justify-between gap-3 py-3 hover:bg-base/50 -mx-3 px-3 rounded-lg transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-ink truncate">{c.brandName}</div>
                        <div className="text-xs text-ink-tri truncate">{c.email}</div>
                      </div>
                      <div className="shrink-0 flex items-center gap-3">
                        <StatusBadge status={c.status} />
                        <span className="text-xs text-ink-tri hidden sm:inline">{formatDate(c.createdAt)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-card border border-subtle bg-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink">Recent subscribers</h2>
              <Link to="/admin/subscribers" className="text-xs text-tangerine hover:underline font-mono uppercase tracking-wider">
                View all →
              </Link>
            </div>
            {data.recentSubscribers.length === 0 ? (
              <p className="text-sm text-ink-tri">No subscribers yet.</p>
            ) : (
              <ul className="divide-y divide-subtle">
                {data.recentSubscribers.map((s) => (
                  <li key={s._id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="text-sm text-ink truncate">{s.email}</div>
                      <div className="text-xs text-ink-tri">{s.source}</div>
                    </div>
                    <span className="text-xs text-ink-tri">{formatDate(s.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

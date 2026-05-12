import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { getToken } from '../../lib/auth.js';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Subscribers() {
  const [subs, setSubs] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 1, newThisMonth: 0, churnThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('all');
  const [page, setPage] = useState(1);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (active !== 'all') params.set('isActive', active);
    params.set('page', String(page));
    try {
      const r = await api.get(`/admin/subscribers?${params}`);
      setSubs(r.data.data);
      setMeta(r.data.meta);
    } catch {
      toast.error('Failed to load subscribers.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(load, search ? 250 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, active, page]);

  async function onDelete(s) {
    if (!confirm(`Delete subscriber ${s.email}?`)) return;
    try {
      await api.delete(`/admin/subscribers/${s._id}`);
      toast.success('Deleted.');
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed.');
    }
  }

  function exportCsv() {
    const token = getToken();
    const url = `${import.meta.env.VITE_API_URL}/admin/subscribers/export.csv`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `loompa-subscribers-${Date.now()}.csv`;
        a.click();
      })
      .catch(() => toast.error('Export failed.'));
  }

  return (
    <>
      <Helmet>
        <title>Subscribers | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10">
        <AdminPageHeader
          title="Subscribers"
          subtitle="The Loompaa Letter list."
          breadcrumbs={[{ to: '/admin', label: 'Dashboard' }, { label: 'Subscribers' }]}
          actions={
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-pill border border-strong text-ink px-4 py-2 text-sm hover:bg-elevated"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Stat label="Total" value={meta.total} />
          <Stat label="New this month" value={meta.newThisMonth} accent="success" />
          <Stat label="Churned this month" value={meta.churnThisMonth} accent="error" />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex gap-1 rounded-pill border border-subtle bg-elevated p-1">
            {[
              { v: 'all', label: 'All' },
              { v: 'true', label: 'Active' },
              { v: 'false', label: 'Inactive' },
            ].map((opt) => (
              <button
                key={opt.v}
                onClick={() => { setActive(opt.v); setPage(1); }}
                className={`px-4 py-1.5 rounded-pill text-sm transition-colors ${
                  active === opt.v ? 'bg-tangerine text-ink-on-cream' : 'text-ink-sec hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by email…"
            className="flex-1 min-w-[200px] rounded-pill bg-elevated border border-subtle text-ink placeholder:text-ink-tri px-4 py-2 text-sm focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20"
          />
        </div>

        <div className="rounded-card border border-subtle bg-elevated overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-base text-xs uppercase tracking-wider text-ink-tri font-mono">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 hidden md:table-cell">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 hidden md:table-cell">Subscribed</th>
                <th className="px-4 py-3 w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="p-10 text-center text-ink-tri">Loading…</td></tr>}
              {!loading && subs.length === 0 && (
                <tr><td colSpan={5} className="p-10 text-center text-ink-tri">No subscribers.</td></tr>
              )}
              {subs.map((s) => (
                <tr key={s._id} className="border-t border-subtle hover:bg-base/40">
                  <td className="px-4 py-3 text-ink">{s.email}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec font-mono">{s.source}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.isActive ? 'active' : 'inactive'} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec">{formatDate(s.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onDelete(s)}
                      className="p-2 rounded-lg text-ink-tri hover:text-error hover:bg-base"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {meta.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: meta.pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-full text-sm font-mono transition-colors ${
                  n === page
                    ? 'bg-tangerine text-ink-on-cream'
                    : 'bg-elevated text-ink-sec border border-subtle hover:border-tangerine'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ label, value, accent }) {
  const accentColor =
    accent === 'success' ? 'text-success' : accent === 'error' ? 'text-error' : 'text-ink';
  return (
    <div className="rounded-card border border-subtle bg-elevated p-5">
      <div className={`text-2xl md:text-3xl font-mono font-medium ${accentColor}`}>{value}</div>
      <div className="text-xs text-ink-tri uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

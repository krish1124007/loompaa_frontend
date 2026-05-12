import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { getToken } from '../../lib/auth.js';

const STATUSES = ['', 'new', 'in-review', 'replied', 'qualified', 'archived'];

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    params.set('page', String(page));
    try {
      const r = await api.get(`/admin/contacts?${params}`);
      setContacts(r.data.data);
      setMeta(r.data.meta);
    } catch {
      toast.error('Failed to load contacts.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(load, search ? 250 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, search, page]);

  async function onDelete(c) {
    if (!confirm(`Delete contact from ${c.brandName}?`)) return;
    try {
      await api.delete(`/admin/contacts/${c._id}`);
      toast.success('Deleted.');
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed.');
    }
  }

  function exportCsv() {
    const token = getToken();
    const url = `${import.meta.env.VITE_API_URL}/admin/contacts/export.csv`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `loompa-contacts-${Date.now()}.csv`;
        a.click();
      })
      .catch(() => toast.error('Export failed.'));
  }

  return (
    <>
      <Helmet>
        <title>Contacts | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10">
        <AdminPageHeader
          title="Contacts"
          subtitle={`${meta.total} total`}
          breadcrumbs={[{ to: '/admin', label: 'Dashboard' }, { label: 'Contacts' }]}
          actions={
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-pill border border-strong text-ink px-4 py-2 text-sm hover:bg-elevated"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          }
        />

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex gap-1 rounded-pill border border-subtle bg-elevated p-1 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s || 'all'}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-pill text-xs uppercase tracking-wider font-mono transition-colors ${
                  status === s ? 'bg-tangerine text-ink-on-cream' : 'text-ink-sec hover:text-ink'
                }`}
              >
                {s || 'all'}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name, email, brand…"
            className="flex-1 min-w-[200px] rounded-pill bg-elevated border border-subtle text-ink placeholder:text-ink-tri px-4 py-2 text-sm focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20"
          />
        </div>

        <div className="rounded-card border border-subtle bg-elevated overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-base text-xs uppercase tracking-wider text-ink-tri font-mono">
              <tr>
                <th className="px-4 py-3">Brand / Name</th>
                <th className="px-4 py-3 hidden md:table-cell">Revenue</th>
                <th className="px-4 py-3 hidden lg:table-cell">Services</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3 w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="p-10 text-center text-ink-tri">Loading…</td></tr>}
              {!loading && contacts.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-ink-tri">No contacts.</td></tr>
              )}
              {contacts.map((c) => (
                <tr key={c._id} className="border-t border-subtle hover:bg-base/40">
                  <td className="px-4 py-3">
                    <Link to={`/admin/contacts/${c._id}`} className="block hover:text-tangerine transition-colors">
                      <div className="text-ink font-medium">{c.brandName}</div>
                      <div className="text-xs text-ink-tri">{c.name} · {c.email}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec">{c.monthlyRevenue}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-ink-tri max-w-xs truncate">{(c.services || []).join(', ')}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onDelete(c)}
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

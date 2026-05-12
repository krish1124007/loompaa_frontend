import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, ExternalLink, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import Button from '../../components/ui/Button.jsx';
import { useSiteStore } from '../../stores/siteStore.js';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const refreshSite = useSiteStore((s) => s.refresh);

  async function load() {
    setLoading(true);
    try {
      const items = await unwrap(api.get('/admin/services'));
      setServices(items);
    } catch {
      toast.error('Failed to load services.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function move(idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= services.length) return;
    const next = [...services];
    const [item] = next.splice(idx, 1);
    next.splice(target, 0, item);
    const items = next.map((s, i) => ({ id: s._id, order: i + 1 }));
    setServices(next.map((s, i) => ({ ...s, order: i + 1 })));
    try {
      await api.post('/admin/services/reorder', { items });
      refreshSite();
    } catch {
      toast.error('Reorder failed.');
      load();
    }
  }

  async function onDelete(svc) {
    if (!confirm(`Delete "${svc.title}" permanently? This can't be undone.`)) return;
    try {
      await api.delete(`/admin/services/${svc._id}?hard=true`);
      toast.success('Service deleted.');
      load();
      refreshSite();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed.');
    }
  }

  async function togglePublished(svc) {
    try {
      await api.put(`/admin/services/${svc._id}`, { isPublished: !svc.isPublished });
      toast.success(svc.isPublished ? 'Service unpublished.' : 'Service published.');
      load();
      refreshSite();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Update failed.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Services | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10">
        <AdminPageHeader
          title="Services"
          subtitle="The 8 stations of the factory."
          breadcrumbs={[{ to: '/admin', label: 'Dashboard' }, { label: 'Services' }]}
          actions={
            <Button to="/admin/services/new" arrow={false} icon={<Plus className="h-4 w-4" />}>
              New Service
            </Button>
          }
        />

        <div className="rounded-card border border-subtle bg-elevated overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-base text-xs uppercase tracking-wider text-ink-tri font-mono">
              <tr>
                <th className="px-4 py-3 w-16">Order</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-44 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-ink-tri">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && services.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-ink-tri">
                    No services yet.
                  </td>
                </tr>
              )}
              {services.map((s, i) => (
                <tr key={s._id} className="border-t border-subtle hover:bg-base/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        title="Move up"
                        className="p-1 rounded text-ink-tri hover:text-tangerine disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <span className="font-mono text-sm text-ink-tri">{s.order}</span>
                      <button
                        onClick={() => move(i, +1)}
                        disabled={i === services.length - 1}
                        title="Move down"
                        className="p-1 rounded text-ink-tri hover:text-tangerine disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-ink font-medium">{s.title}</div>
                    <div className="text-xs text-ink-tri md:hidden">/{s.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec font-mono">
                    /{s.slug}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublished(s)} className="cursor-pointer">
                      <StatusBadge status={s.isPublished ? 'published' : 'unpublished'} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/services/${s.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Preview"
                        className="p-2 rounded-lg text-ink-tri hover:text-ink hover:bg-base"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/services/${s._id}`}
                        title="Edit"
                        className="p-2 rounded-lg text-ink-tri hover:text-ink hover:bg-base"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(s)}
                        title="Delete"
                        className="p-2 rounded-lg text-ink-tri hover:text-error hover:bg-base"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-ink-tri font-mono uppercase tracking-wider flex items-center gap-2">
          <ArrowUpDown className="h-3 w-3" /> Use ▲▼ to reorder. Click status to toggle.
        </p>
      </div>
    </>
  );
}

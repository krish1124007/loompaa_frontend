import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import Button from '../../components/ui/Button.jsx';

const TABS = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
];

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter) params.set('status', filter);
    if (search) params.set('search', search);
    try {
      const items = await unwrap(api.get(`/admin/posts?${params}`));
      setPosts(items);
    } catch {
      toast.error('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(load, search ? 250 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]);

  async function onDelete(post) {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/admin/posts/${post._id}`);
      toast.success('Post deleted.');
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Blog | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10">
        <AdminPageHeader
          title="Blog posts"
          subtitle="The Loompaa Letter."
          breadcrumbs={[{ to: '/admin', label: 'Dashboard' }, { label: 'Blog' }]}
          actions={
            <Button to="/admin/posts/new" arrow={false} icon={<Plus className="h-4 w-4" />}>
              New Post
            </Button>
          }
        />

        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex gap-1 rounded-pill border border-subtle bg-elevated p-1">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setFilter(t.value)}
                className={`px-4 py-1.5 rounded-pill text-sm transition-colors ${
                  filter === t.value
                    ? 'bg-tangerine text-ink-on-cream'
                    : 'text-ink-sec hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author…"
            className="flex-1 min-w-[200px] rounded-pill bg-elevated border border-subtle text-ink placeholder:text-ink-tri px-4 py-2 text-sm focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20"
          />
        </div>

        <div className="rounded-card border border-subtle bg-elevated overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-base text-xs uppercase tracking-wider text-ink-tri font-mono">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Category</th>
                <th className="px-4 py-3 hidden md:table-cell">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 hidden lg:table-cell">Published</th>
                <th className="px-4 py-3 hidden xl:table-cell">Views</th>
                <th className="px-4 py-3 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7} className="p-10 text-center text-ink-tri">Loading…</td></tr>
              )}
              {!loading && posts.length === 0 && (
                <tr><td colSpan={7} className="p-10 text-center text-ink-tri">No posts.</td></tr>
              )}
              {posts.map((p) => (
                <tr key={p._id} className="border-t border-subtle hover:bg-base/40">
                  <td className="px-4 py-3">
                    <div className="text-ink font-medium line-clamp-1">{p.title}</div>
                    <div className="text-xs text-ink-tri font-mono">/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec">{p.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-ink-sec">{p.author?.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.isPublished ? 'published' : 'draft'} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm text-ink-sec">{formatDate(p.publishedAt)}</td>
                  <td className="px-4 py-3 hidden xl:table-cell text-sm text-ink-sec font-mono">{p.views || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {p.isPublished && (
                        <Link
                          to={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View"
                          className="p-2 rounded-lg text-ink-tri hover:text-ink hover:bg-base"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        to={`/admin/posts/${p._id}`}
                        title="Edit"
                        className="p-2 rounded-lg text-ink-tri hover:text-ink hover:bg-base"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(p)}
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
      </div>
    </>
  );
}

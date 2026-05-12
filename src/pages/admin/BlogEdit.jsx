import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ExternalLink } from 'lucide-react';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import { Input, Textarea, Select } from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useSiteStore } from '../../stores/siteStore.js';

const EMPTY = {
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  cover: { url: '', alt: '' },
  category: 'insight',
  author: { name: 'The Loompaa Letter', avatarUrl: '', bio: '' },
  tags: '',
  isPublished: false,
  publishedAt: '',
  meta: { title: '', description: '' },
};

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;
  const categories = useSiteStore((s) => s.categories);
  const [loading, setLoading] = useState(!isNew);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({ defaultValues: EMPTY });

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    unwrap(api.get(`/admin/posts/${id}`))
      .then((p) => {
        reset({
          ...EMPTY,
          ...p,
          tags: (p.tags || []).join(', '),
          publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 16) : '',
        });
      })
      .catch(() => toast.error('Failed to load post'))
      .finally(() => setLoading(false));
  }, [id, isNew, reset]);

  async function onSubmit(values) {
    const payload = {
      ...values,
      tags: values.tags
        ? String(values.tags)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      publishedAt: values.publishedAt ? new Date(values.publishedAt).toISOString() : undefined,
    };
    try {
      if (isNew) {
        const created = await unwrap(api.post('/admin/posts', payload));
        toast.success('Post created.');
        navigate(`/admin/posts/${created._id}`);
      } else {
        await api.put(`/admin/posts/${id}`, payload);
        toast.success('Post saved.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Save failed';
      toast.error(msg);
    }
  }

  if (loading) return <div className="p-10 text-ink-sec">Loading…</div>;

  const slug = watch('slug');
  const isPublished = watch('isPublished');

  return (
    <>
      <Helmet>
        <title>{isNew ? 'New Post' : 'Edit Post'} | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10 max-w-5xl">
        <AdminPageHeader
          title={isNew ? 'New post' : 'Edit post'}
          breadcrumbs={[
            { to: '/admin', label: 'Dashboard' },
            { to: '/admin/posts', label: 'Blog' },
            { label: isNew ? 'New' : 'Edit' },
          ]}
          actions={
            !isNew && slug && isPublished ? (
              <a
                href={`/blog/${slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-strong text-ink px-4 py-2 text-sm hover:bg-elevated"
              >
                <ExternalLink className="h-4 w-4" /> View
              </a>
            ) : null
          }
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Section title="Basics">
            <Input id="title" label="Title" required {...register('title', { required: true })} />
            <Input id="slug" label="Slug" placeholder="auto-generated from title if empty" {...register('slug')} />
            <Textarea id="excerpt" label="Excerpt (max 240)" rows={3} required {...register('excerpt', { required: true, maxLength: 240 })} />
          </Section>

          <Section title="Body">
            <Textarea
              id="body"
              label="HTML body"
              rows={20}
              required
              hint="Paste HTML or write paragraphs wrapped in <p> tags. Tiptap editor coming in v2."
              className="font-mono text-sm"
              {...register('body', { required: true })}
            />
          </Section>

          <Section title="Cover image">
            <Input id="cover.url" label="Cover URL" placeholder="https://res.cloudinary.com/..." {...register('cover.url')} />
            <Input id="cover.alt" label="Alt text" {...register('cover.alt')} />
          </Section>

          <Section title="Author">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input id="author.name" label="Author name" required {...register('author.name', { required: true })} />
              <Input id="author.avatarUrl" label="Author avatar URL" {...register('author.avatarUrl')} />
            </div>
            <Textarea id="author.bio" label="Bio" rows={2} {...register('author.bio')} />
          </Section>

          <Section title="Taxonomy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                id="category"
                label="Category"
                required
                options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                {...register('category', { required: true })}
              />
              <Input id="tags" label="Tags (comma-separated)" {...register('tags')} />
            </div>
          </Section>

          <Section title="Publish">
            <label className="flex items-center gap-2 text-sm text-ink-sec">
              <input type="checkbox" {...register('isPublished')} className="h-4 w-4 accent-tangerine" />
              Published
            </label>
            <Input
              id="publishedAt"
              label="Publish date"
              type="datetime-local"
              hint="Defaults to now when first published"
              {...register('publishedAt')}
            />
          </Section>

          <Section title="SEO">
            <Input id="meta.title" label="Meta title" {...register('meta.title')} />
            <Textarea id="meta.description" label="Meta description" rows={2} {...register('meta.description')} />
          </Section>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-subtle">
            <Button type="submit" disabled={isSubmitting} arrow={false}>
              {isSubmitting ? 'Saving…' : isNew ? 'Create post' : 'Save changes'}
            </Button>
            <Button to="/admin/posts" variant="secondary" arrow={false}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <fieldset className="rounded-card border border-subtle bg-elevated p-6 md:p-8 space-y-4">
      <legend className="font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine px-2">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

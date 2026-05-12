import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import { Input, Textarea, Select } from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useSiteStore } from '../../stores/siteStore.js';

const EMPTY = {
  slug: '',
  order: 1,
  number: '01',
  categoryTag: '',
  title: '',
  cardDescription: '',
  whatWeLabel: 'What We Build',
  hero: { eyebrow: '', headline: '', headlineEmphasis: '', subhead: '', image: { url: '', alt: '' } },
  deliverables: [{ number: '01', title: '', body: '' }],
  loompaaTake: { headline: '', headlineEmphasis: '', body: '' },
  related: [],
  meta: { title: '', description: '' },
  isPublished: true,
};

export default function ServiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;
  const refreshSite = useSiteStore((s) => s.refresh);
  const allServices = useSiteStore((s) => s.services);
  const [loading, setLoading] = useState(!isNew);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY });

  const { fields, append, remove } = useFieldArray({ control, name: 'deliverables' });
  const related = watch('related') || [];

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    unwrap(api.get(`/admin/services/${id}`))
      .then((s) => reset({ ...EMPTY, ...s }))
      .catch(() => toast.error('Failed to load service'))
      .finally(() => setLoading(false));
  }, [id, isNew, reset]);

  function toggleRelated(slug) {
    const next = related.includes(slug) ? related.filter((s) => s !== slug) : [...related, slug];
    setValue('related', next);
  }

  async function onSubmit(values) {
    try {
      if (isNew) {
        const created = await unwrap(api.post('/admin/services', values));
        toast.success('Service created.');
        refreshSite();
        navigate(`/admin/services/${created._id}`);
      } else {
        await api.put(`/admin/services/${id}`, values);
        toast.success('Service saved.');
        refreshSite();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Save failed';
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        toast.error(`${msg}: ${apiErrors.map((e) => `${e.field} ${e.message}`).join(', ')}`);
      } else {
        toast.error(msg);
      }
    }
  }

  if (loading) return <div className="p-10 text-ink-sec">Loading…</div>;

  const slug = watch('slug');

  return (
    <>
      <Helmet>
        <title>{isNew ? 'New Service' : 'Edit Service'} | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10 max-w-5xl">
        <AdminPageHeader
          title={isNew ? 'New service' : 'Edit service'}
          breadcrumbs={[
            { to: '/admin', label: 'Dashboard' },
            { to: '/admin/services', label: 'Services' },
            { label: isNew ? 'New' : 'Edit' },
          ]}
          actions={
            !isNew && slug ? (
              <a
                href={`/services/${slug}?preview=1`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-strong text-ink px-4 py-2 text-sm hover:bg-elevated transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Preview
              </a>
            ) : null
          }
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <Section title="Basics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input id="title" label="Title" required error={errors.title?.message} {...register('title', { required: 'Required' })} />
              <Input id="slug" label="Slug" placeholder="auto-generated from title if empty" {...register('slug')} />
              <Input id="number" label="Number" placeholder="01" required {...register('number', { required: true })} />
              <Input id="order" type="number" min="1" label="Order" required {...register('order', { required: true, valueAsNumber: true })} />
              <Input id="categoryTag" label="Category Tag" placeholder="BRAND" required {...register('categoryTag', { required: true })} />
              <Input id="whatWeLabel" label="What We Label" placeholder="What We Build" {...register('whatWeLabel')} />
            </div>
            <Textarea id="cardDescription" label="Card description" rows={2} required {...register('cardDescription', { required: true })} />
            <label className="flex items-center gap-2 text-sm text-ink-sec">
              <input type="checkbox" {...register('isPublished')} className="h-4 w-4 accent-tangerine" />
              Published
            </label>
          </Section>

          <Section title="Hero">
            <Input id="hero.eyebrow" label="Eyebrow" placeholder="SERVICE 01 — Brand Building" {...register('hero.eyebrow')} />
            <Textarea id="hero.headline" label="Headline" rows={2} required {...register('hero.headline', { required: true })} />
            <Input id="hero.headlineEmphasis" label="Italic emphasis word" placeholder="word in headline to italicize" {...register('hero.headlineEmphasis')} />
            <Textarea id="hero.subhead" label="Subhead" rows={3} {...register('hero.subhead')} />
            <Input id="hero.image.url" label="Hero image URL" placeholder="https://res.cloudinary.com/..." {...register('hero.image.url')} />
            <Input id="hero.image.alt" label="Hero image alt text" {...register('hero.image.alt')} />
          </Section>

          <Section title="Deliverables">
            <div className="space-y-4">
              {fields.map((field, i) => (
                <div key={field.id} className="rounded-xl border border-subtle bg-base p-4 grid grid-cols-12 gap-3 items-start">
                  <div className="col-span-3 md:col-span-2">
                    <Input id={`deliverables.${i}.number`} label="No." placeholder={String(i + 1).padStart(2, '0')} {...register(`deliverables.${i}.number`)} />
                  </div>
                  <div className="col-span-9 md:col-span-9 space-y-3">
                    <Input id={`deliverables.${i}.title`} label="Title" {...register(`deliverables.${i}.title`)} />
                    <Textarea id={`deliverables.${i}.body`} label="Body" rows={3} {...register(`deliverables.${i}.body`)} />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex md:justify-end">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="p-2 text-ink-tri hover:text-error"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ number: String(fields.length + 1).padStart(2, '0'), title: '', body: '' })}
                className="inline-flex items-center gap-2 rounded-pill border border-strong text-ink px-4 py-2 text-sm hover:bg-elevated"
              >
                <Plus className="h-4 w-4" /> Add deliverable
              </button>
            </div>
          </Section>

          <Section title="The Loompaa Take">
            <Input id="loompaaTake.headline" label="Headline" {...register('loompaaTake.headline')} />
            <Input id="loompaaTake.headlineEmphasis" label="Italic emphasis word" {...register('loompaaTake.headlineEmphasis')} />
            <Textarea id="loompaaTake.body" label="Body (use blank lines between paragraphs)" rows={8} {...register('loompaaTake.body')} />
          </Section>

          <Section title="Related services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {allServices
                .filter((s) => s.slug !== slug)
                .map((s) => {
                  const active = related.includes(s.slug);
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => toggleRelated(s.slug)}
                      className={`text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                        active
                          ? 'border-tangerine bg-tangerine/10 text-ink'
                          : 'border-subtle bg-base text-ink-sec hover:border-strong'
                      }`}
                    >
                      <span className="font-mono text-xs text-tangerine mr-2">{s.number}</span>
                      {s.title}
                    </button>
                  );
                })}
            </div>
          </Section>

          <Section title="SEO">
            <Input id="meta.title" label="Meta title" {...register('meta.title')} />
            <Textarea id="meta.description" label="Meta description" rows={2} {...register('meta.description')} />
          </Section>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-subtle">
            <Button type="submit" disabled={isSubmitting} arrow={false}>
              {isSubmitting ? 'Saving…' : isNew ? 'Create service' : 'Save changes'}
            </Button>
            <Button to="/admin/services" variant="secondary" arrow={false}>
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

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Calendar, Building2, IndianRupee, Tag } from 'lucide-react';
import { toast } from 'sonner';
import api, { unwrap } from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { Select, Textarea } from '../../components/ui/Input.jsx';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'in-review', label: 'In review' },
  { value: 'replied', label: 'Replied' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'archived', label: 'Archived' },
];

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    unwrap(api.get(`/admin/contacts/${id}`))
      .then((c) => {
        setContact(c);
        setNotes(c.internalNotes || '');
      })
      .catch(() => toast.error('Failed to load contact.'));
  }, [id]);

  async function updateStatus(newStatus) {
    try {
      const updated = await unwrap(api.patch(`/admin/contacts/${id}`, { status: newStatus }));
      setContact(updated);
      toast.success(`Marked as ${newStatus}.`);
    } catch {
      toast.error('Failed to update status.');
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    try {
      await api.patch(`/admin/contacts/${id}`, { internalNotes: notes });
      toast.success('Notes saved.');
    } catch {
      toast.error('Failed to save notes.');
    } finally {
      setSavingNotes(false);
    }
  }

  if (!contact) return <div className="p-10 text-ink-sec">Loading…</div>;

  return (
    <>
      <Helmet>
        <title>{contact.brandName} | Contacts</title>
      </Helmet>
      <div className="p-6 md:p-10 max-w-5xl">
        <AdminPageHeader
          title={contact.brandName}
          subtitle={`${contact.name} · ${contact.email}`}
          breadcrumbs={[
            { to: '/admin', label: 'Dashboard' },
            { to: '/admin/contacts', label: 'Contacts' },
            { label: contact.brandName },
          ]}
          actions={<StatusBadge status={contact.status} />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-card border border-subtle bg-elevated p-6 md:p-7">
              <h2 className="text-sm font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine mb-4">
                Message
              </h2>
              <p className="text-ink text-base md:text-lg leading-relaxed whitespace-pre-line">{contact.message}</p>
              {contact.context && (
                <div className="mt-6 pt-6 border-t border-subtle">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-ink-tri mb-3">
                    Context
                  </h3>
                  <p className="text-ink-sec leading-relaxed whitespace-pre-line">{contact.context}</p>
                </div>
              )}
            </div>

            <div className="rounded-card border border-subtle bg-elevated p-6 md:p-7">
              <h2 className="text-sm font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine mb-4">
                Internal notes
              </h2>
              <Textarea
                id="notes"
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={saveNotes}
                placeholder="Notes only the team can see…"
                hint={savingNotes ? 'Saving…' : 'Auto-saves on blur'}
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-card border border-subtle bg-elevated p-6">
              <Select
                id="status"
                label="Status"
                value={contact.status}
                onChange={(e) => updateStatus(e.target.value)}
                options={STATUS_OPTIONS}
              />
            </div>

            <div className="rounded-card border border-subtle bg-elevated p-6 space-y-3">
              <DetailRow icon={Mail} label="Email">
                <a href={`mailto:${contact.email}`} className="text-tangerine hover:underline">
                  {contact.email}
                </a>
              </DetailRow>
              <DetailRow icon={Building2} label="Brand">
                {contact.brandName}
              </DetailRow>
              <DetailRow icon={IndianRupee} label="Revenue">
                {contact.monthlyRevenue}
              </DetailRow>
              <DetailRow icon={Tag} label="Services">
                <div className="flex flex-wrap gap-1">
                  {(contact.services || []).map((s) => (
                    <span key={s} className="font-mono text-[10px] bg-base px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </DetailRow>
              <DetailRow icon={Calendar} label="Submitted">
                {formatDate(contact.createdAt)}
              </DetailRow>
            </div>

            <a
              href={`mailto:${contact.email}?subject=Re: Loompaa enquiry from ${contact.brandName}`}
              className="block w-full text-center rounded-pill bg-tangerine text-ink-on-cream py-3 text-sm font-medium hover:bg-[#FF7C45]"
            >
              Reply via email →
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 text-ink-tri mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider font-mono text-ink-tri">{label}</div>
        <div className="text-sm text-ink mt-0.5 break-words">{children}</div>
      </div>
    </div>
  );
}

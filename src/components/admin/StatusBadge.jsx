const STYLES = {
  new: 'bg-tangerine/15 text-tangerine border-tangerine/30',
  'in-review': 'bg-lemon/15 text-lemon border-lemon/30',
  replied: 'bg-success/15 text-success border-success/30',
  qualified: 'bg-success/15 text-success border-success/30',
  archived: 'bg-elevated text-ink-tri border-subtle',
  draft: 'bg-elevated text-ink-tri border-subtle',
  published: 'bg-success/15 text-success border-success/30',
  unpublished: 'bg-elevated text-ink-tri border-subtle',
  active: 'bg-success/15 text-success border-success/30',
  inactive: 'bg-elevated text-ink-tri border-subtle',
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.archived;
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border ${style}`}
    >
      {status}
    </span>
  );
}

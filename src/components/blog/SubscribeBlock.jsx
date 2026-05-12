import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../lib/api.js';
import Button from '../ui/Button.jsx';

export default function SubscribeBlock({ source = 'blog', sticky = false }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('That email looks off.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/newsletter', { email, source });
      setDone(true);
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`rounded-card border border-subtle bg-elevated p-6 md:p-7 ${sticky ? 'lg:sticky lg:top-28' : ''}`}
    >
      <p className="font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine mb-3">
        The Loompaa Letter
      </p>
      <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">
        One sharp insight. Every Tuesday.
      </h3>
      <p className="text-ink-sec text-sm mb-5">
        Free. Unsubscribe anytime — but you won't want to.
      </p>
      {done ? (
        <p className="text-sm text-success">
          You're in. First letter arrives Tuesday at 9am IST.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbrand.com"
            className="w-full rounded-pill bg-base border border-subtle text-ink placeholder:text-ink-tri px-4 py-3 text-sm focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
          >
            {submitting ? 'Sending…' : 'Send Me the Letter'}
          </Button>
        </form>
      )}
    </div>
  );
}

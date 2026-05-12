import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../ui/Button.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import api from '../../lib/api.js';
import IMG from '../../assets/images.js';

const MAIN_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

const UTILITY_LINKS = [
  { to: '/newsletter', label: 'Newsletter' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/admin/login', label: 'Admin Login' },
];

export default function Footer() {
  const services = useSiteStore((s) => s.services);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubscribe(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('That email looks off.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/newsletter', { email, source: 'footer' });
      toast.success("You're in. First letter arrives Tuesday at 9am IST.");
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    /* Explicitly light background — no dark theme */
    <footer style={{ background: '#F5F1E8', color: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">

        {/* ── Top: logo + tagline + newsletter ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14" style={{ borderBottom: '1px solid rgba(10,10,10,0.10)' }}>
          
          {/* Logo + tagline + email */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-baseline">
              <span className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-none tracking-[-0.05em]">
                <span style={{ color: '#0A0A0A' }}>loomp</span>
                <span style={{ color: '#FF6B2C' }}>aa</span>
              </span>
            </div>
            <p className="text-base md:text-lg max-w-md leading-relaxed" style={{ color: 'rgba(10,10,10,0.60)' }}>
              Your e-commerce factory floor. We plug in, build the systems, and move the number — while you take the bow.
            </p>
            <a
              href="mailto:hello@loompaa.in"
              className="group inline-flex items-center gap-2 text-base font-medium transition-colors w-fit"
              style={{ color: '#0A0A0A' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF6B2C'}
              onMouseLeave={e => e.currentTarget.style.color = '#0A0A0A'}
            >
              <Mail className="h-5 w-5" />
              <span>hello@loompaa.in</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-5">
            <form
              onSubmit={onSubscribe}
              className="rounded-card p-6 md:p-7 relative overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid rgba(10,10,10,0.08)' }}
            >
              <img
                src={IMG.envelope}
                alt=""
                aria-hidden="true"
                className="absolute -top-4 -right-4 w-24 h-24 opacity-70"
              />
              <p className="font-mono text-eyebrow uppercase tracking-[0.18em] mb-3 relative z-10" style={{ color: '#FF6B2C' }}>
                The Loompaa Letter
              </p>
              <h3 className="text-xl md:text-2xl font-bold mb-2 relative z-10" style={{ color: '#0A0A0A' }}>
                Subscribe to our newsletter
              </h3>
              <p className="text-sm mb-5 relative z-10" style={{ color: 'rgba(10,10,10,0.55)' }}>
                One sharp insight. Every Tuesday. Free.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 relative z-10">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2"
                  style={{
                    background: '#F5F1E8',
                    border: '1px solid rgba(10,10,10,0.12)',
                    color: '#0A0A0A',
                    focusRingColor: '#FF6B2C',
                  }}
                />
                <Button type="submit" disabled={submitting} className="h-11 px-6">
                  {submitting ? '…' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(10,10,10,0.40)' }}>
              Main pages
            </p>
            <ul className="space-y-3">
              {MAIN_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(10,10,10,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF6B2C'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.65)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(10,10,10,0.40)' }}>
              Services
            </p>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(10,10,10,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF6B2C'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.65)'}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(10,10,10,0.40)' }}>
              Utility pages
            </p>
            <ul className="space-y-3">
              {UTILITY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(10,10,10,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF6B2C'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.65)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(10,10,10,0.40)' }}>
              Based in
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
              Surat &amp; Ahmedabad<br />India
            </p>
            <p className="text-xs mt-3 font-mono uppercase tracking-wider" style={{ color: 'rgba(10,10,10,0.35)' }}>
              MFG · EST 2024
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm"
          style={{ borderTop: '1px solid rgba(10,10,10,0.08)', color: 'rgba(10,10,10,0.40)' }}
        >
          <p>© {new Date().getFullYear()} Loompaa. All rights reserved.</p>
          <p>Built by the factory floor, for the factory floor.</p>
        </div>
      </div>
    </footer>
  );
}

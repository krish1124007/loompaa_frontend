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
    <footer className="bg-[#0A0A0A] text-white rounded-t-[60px] md:rounded-t-[100px] overflow-hidden relative z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

        {/* ── Top: logo + tagline + newsletter ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 pb-16 border-b border-white/10">
          
          {/* Logo + tagline + email */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex items-baseline">
              <span className="text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-none tracking-[-0.05em]">
                <span className="text-white">loomp</span>
                <span className="text-[#FF6B2C]">aa</span>
              </span>
            </div>
            <p className="text-lg md:text-xl max-w-md leading-relaxed text-white/50">
              Your e-commerce factory floor. We plug in, build the systems, and move the number — while you take the bow.
            </p>
            <a
              href="mailto:hello@loompaa.in"
              className="group inline-flex items-center gap-3 text-lg font-bold text-white hover:text-[#FF6B2C] transition-all w-fit"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF6B2C] group-hover:bg-[#FF6B2C]/10 transition-all">
                <Mail className="h-5 w-5" />
              </span>
              <span>hello@loompaa.in</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-5">
            <form
              onSubmit={onSubscribe}
              className="rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <img
                src={IMG.envelope}
                alt=""
                aria-hidden="true"
                className="absolute -top-6 -right-6 w-32 h-32 opacity-20 pointer-events-none"
              />
              <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-[#FF6B2C]">
                The Loompaa Letter
              </p>
              <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">
                Stay sharp.
              </h3>
              <p className="text-base mb-8 text-white/50">
                One e-commerce execution insight. Every Tuesday. Free.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-2xl px-6 py-4 text-base bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] transition-all"
                />
                <Button type="submit" variant="inverse" disabled={submitting} className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm">
                  {submitting ? '…' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 py-20">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-white/30">
              Main pages
            </p>
            <ul className="space-y-4">
              {MAIN_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-base font-medium text-white/60 hover:text-[#FF6B2C] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-white/30">
              Services
            </p>
            <ul className="space-y-4">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-base font-medium text-white/60 hover:text-[#FF6B2C] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-white/30">
              Legal
            </p>
            <ul className="space-y-4">
              {UTILITY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-base font-medium text-white/60 hover:text-[#FF6B2C] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-white/30">
              Visit us
            </p>
            <p className="text-base font-medium leading-relaxed text-white/60">
              Surat &amp; Ahmedabad<br />India
            </p>
            <div className="mt-8 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
               <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/20">MFG · EST 2024</span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between border-t border-white/5">
          <p className="text-sm font-medium text-white/30">© {new Date().getFullYear()} Loompaa. All rights reserved.</p>
          <p className="text-sm font-medium text-white/30 italic">Built by the factory floor, for the factory floor.</p>
        </div>
      </div>
    </footer>
  );
}

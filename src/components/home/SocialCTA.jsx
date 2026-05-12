import { Mail, Send } from 'lucide-react';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import Button from '../ui/Button.jsx';

/* ── Brand SVG logos ── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919999999999',
    icon: WhatsAppIcon,
    color: '#25D366',
    bg: 'rgba(37,211,102,0.12)',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/loompaa',
    icon: LinkedInIcon,
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.12)',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/loompaa.in',
    icon: InstagramIcon,
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.12)',
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/loompaa_in',
    icon: XIcon,
    color: '#000000',
    bg: 'rgba(0,0,0,0.08)',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@loompaa',
    icon: YouTubeIcon,
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.10)',
  },
];

export default function SocialCTA() {
  return (
    <section className="bg-base py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <RevealOnScroll>
          <div className="relative rounded-[2.5rem] overflow-hidden border border-subtle/60 bg-elevated/50">
            {/* Subtle dot-grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, var(--ink-primary) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* Orange top-right glow */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,107,44,0.12) 0%, transparent 65%)',
              }}
            />
            {/* Lemon bottom-left glow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-20 w-72 h-72 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,217,61,0.08) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10 grid grid-cols-12 gap-10 p-10 md:p-14 lg:p-20 items-center">

              {/* ── Left — headline & copy ── */}
              <div className="col-span-12 lg:col-span-7">
                <RevealOnScroll>
                  <span className="inline-flex items-center gap-2 bg-tangerine/10 text-tangerine border border-tangerine/25 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase mb-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-tangerine inline-block animate-pulse" />
                    START A CONVERSATION
                  </span>
                </RevealOnScroll>

                <RevealOnScroll delay={0.06}>
                  <h2 className="font-sans font-black text-display-lg text-ink leading-[0.92] tracking-[-0.04em]">
                    Have an{' '}
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 inset-y-2 -rotate-1 rounded-[8px] bg-lemon"
                      />
                      <span className="relative text-ink-on-cream">idea?</span>
                    </span>
                    <br />
                    <span className="text-tangerine">Let's build it.</span>
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.12}>
                  <p className="mt-8 text-ink-sec text-lg md:text-xl leading-relaxed max-w-xl">
                    We don't do discovery calls. We do real conversations about your
                    numbers, your gaps, and what we'd ship in your first{' '}
                    <span className="text-tangerine font-bold">48 hours.</span>
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.18}>
                  <div className="mt-10">
                    <Button to="/contact" size="lg">Start Building</Button>
                  </div>
                </RevealOnScroll>
              </div>

              {/* ── Right — socials + email ── */}
              <div className="col-span-12 lg:col-span-5">
                <RevealOnScroll delay={0.2}>
                  <div className="rounded-2xl bg-base/70 border border-subtle p-6 md:p-8 backdrop-blur-sm shadow-sm">

                    <p className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-ink-tri mb-5">
                      Find us on
                    </p>

                    {/* Social icon buttons */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {SOCIALS.map(({ label, href, icon: Icon, color, bg }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                          className="group relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-subtle bg-elevated hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                          style={{ '--social-color': color }}
                        >
                          {/* Background fill on hover */}
                          <span
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: bg }}
                          />
                          <span
                            className="relative transition-colors duration-300"
                            style={{ color: 'var(--ink-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '';
                            }}
                          >
                            <Icon />
                          </span>
                        </a>
                      ))}
                    </div>

                    {/* Email row */}
                    <a
                      href="mailto:hello@loompaa.in"
                      className="group flex items-center gap-3 p-4 rounded-xl border border-subtle bg-elevated/60 hover:bg-elevated hover:border-tangerine/30 transition-all duration-300"
                    >
                      <span className="h-10 w-10 rounded-lg bg-tangerine/10 flex items-center justify-center text-tangerine flex-shrink-0 group-hover:bg-tangerine group-hover:text-white transition-colors duration-300">
                        <Mail className="h-4 w-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-ink-tri text-[11px] font-mono uppercase tracking-wider mb-0.5">Email us</p>
                        <p className="text-ink font-bold text-[15px] group-hover:text-tangerine transition-colors truncate">
                          hello@loompaa.in
                        </p>
                      </div>
                      <Send className="h-4 w-4 text-ink-tri group-hover:text-tangerine group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    </a>

                    {/* Pricing link */}
                    <a
                      href="/pricing"
                      className="mt-4 inline-flex items-center gap-2 text-ink-tri hover:text-tangerine text-sm font-medium transition-colors group"
                    >
                      <span>View pricing plans</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      >
                        <line x1="5" y1="19" x2="19" y2="5" />
                        <polyline points="5 5 19 5 19 19" />
                      </svg>
                    </a>

                  </div>
                </RevealOnScroll>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

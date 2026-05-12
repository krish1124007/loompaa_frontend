import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import { cn } from '../../lib/cn.js';

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', dropdown: true },
  { to: '/contact', label: 'Contact' },
  { to: '/newsletter', label: 'Newsletter' },
];

export default function Navbar() {
  const location = useLocation();
  const services = useSiteStore((s) => s.services);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navRef = useRef(null);

  /* Entrance animation on mount */
  useGSAP(() => {
    gsap.fromTo(
      '.nav-item',
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.3 },
    );
    gsap.fromTo(
      '.nav-pill',
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', delay: 0.2 },
    );
  }, { scope: navRef });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || mobileOpen ? 'py-3 md:py-4' : 'py-5 md:py-8',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div
          className={cn(
            'nav-pill flex items-center justify-between gap-6 px-6 md:px-8 h-[60px] md:h-[68px] rounded-full border border-subtle/50 transition-all duration-500',
            scrolled || mobileOpen
              ? 'bg-base/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
              : 'bg-elevated/40 backdrop-blur-md shadow-sm',
          )}
        >
          <Logo size="md" className="shrink-0 transition-transform hover:scale-105" />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.to}
                    className="nav-item relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-1.5 px-4 py-2 rounded-full text-[15px] font-bold tracking-[-0.01em] transition-all duration-300',
                          isActive
                            ? 'text-tangerine bg-tangerine/5'
                            : 'text-ink/70 hover:text-ink hover:bg-base/50',
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-300',
                          servicesOpen && 'rotate-180',
                        )}
                      />
                    </NavLink>
                    <AnimatePresence>
                      {servicesOpen && services.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[680px]"
                        >
                          <div className="rounded-2xl bg-elevated/95 backdrop-blur-2xl border border-subtle shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 grid grid-cols-2 gap-2">
                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                className="group flex flex-col gap-1.5 rounded-xl px-5 py-4 hover:bg-base/80 border border-transparent hover:border-subtle/50 transition-all duration-300"
                              >
                                <span className="flex items-center gap-3">
                                  <span className="font-mono text-[10px] font-bold tracking-widest text-tangerine bg-tangerine/10 px-2 py-0.5 rounded">
                                    {s.number}
                                  </span>
                                  <span className="text-[15px] font-semibold text-ink group-hover:text-tangerine transition-colors">
                                    {s.title}
                                  </span>
                                </span>
                                <span className="text-[13px] text-ink-tri leading-relaxed line-clamp-2">
                                  {s.cardDescription}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    cn(
                      'nav-item px-4 py-2 rounded-full text-[15px] font-bold tracking-[-0.01em] transition-all duration-300',
                      isActive
                        ? 'text-tangerine bg-tangerine/5'
                        : 'text-ink/70 hover:text-ink hover:bg-base/50',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button to="/contact" variant="primary" size="sm" className="h-10 px-6">
              Start Building
            </Button>
          </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 bg-base z-40 overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-4 text-2xl font-semibold rounded-xl transition-colors',
                      isActive ? 'bg-elevated text-ink' : 'text-ink-sec hover:bg-elevated hover:text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-6">
                <Button to="/contact" variant="primary" size="lg" className="w-full">
                  Start Building
                </Button>
              </div>
              {services.length > 0 && (
                <div className="pt-8">
                  <p className="px-4 pb-3 font-mono text-eyebrow uppercase text-ink-tri">
                    Services
                  </p>
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-ink-sec hover:bg-elevated"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-tangerine">{s.number}</span>
                        <span>{s.title}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

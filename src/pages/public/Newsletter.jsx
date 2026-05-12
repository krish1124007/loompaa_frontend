import { useState, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lightbulb, Hash, Flame } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pill from '../../components/ui/Pill.jsx';
import SectionHeader from '../../components/ui/SectionHeader.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import api from '../../lib/api.js';
import IMG from '../../assets/images.js';
import Button from '../../components/ui/Button.jsx';

const SECTIONS = [
  {
    icon: Lightbulb,
    title: 'The Insight',
    body: 'One thing about e-commerce growth, performance marketing, or brand building that we learned this week. Written from the factory floor, not from a case study.',
  },
  {
    icon: Hash,
    title: 'The Number',
    body: 'One data point that changes how you should think about your business. Could be an industry stat, a benchmark, or something from a client account (anonymised).',
  },
  {
    icon: Flame,
    title: 'The Hot Take',
    body: 'One opinion we hold that most agencies would be too scared to say out loud. We publish it anyway.',
  },
];

const PAST_TOPICS = [
  {
    issue: 'Issue 14',
    title: 'Why your ROAS is lying to you',
    desc: 'Blended ROAS hides where the actual efficiency problem is. Here\'s the breakdown that shows the truth.',
  },
  {
    issue: 'Issue 11',
    title: "The 25% RTO problem no one talks about",
    desc: 'One in four orders is coming back. The math of what that actually costs your margin — and the three things that fix it.',
  },
  {
    issue: 'Issue 09',
    title: 'Progressive overload for your ad account',
    desc: 'Athletes add weight every week. Why most brands run the same creative for 3 months and wonder why ROAS drops.',
  },
  {
    issue: 'Issue 07',
    title: "The agency model is broken. Here's what we replaced it with.",
    desc: "The performance guarantee, the 48-hour live commitment, and why the retainer model doesn't align anyone's interests.",
  },
  {
    issue: 'Issue 05',
    title: 'Why your Welcome Flow is your most valuable asset',
    desc: 'The first 7 days after a customer subscribes determines their LTV. Most brands send one email and forget.',
  },
  {
    issue: 'Issue 03',
    title: 'The Quick Commerce opportunity most D2C brands are missing',
    desc: "Blinkit and Zepto aren't just distribution. They're discovery channels. Here's how the top brands are using them.",
  },
];

/* ── Reusable Character Split Component ── */
function SplitText({ text, className }) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0.15 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setLocalError] = useState('');

  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const pillRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(pillRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(h1Ref.current, 
        { y: 60, opacity: 0, skewY: 4 }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 
        '-=0.5'
      )
      .fromTo(imgRef.current, { opacity: 0, scale: 0.92, rotation: 5 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.4 }, '-=0.7');

    /* Character reveal for paragraph */
    gsap.to('.newsletter-p .char', {
      opacity: 1,
      duration: 0.03,
      stagger: 0.01,
      ease: 'none',
      delay: 0.8,
    });
  }, { scope: containerRef });

  async function onSubmit(e) {
    e.preventDefault();
    setLocalError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('That email looks off.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/newsletter', { email, source: 'newsletter-page' });
      setSubscribed(true);
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Subscription failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>The Loompaa Letter — Weekly E-Commerce Insight for D2C Founders</title>
        <meta name="description" content="One insight, one number, one hot take. Every Tuesday. Free." />
      </Helmet>

      <section ref={containerRef} className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
              <div ref={pillRef} style={{ opacity: 0 }} className="flex lg:justify-start justify-center">
                <Pill variant="default">LETTER — The Loompaa Letter</Pill>
              </div>
              <h1
                ref={h1Ref}
                style={{ opacity: 0 }}
                className="mt-8 font-sans font-black text-display-xl text-ink leading-[0.95] tracking-[-0.03em]"
              >
                The weekly read for D2C founders{' '}
                <span className="text-tangerine">who hate fluff.</span>
              </h1>
              <p className="mt-8 text-ink-sec text-lg md:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
                <SplitText 
                  text="Every week: one sharp insight on e-commerce growth, one number worth knowing, and one thing we saw this week that most brands are getting wrong. No guest writers. No sponsored content. No word count padding." 
                  className="newsletter-p" 
                />
              </p>

              {subscribed ? (
                <p className="mt-8 text-success font-bold text-lg">
                  You're in. First letter arrives Tuesday at 9am IST.
                </p>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="mt-10 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@yourbrand.com"
                    className="flex-1 rounded-pill bg-elevated border border-subtle text-ink placeholder:text-ink-tri px-5 py-3 text-base focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20 font-medium"
                  />
                  <Button type="submit" disabled={submitting} className="sm:w-auto w-full">
                    {submitting ? 'Sending…' : 'Subscribe'}
                  </Button>
                </form>
              )}
              {error && <p className="mt-4 text-sm text-error font-bold">{error}</p>}
            </div>

            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <img
                ref={imgRef}
                // style={{ opacity: 0 }}
                src={IMG.newsletterIllustration}
                alt="Newsletter"
                className="w-full max-w-md h-auto"
                style={{opacity: 0 , filter: 'invert(0.92) hue-rotate(180deg) brightness(1.05) saturate(0.4)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-elevated/40 border-y border-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionHeader
              align="center"
              eyebrow="WHAT IT IS"
              headline="The newsletter agencies don't want you to read."
              emphasis="don't want you to read."
            />
            <p className="mt-6 text-ink-sec text-base md:text-lg leading-relaxed font-medium">
              The Loompaa Letter is a weekly email for D2C founders and e-commerce operators. It covers the things that actually move revenue — not the things that get retweeted at marketing conferences. Every issue has three things and three things only.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SECTIONS.map((s, i) => (
              <RevealOnScroll key={s.title} delay={i * 0.08}>
                <article className="h-full rounded-card border border-subtle bg-base p-7 md:p-8 hover:border-tangerine transition-colors">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine/15 text-tangerine mb-5">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-ink mb-3 tracking-tight uppercase">{s.title}</h3>
                  <p className="text-ink-sec text-base leading-relaxed font-medium">{s.body}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="max-w-3xl mb-12">
          <SectionHeader
            eyebrow="PAST TOPICS"
            headline="What we've already covered."
            emphasis="already covered."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PAST_TOPICS.map((t, i) => (
            <RevealOnScroll key={t.issue} delay={i * 0.05}>
              <article className="h-full rounded-card border border-subtle bg-elevated p-6 md:p-7 hover:border-tangerine transition-colors">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-tangerine mb-3 font-bold">
                  {t.issue}
                </p>
                <h3 className="text-lg md:text-xl font-black text-ink mb-3 leading-tight tracking-tight uppercase">
                  {t.title}
                </h3>
                <p className="text-sm text-ink-sec leading-relaxed font-medium">{t.desc}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-elevated/40 border-y border-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-tangerine mb-6 font-bold">
            Subscribe
          </p>
          <h2 className="font-sans font-black text-display-md text-ink leading-[1.05] tracking-[-0.02em] max-w-3xl mx-auto">
            Join 4,000+ D2C founders{' '}
            <span className="text-tangerine">reading every Tuesday.</span>
          </h2>
          <p className="mt-6 text-ink-sec text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
            Free. Weekly. Unsubscribe anytime (but you won't want to). No pitch. No spam. Just the insight. Every Tuesday.
          </p>
        </div>
      </section>
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Pill from '../../components/ui/Pill.jsx';
import Button from '../../components/ui/Button.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import FinalCTA from '../../components/home/FinalCTA.jsx';

const PLANS = [
  {
    name: 'Plug-In',
    eyebrow: 'For founders testing the floor',
    price: '₹1,49,000',
    period: '/month',
    description:
      'One service, one team, one number to move. Cancel anytime. No retainer drama.',
    features: [
      'One service of your choice',
      '48-hour onboarding',
      'Dedicated Loompaa lead',
      'Weekly transparency reports',
      'Slack channel + WhatsApp',
      'Cancel any month',
    ],
    cta: 'Start Building',
    accent: false,
  },
  {
    name: 'Full Factory',
    eyebrow: 'For brands ready to scale',
    price: '₹4,99,000',
    period: '/month',
    description:
      'Every station, every week. Performance guarantee — miss the targets, we work the next 30 days free.',
    features: [
      'All 8 services on tap',
      '48-hour onboarding',
      'Senior partner on every weekly call',
      'Performance guarantee',
      'Live revenue dashboard',
      'Quarterly strategy reset',
      'First-line WhatsApp response',
    ],
    cta: 'Scale With Us',
    accent: true,
  },
];

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing — Loompaa Plans for D2C Brands</title>
        <meta
          name="description"
          content="Two plans. No retainer drama. Cancel anytime. Performance guarantee on Full Factory."
        />
      </Helmet>

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Pill variant="default">PRICING — Priced for the Work</Pill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-sans font-bold text-display-xl text-ink leading-[0.95] tracking-[-0.03em] max-w-5xl mx-auto"
          >
            Plans{' '}
            <em className="font-display not-italic italic text-tangerine">for everyone.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-8 text-ink-sec text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            No 3-month lock-ins. No "we need more time to see results." Pick a plan, be live in 48 hours, scale or cancel.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <RevealOnScroll key={plan.name} delay={i * 0.1}>
              <article
                className={`relative h-full rounded-card p-8 md:p-10 ${
                  plan.accent
                    ? 'bg-tangerine text-ink-on-cream border-2 border-tangerine'
                    : 'bg-elevated text-ink border border-subtle'
                }`}
              >
                {plan.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-pill bg-ink-on-cream text-tangerine px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                      Most Popular
                    </span>
                  </div>
                )}
                <p
                  className={`font-mono text-eyebrow uppercase tracking-[0.18em] mb-3 ${
                    plan.accent ? 'text-ink-on-cream/70' : 'text-tangerine'
                  }`}
                >
                  {plan.eyebrow}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={`mb-6 leading-relaxed ${
                    plan.accent ? 'text-ink-on-cream/80' : 'text-ink-sec'
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  <span
                    className={`ml-1 text-sm font-mono ${
                      plan.accent ? 'text-ink-on-cream/70' : 'text-ink-tri'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`font-mono text-eyebrow uppercase tracking-[0.18em] mb-4 ${
                    plan.accent ? 'text-ink-on-cream/70' : 'text-ink-tri'
                  }`}
                >
                  What's included
                </p>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          plan.accent ? 'text-ink-on-cream' : 'text-tangerine'
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base leading-relaxed ${
                          plan.accent ? 'text-ink-on-cream' : 'text-ink-sec'
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  to="/contact"
                  variant={plan.accent ? 'inverse' : 'primary'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-ink-tri max-w-2xl mx-auto">
          Need something custom? We also do project-based engagements — drop us a line at{' '}
          <a href="mailto:hello@loompaa.in" className="text-tangerine hover:underline">
            hello@loompaa.in
          </a>{' '}
          and we'll scope it together.
        </p>
      </section>

      <FinalCTA />
    </>
  );
}

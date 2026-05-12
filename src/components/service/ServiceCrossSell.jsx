import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import { useSiteStore } from '../../stores/siteStore.js';

export default function ServiceCrossSell({ service }) {
  const allServices = useSiteStore((s) => s.services);
  const relatedSlugs = service.related || [];
  const related = allServices.filter((s) => relatedSlugs.includes(s.slug));

  if (!related.length) return null;

  return (
    <section className="bg-elevated/40 border-y border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mb-12">
          <SectionHeader
            eyebrow="WHILE YOU'RE HERE"
            headline={`Brands that scale ${service.title} also scale these.`}
            emphasis="also scale these."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {related.map((s, i) => (
            <RevealOnScroll key={s.slug} delay={i * 0.08}>
              <Link
                to={`/services/${s.slug}`}
                className="group block h-full rounded-card border border-subtle bg-base p-7 md:p-8 transition-all duration-300 hover:border-tangerine hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="font-mono text-2xl text-tangerine">{s.number}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-tri group-hover:text-tangerine transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-ink mb-3 group-hover:text-tangerine transition-colors">
                  {s.title}
                </h3>
                <p className="text-ink-sec text-sm md:text-base leading-relaxed">
                  {s.cardDescription}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

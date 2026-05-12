import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import api, { unwrap } from '../../lib/api.js';
import { useSiteStore } from '../../stores/siteStore.js';
import { BLOG_COVERS, IMG } from '../../assets/images.js';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getCover(post) {
  if (post.cover?.url && !post.cover.url.includes('demo/image')) return post.cover.url;
  return BLOG_COVERS[post.slug] || IMG.blog.rightDesignTools;
}

function FeaturedCard({ post, categoryColor }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block h-full rounded-card border border-subtle bg-elevated overflow-hidden transition-all duration-300 hover:border-tangerine hover:-translate-y-1"
    >
      <div className="aspect-[16/10] bg-base overflow-hidden">
        <img
          src={getCover(post)}
          alt={post.cover?.alt || post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center rounded-pill px-3 py-1 font-mono uppercase tracking-[0.18em] text-[10px]"
            style={{
              background: `${categoryColor}20`,
              color: categoryColor,
              border: `1px solid ${categoryColor}40`,
            }}
          >
            {post.category}
          </span>
          <span className="text-xs text-ink-tri">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-ink leading-snug group-hover:text-tangerine transition-colors">
          {post.title}
        </h3>
        <p className="mt-4 text-ink-sec leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-tangerine font-medium">
          <span>Read article</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function MiniCard({ post, categoryColor }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-4 rounded-card border border-subtle bg-elevated p-4 transition-all duration-300 hover:border-tangerine hover:-translate-y-0.5"
    >
      <div className="flex-shrink-0 h-20 w-20 rounded-xl bg-base overflow-hidden">
        <img
          src={getCover(post)}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="inline-flex items-center rounded-pill px-2 py-0.5 font-mono uppercase tracking-[0.18em] text-[9px] mb-1.5"
          style={{
            background: `${categoryColor}20`,
            color: categoryColor,
          }}
        >
          {post.category}
        </span>
        <h4 className="text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-tangerine transition-colors">
          {post.title}
        </h4>
        <div className="mt-2 text-[11px] text-ink-tri">
          {formatDate(post.publishedAt)} · {post.readTimeMinutes || 1} min
        </div>
      </div>
    </Link>
  );
}

export default function BlogTeaser() {
  const [posts, setPosts] = useState([]);
  const categories = useSiteStore((s) => s.categories);

  useEffect(() => {
    unwrap(api.get('/posts?limit=4'))
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) return null;

  const colorBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.color]));
  const featured = posts[0];
  const rest = posts.slice(1, 4);

  return (
    <section className="theme-cream bg-base">
     <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-7">
          <SectionHeader
            eyebrow="THE LOOMPAA LETTER"
            headline="News & articles."
            emphasis="News"
            emphasisColor="lemon"
          />
        </div>
        <div className="col-span-12 md:col-span-5 md:pt-10 flex flex-col gap-6">
          <p className="text-ink-sec text-base md:text-lg leading-relaxed">
            One sharp insight every Tuesday. No fluff. No listicles. Just signal — written by operators inside the brands we work with.
          </p>
          <div>
            <Button to="/blog" variant="secondary">
              Read All Articles
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {/* Featured post */}
        <RevealOnScroll className="col-span-12 lg:col-span-8">
          <FeaturedCard
            post={featured}
            categoryColor={colorBySlug[featured.category] || '#FF6B2C'}
          />
        </RevealOnScroll>

        {/* What's popular now sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <p className="font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-tri">
            What's popular now
          </p>
          {rest.map((p, i) => (
            <RevealOnScroll key={p.slug} delay={0.1 + i * 0.06}>
              <MiniCard post={p} categoryColor={colorBySlug[p.category] || '#FF6B2C'} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
     </div>
    </section>
  );
}

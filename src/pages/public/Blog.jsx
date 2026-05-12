import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import api, { unwrap } from '../../lib/api.js';
import Pill from '../../components/ui/Pill.jsx';
import PostCard from '../../components/blog/PostCard.jsx';
import SubscribeBlock from '../../components/blog/SubscribeBlock.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import { BLOG_COVERS } from '../../assets/images.js';

const PAGE_SIZE = 9;

function withCover(post) {
  if (post.cover?.url && !post.cover.url.includes('demo/image')) return post;
  const url = BLOG_COVERS[post.slug];
  if (url) return { ...post, cover: { url, alt: post.title } };
  return post;
}

export default function Blog() {
  const categories = useSiteStore((s) => s.categories);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/posts?page=${page}&limit=${PAGE_SIZE}`)
      .then((r) => {
        setPosts((r.data.data || []).map(withCover));
        setMeta(r.data.meta || { pages: 1, total: 0 });
      })
      .finally(() => setLoading(false));
  }, [page]);

  const colorBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.color]));
  const featured = page === 1 ? posts[0] : null;
  const rest = page === 1 ? posts.slice(1) : posts;

  return (
    <>
      <Helmet>
        <title>The Loompaa Letter — E-Commerce Insight for D2C Founders</title>
        <meta name="description" content="One sharp insight every Tuesday. No fluff. Just signal." />
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
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <Pill variant="default">THE LOOMPAA LETTER</Pill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-sans font-bold text-display-xl text-ink leading-[0.95] tracking-[-0.03em] max-w-4xl mx-auto"
          >
            News &amp; <em className="font-display not-italic italic text-tangerine">articles.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-8 text-ink-sec text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            One sharp insight every Tuesday. No fluff. No listicles. Just signal — written by operators inside the brands we work with.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        {loading ? (
          <div className="text-ink-sec py-16 text-center">Loading posts…</div>
        ) : posts.length === 0 ? (
          <div className="text-ink-sec py-16 text-center">No posts yet.</div>
        ) : (
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
              {featured && (
                <RevealOnScroll>
                  <PostCard
                    post={featured}
                    categoryColor={colorBySlug[featured.category] || '#FF6B2C'}
                    size="lg"
                  />
                </RevealOnScroll>
              )}

              {rest.length > 0 && (
                <p className="font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-tri pt-4 border-t border-subtle">
                  What's popular now
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {rest.map((p, i) => (
                  <RevealOnScroll key={p.slug} delay={i * 0.06}>
                    <PostCard post={p} categoryColor={colorBySlug[p.category] || 'var(--color-brand)'} />
                  </RevealOnScroll>
                ))}
              </div>

              {meta.pages > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                  {Array.from({ length: meta.pages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`h-10 w-10 rounded-full font-mono text-sm transition-all duration-300 ${
                        n === page
                          ? 'bg-ink text-ink-inverse shadow-md shadow-ink/10'
                          : 'bg-elevated text-ink-sec border border-subtle hover:border-ink hover:text-ink'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="col-span-12 lg:col-span-4 space-y-6">
              <SubscribeBlock source="blog-sidebar" sticky />
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

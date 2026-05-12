import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import api, { unwrap } from '../../lib/api.js';
import PostCard from '../../components/blog/PostCard.jsx';
import SubscribeBlock from '../../components/blog/SubscribeBlock.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import NotFound from './NotFound.jsx';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const categories = useSiteStore((s) => s.categories);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    unwrap(api.get(`/posts/${slug}`))
      .then((d) => {
        if (cancelled) return;
        setData(d);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('not-found'));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'not-found') return <NotFound />;
  if (status === 'loading' || !data) {
    return <div className="max-w-7xl mx-auto px-6 md:px-10 py-40 text-ink-sec">Loading…</div>;
  }

  const { post, related = [] } = data;
  const categoryColor =
    categories.find((c) => c.slug === post.category)?.color || '#FF6B2C';

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author?.name || 'Loompaa' },
    publisher: { '@type': 'Organization', name: 'Loompaa' },
  };

  return (
    <>
      <Helmet>
        <title>{post.meta?.title || `${post.title} | The Loompaa Letter`}</title>
        <meta name="description" content={post.meta?.description || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.cover?.url && <meta property="og:image" content={post.cover.url} />}
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <article className="max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-24 md:pb-32">
        <nav className="text-xs text-ink-tri font-mono uppercase tracking-wider flex items-center gap-2 mb-10">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/blog" className="hover:text-ink transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: categoryColor }}>{post.category}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-8">
            <header className="mb-10">
              <span
                className="inline-flex items-center rounded-pill px-3 py-1.5 font-mono uppercase tracking-[0.18em] text-[10px] mb-6"
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                }}
              >
                {post.category}
              </span>
              <h1 className="font-sans font-bold text-display-md text-ink leading-[1.05] tracking-[-0.02em]">
                {post.title}
              </h1>
              <p className="mt-6 text-ink-sec text-lg md:text-xl leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-tri">
                <span className="text-ink">{post.author?.name || 'Loompaa'}</span>
                <span>·</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readTimeMinutes || 1} min read</span>
              </div>
            </header>

            {post.cover?.url && (
              <div className="aspect-[16/9] rounded-card overflow-hidden bg-elevated mb-12">
                <img
                  src={post.cover.url}
                  alt={post.cover.alt || ''}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose-loompaa text-ink-sec text-base md:text-lg leading-relaxed space-y-6 max-w-prose [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {post.author?.bio && (
              <div className="mt-16 pt-8 border-t border-subtle flex items-start gap-4">
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="h-12 w-12 rounded-full bg-tangerine/15 text-tangerine font-mono text-sm flex items-center justify-center">
                    {(post.author.name || 'L').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div>
                  <div className="text-sm font-medium text-ink">{post.author.name}</div>
                  <p className="mt-1 text-sm text-ink-sec leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            )}
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SubscribeBlock source="blog-post" sticky />
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-elevated/40 border-t border-subtle">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">
              Keep reading.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {related.map((p, i) => (
                <RevealOnScroll key={p.slug} delay={i * 0.06}>
                  <PostCard
                    post={p}
                    categoryColor={
                      categories.find((c) => c.slug === p.category)?.color || '#FF6B2C'
                    }
                  />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

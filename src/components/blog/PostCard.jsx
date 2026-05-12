import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function PostCard({ post, categoryColor = '#FF6B2C', size = 'md' }) {
  const isLarge = size === 'lg';
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block h-full rounded-card border border-subtle bg-elevated overflow-hidden transition-all duration-300 hover:border-tangerine hover:-translate-y-1"
    >
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-base`}>
        {post.cover?.url ? (
          <img
            src={post.cover.url}
            alt={post.cover.alt || ''}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at top right, ${categoryColor}30 0%, transparent 60%), linear-gradient(135deg, var(--bg-elevated), var(--bg-base))`,
            }}
          />
        )}
        <span
          className="absolute top-4 left-4 inline-flex items-center rounded-pill px-3 py-1.5 font-mono uppercase tracking-[0.18em] text-[10px]"
          style={{
            background: `${categoryColor}20`,
            color: categoryColor,
            border: `1px solid ${categoryColor}40`,
          }}
        >
          {post.category}
        </span>
        <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-ink-tri group-hover:text-tangerine transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className={isLarge ? 'p-7 md:p-9' : 'p-5 md:p-6'}>
        <h3
          className={`font-semibold text-ink leading-snug line-clamp-2 group-hover:text-tangerine transition-colors ${
            isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-3 text-ink-sec leading-relaxed line-clamp-${isLarge ? '3' : '2'} ${
            isLarge ? 'text-base md:text-lg' : 'text-sm'
          }`}
        >
          {post.excerpt}
        </p>
        <div className="mt-5 pt-4 border-t border-subtle flex items-center justify-between text-xs text-ink-tri">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTimeMinutes || 1} min read</span>
        </div>
      </div>
    </Link>
  );
}

import { motion, useReducedMotion } from 'framer-motion';

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
  className = '',
  as: Tag = 'div',
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

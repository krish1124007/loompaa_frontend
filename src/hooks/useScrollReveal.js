import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — global GSAP scroll animations
 * Call once in App or PublicLayout.
 * Automatically targets elements with data-gsap-* attributes.
 */
export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Fade up (default reveal) ── */
      gsap.utils.toArray('[data-gsap="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      /* ── Stagger children ── */
      gsap.utils.toArray('[data-gsap="stagger"]').forEach((parent) => {
        const children = parent.children;
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      /* ── Horizontal slide in ── */
      gsap.utils.toArray('[data-gsap="slide-right"]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          },
        );
      });

      /* ── Scale in ── */
      gsap.utils.toArray('[data-gsap="scale-in"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          },
        );
      });

      /* ── Background colour sweep on scroll ── */
      gsap.utils.toArray('[data-gsap="bg-sweep"]').forEach((section) => {
        const fromColor = section.dataset.colorFrom || 'transparent';
        const toColor   = section.dataset.colorTo   || 'rgba(255,107,44,0.04)';
        gsap.fromTo(
          section,
          { backgroundColor: fromColor },
          {
            backgroundColor: toColor,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1.5,
            },
          },
        );
      });

    });

    return () => ctx.revert();
  }, []);
}

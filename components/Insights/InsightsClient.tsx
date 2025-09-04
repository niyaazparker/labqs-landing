'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Insights.module.scss';

export type Kind = 'article' | 'podcast';
export type Card = {
  kind: Kind;
  title: string;
  excerpt: string;
  date: string;
  cta: string;
  href?: string;
};

export default function ClientInsights({
  cards,
  className = '',
}: {
  cards: Card[];
  className?: string;
}) {
  const [index, setIndex] = useState(0); // first visible slide
  const [perView, setPerView] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  // responsive per-view
  useEffect(() => {
    const set = () =>
      setPerView(window.matchMedia('(max-width: 900px)').matches ? 1 : 3);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const maxIndex = Math.max(0, (cards?.length ?? 0) - perView);
  const clamp = (v: number) => Math.min(maxIndex, Math.max(0, v));
  const prev = () => setIndex((i) => clamp(i - 1));
  const next = () => setIndex((i) => clamp(i + 1));
  const go = (i: number) => setIndex(clamp(i));

  const translatePct = -(100 / perView) * index;

  return (
    <section id="media" className={`${styles.wrap} ${className}`} aria-labelledby="insights-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <p className={styles.kicker}>Media</p>
            <h2 id="insights-title" className={styles.title}>Insights and Voices</h2>
            <a href="#media-all" className={styles.viewAll}>
              <span className={styles.viewLabel}>View all</span>
              <span className={styles.viewArrow} aria-hidden />
            </a>
          </div>

          {/* slider */}
          <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label="Insights">
            <div
              className={styles.track}
              style={{ transform: `translateX(${translatePct}%)` }}
              ref={trackRef}
            >
              {(cards ?? []).map((c, i) => (
                <article className={styles.card} key={`${c.title}-${i}`} aria-roledescription="slide">
                  <div className={styles.badge} data-kind={c.kind}>
                    {c.kind === 'article' ? 'Article' : 'Podcast'}
                  </div>

                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.excerpt}>{c.excerpt}</p>
                  <time className={styles.date}>{c.date}</time>

                  <div className={styles.metaRow}>
                    <a href={c.href ?? '#'} className={styles.cta} aria-label={c.cta}>
                      <span className={styles.ctaLabel}>{c.cta}</span>
                      <span className={styles.ctaArrow} aria-hidden />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* nav */}
            <div className={styles.nav}>
              <button className={styles.arrowBtn} aria-label="Previous" onClick={prev} disabled={index === 0}>
                <img src="/icons/slide-left.svg" alt="" width="52" height="52" />
              </button>

              <div className={styles.dots} role="tablist" aria-label="Slides">
                {Array.from({ length: Math.max(1, (cards?.length ?? 0) - perView + 1) }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to ${i + 1}`}
                    aria-selected={i === index}
                    className={i === index ? styles.dotActive : styles.dot}
                    onClick={() => go(i)}
                  />
                ))}
              </div>

              <button
                className={styles.arrowBtn}
                aria-label="Next"
                onClick={next}
                disabled={index === maxIndex}
              >
                <img src="/icons/slide-right.svg" alt="" width="52" height="52" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

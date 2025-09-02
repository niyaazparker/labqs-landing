'use client';
import styles from './AboutStats.module.scss';

type Stat = {
  headline: string;
  accent?: string;
  blurb: string;
};

const STATS: Stat[] = [
  { headline: '~$1.7bn', accent: 'AUM', blurb: 'in our fully deployed multi-strategy hedge fund' },
  { headline: '10+ years', blurb: "of value creation for one of the world's wealthiest families" },
  { headline: '25+ person', blurb: 'team of experienced investment and business professionals' },
  { headline: '150+', blurb: 'Markets traded globally with cross-asset class capabilities' },
];

export default function AboutStats() {
  return (
    <section id="about" className={styles.wrap} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.grid}>
          {/* LEFT: About copy card */}
          <div className={styles.left}>
            <p className={styles.kicker}>About</p>
            <h2 id="about-title" className={styles.title}>
              Portable alpha<br />specialists
            </h2>

            <p className={styles.lead}>
              <strong>LAB QS is a risk-first, liquid strategies spinout from one of the
              world’s largest family offices.</strong>
            </p>
            <p>
              Our distinct multi-strategy platform is built on the belief that separating alpha
              generation from market exposure is the most efficient and scalable method for
              maximizing return per unit of risk over the long-term.
            </p>

            <a href="#story" className={styles.storyLink} aria-label="Read the LAB QS story">
              <span className={styles.storyLabel}>The LAB QS story</span>
              <span className={styles.storyArrow} aria-hidden />
            </a>
          </div>

          {/* RIGHT: Stats panel */}
          <aside className={styles.right} aria-label="Firm statistics">
            <div className={styles.panel}>
              {STATS.map((s, i) => (
                <div className={styles.stat} key={i}>
                  <h3 className={styles.h}>
                    <span className={styles.hMain}>{s.headline}</span>
                    {s.accent ? <span className={styles.hAccent}>{s.accent}</span> : null}
                  </h3>

                  {/* NEW: mobile-only centered connector */}
                  <i className={styles.conn} aria-hidden />

                  <p className={styles.blurb}>{s.blurb}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

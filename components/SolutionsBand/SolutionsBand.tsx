'use client';
import { useEffect, useRef } from 'react';
import styles from './SolutionsBand.module.scss';

export default function SolutionsBand() {
  const rootRef = useRef<HTMLElement>(null);

  // Sync our left/right seam with the anchor above
  useEffect(() => {
    const setSplitFromAnchor = () => {
      const root = rootRef.current;
      if (!root) return;

      // mobile? force 100%
      if (window.matchMedia('(max-width: 768px)').matches) {
        root.style.setProperty('--split', '100%');
        return;
      }

      const anchor = document.querySelector('[data-seam-anchor]') as HTMLElement | null;
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const pageX = rect.left + window.scrollX;
        root.style.setProperty('--split', `${Math.round(pageX)}px`);
      } else {
        root.style.setProperty('--split', '52.5%'); // fallback
      }
    };

    setSplitFromAnchor();
    window.addEventListener('resize', setSplitFromAnchor);
    window.addEventListener('orientationchange', setSplitFromAnchor);
    return () => {
      window.removeEventListener('resize', setSplitFromAnchor);
      window.removeEventListener('orientationchange', setSplitFromAnchor);
    };
  }, []);

  return (
    <section ref={rootRef} id="solutions" className={styles.wrap} aria-labelledby="solutions-title">
      {/* Background + tones (desktop left/right; mobile becomes top band) */}
      <div className={styles.bg} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-desktop.png"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        >
          <source src="/assets/labqs-landing-vid2.mp4" type="video/mp4" />
        </video>

        <i className={styles.leftTone} />
        <i className={styles.rightTone} />
        <i className={styles.overlayLeft} />
        <i className={styles.seam} />
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Left panel */}
          <div className={styles.left}>
            <div className={styles.leftInner}>
              <p className={styles.kicker}>Solutions</p>
              <h2 id="solutions-title" className={styles.title}>
                Manage risk.<br />Stay invested.
              </h2>

              <a href="#media" className={styles.cta} aria-label="Explore our solutions">
                <span className={styles.ctaLabel}>Explore our solutions</span>
                <span className={styles.ctaArrow} aria-hidden />
              </a>
            </div>
          </div>

          {/* Right copy */}
          <div className={styles.right}>
            <p>
              <strong>
                Separating alpha and beta exposures offers enhanced returns, diversification, and
                flexibility while maintaining core allocations and controlling market risk.
              </strong>
            </p>
            <p>
              By limiting volatility and drawdowns on an absolute or relative basis, we aim to
              deliver more stable outcomes that enable our investors to stay invested through full
              market cycles, creating value at moments when it is often destroyed.
            </p>
            <p>
              Our solutions are liquid, scalable, tax-efficient, and customized to the absolute or
              relative return objectives of our investors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import styles from './SolutionsBand.module.scss';

export default function SolutionsBand() {
  const rootRef = useRef<HTMLElement>(null);

  // Auto-sync our split with the band above
  useEffect(() => {
    const setSplitFromAnchor = () => {
      const root = rootRef.current;
      if (!root) return;

      // Find the seam anchor in the section above
      const anchor = document.querySelector('[data-seam-anchor]') as HTMLElement | null;

      if (anchor) {
        // Convert anchor's left edge to a page X (px), then set as our --split
        const rect = anchor.getBoundingClientRect();
        const pageX = rect.left + window.scrollX; // px from page left
        root.style.setProperty('--split', `${Math.round(pageX)}px`);
      } else {
        // Fallback (tweak if you like)
        root.style.setProperty('--split', '52.52%');
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
      {/* Background layer */}
      <div className={styles.bg}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-desktop.png"
          aria-hidden
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        >
          <source src="/assets/labqs-landing-vid2.webm" type="video/webm" />
          <source src="/assets/labqs-landing-vid2.mp4" type="video/mp4" />
        </video>

        {/* Left/right tones + seam (all driven by --split) */}
        <i className={styles.leftTone} aria-hidden />
        <i className={styles.rightTone} aria-hidden />
        <i className={styles.overlayLeft} aria-hidden /> {/* subtle vignette on left only */}
        <i className={styles.seam} aria-hidden />
      </div>

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.explorecontainer}>
            <p className={styles.kicker}>Solutions</p>
            <h2 id="solutions-title" className={styles.title}>
              Manage risk.<br />Stay invested.
            </h2>
            <div className={styles.explorebtn}>
              <a href="#media" className={styles.cta} aria-label="Explore our solutions">
                <span className={styles.ctaLabel}>Explore our solutions</span>
                <span className={styles.ctaArrow} aria-hidden />
              </a>
            </div>
            </div>
          </div>

          <div className={styles.right}>
            <p><strong>
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

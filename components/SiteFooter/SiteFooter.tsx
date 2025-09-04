'use client';

import styles from './SiteFooter.module.scss';

export default function SiteFooter() {
  return (
    <footer className={styles.wrap} role="contentinfo">
      <div className={styles.bg} aria-hidden />

      <div className="container">
        <div className={styles.row}>
          {/* Left: copyright */}
          <small className={styles.copy}>
            © LAB Quantitative Strategies – All rights reserved
          </small>

          {/* Center: medallion/logo */}
          <div className={styles.logo} aria-hidden>
            <img src="/icons/footerlogo.svg" alt="" />
          </div>

          {/* Right: disclaimers CTA */}
          <a className={styles.cta} href="/disclaimers">
            <span className={styles.ctaLabel}>Disclaimers</span>
            <span className={styles.ctaIcon} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

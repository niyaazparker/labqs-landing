'use client';

import styles from './SiteFooter.module.scss';

export default function SiteFooter() {
  return (
    <footer className={styles.wrap} role="contentinfo">
      <div className={styles.bg} aria-hidden />

      <div className="container">
        {/* center medallion */}
        <div className={styles.medallion} aria-hidden />

        <div className={styles.row}>
          <small className={styles.copy}>
            © LAB Quantitative Strategies — All rights reserved
          </small>

          <a className={styles.disclaimer} href="/disclaimers">
            <span>Disclaimers</span>
            <i className={styles.dot} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

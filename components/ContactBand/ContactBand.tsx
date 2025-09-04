'use client';

import styles from './ContactBand.module.scss';

export default function ContactBand() {
  return (
    <section id="contact" className={styles.wrap} aria-labelledby="contact-title">
      {/* Background video + tint */}
      <div className={styles.bg} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/contact-bg-fallback.PNG"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        >
          {/* <source src="/assets/labqs-landing-vid3.webm" type="video/webm" /> */}
          <source src="/assets/labqs-landing-vid3.mp4" type="video/mp4" />
        </video>
        <i className={styles.tint} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Title */}
        <h2 id="contact-title" className={styles.title}>Contact Us</h2>

        {/* Grid */}
        <div className={styles.grid}>
          {/* LEFT: address */}
          <div className={styles.info} role="complementary" aria-label="Office details">
            <address className={styles.address}>
              <div>1401 Lawrence St, Suite 1910 | Denver, CO 80202</div>
              <div>303-932-0700</div>
              <a href="mailto:info@lab-qs.com">info@lab-qs.com</a>
            </address>
          </div>

          {/* RIGHT: form */}
          <div className={styles.right}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit
              }}
            >
              <div className={styles.field}>
                <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Name" />
              </div>

              <div className={styles.field}>
                <input id="c-email" name="email" type="email" autoComplete="email" placeholder="Email" />
              </div>

              <div className={styles.field}>
                <textarea id="c-message" name="message" rows={5} placeholder="Message" />
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.cta}>
                  <span className={styles.ctaLabel}>Submit Message</span>
                  <span className={styles.ctaArrow} aria-hidden />
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Back to top */}
        <div className={styles.backRow}>
          <a href="#top" className={styles.backTop}>
            Back to top <span className={styles.chev} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

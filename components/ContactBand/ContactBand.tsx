'use client';

import styles from './ContactBand.module.scss';

export default function ContactBand() {
  return (
    <section id="contact" className={styles.wrap} aria-labelledby="contact-title">
      {/* background video */}
      <div className={styles.bg} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/contact-bg-fallback.jpg"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        >
          {/* add a webm if you have it */}
          {/* <source src="/assets/labqs-landing-vid3.webm" type="video/webm" /> */}
          <source src="/assets/labqs-landing-vid3.mp4" type="video/mp4" />
        </video>
        <i className={styles.tint} />
      </div>

      <div className={`container ${styles.content}`}>
        <h2 id="contact-title" className={styles.title}>Contact Us</h2>

        <div className={styles.grid}>
          <div className={styles.info} role="complementary" aria-label="Office details">
            <address className={styles.address}>
              <div>1401 Lawrence St, Suite 1910</div>
              <div>Denver, CO 80202</div>
              <div>303-932-0700</div>
              <a href="mailto:info@lab-qs.com">info@lab-qs.com</a>
            </address>
          </div>

          {/* RIGHT */}
                <div className={styles.right}>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); /* TODO: submit */ }}>
                    <div className={styles.field}>
                    <input id="c-name" name="name" type="text" autoComplete="name" placeholder='name' />
                    </div>

                    <div className={styles.field}>
                    <input id="c-email" name="email" type="email" autoComplete="email" placeholder='email' />
                    </div>

                    <div className={styles.field}>
                    <textarea id="c-message" name="message" rows={5} placeholder='message' />
                    </div>

                    <div className={styles.actions}>
                    <button type="submit" className={styles.submit}>
                        <span>Submit Message</span>
                        <span className={styles.submitIcon} aria-hidden />
                    </button>
                    </div>
                </form>
                </div>


        </div>
      </div>
    </section>
  );
}

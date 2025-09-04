'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';

export default function Hero() {
  const motionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const raf = useRef<number | null>(null);

  // smoothed mouse target
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const heroEl = heroRef.current!;
    const motionEl = motionRef.current!;
    if (!heroEl || !motionEl) return;

    // respect reduced motion + only run on pointer: fine/hover devices
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReduced || !canHover) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.085);
      current.current.y = lerp(current.current.y, target.current.y, 0.085);

      // translate & tilt amounts (tweak to taste)
      const tx = current.current.x * 12;           // px
      const ty = current.current.y * 8;            // px
      const rx = -current.current.y * 3;           // deg
      const ry =  current.current.x * 3;           // deg

      motionEl.style.transform =
        `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`;

      raf.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      // normalize to [-1, 1] inside hero bounds
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      // clamp a bit to avoid extreme edges
      target.current.x = Math.max(-1, Math.min(1, nx));
      target.current.y = Math.max(-1, Math.min(1, ny));
      if (raf.current == null) raf.current = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    heroEl.addEventListener('mousemove', onMove, { passive: true });
    heroEl.addEventListener('mouseleave', onLeave, { passive: true });

    // kick initial frame so transform takes effect
    raf.current = requestAnimationFrame(animate);

    return () => {
      heroEl.removeEventListener('mousemove', onMove);
      heroEl.removeEventListener('mouseleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  return (
    <header className={styles.hero} ref={heroRef}>
      {/* Motion group: video + texture + vignette all move/tilt together */}
      <div className={styles.bg}>
        <div className={styles.motion} ref={motionRef}>

          <video
            className={styles.bgVideo}
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
            <source src="/assets/labqs-landing-vid1.mp4"  type="video/mp4" />
          </video>

          {/* Your rotated PNG “filter” overlay */}
          <Image
            src="/images/hero-desktop.png"
            alt=""
            fill
            priority
            className={styles.textureImg}
          />

          <i className={styles.vignette} aria-hidden />
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          <h1 className={styles.title}>
            Innovating at the intersection of <span className={styles.nbsp}>alpha</span> &amp; <span className={styles.nbsp}>beta</span>
          </h1>

          <div className={styles.copy}>
            <p>
              LAB Quantitative Strategies (LAB QS) aims to combine diverse sources of
              alpha with capital-efficient beta to consistently achieve absolute or
              relative return objectives.
            </p>
            <a href="#about" className={styles.learnMore} aria-label="Learn more about LAB QS">
                <span className={styles.label}>Learn more</span>
                <span className={styles.arrow} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.watermark} aria-hidden>LAB</div>
    </header>
  );
}

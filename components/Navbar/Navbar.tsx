'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.scss';

type MenuKey = 'about' | 'solutions' | null;

export default function Navbar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);
  const solutionsRef = useRef<HTMLLIElement>(null);

  const lastY = useRef(0);
  const [revealed, setRevealed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null); // desktop mega
  const [mobileOpen, setMobileOpen] = useState(false);     // mobile overlay
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hide-on-scroll logic
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 16);
      const goingUp = y < lastY.current;
      setRevealed(goingUp || y < 80);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // align desktop dropdown to hovered link
  const setMenuOffset = (key: MenuKey) => {
    const wrapEl = wrapRef.current;
    const navEl = navRef.current;
    if (!wrapEl || !navEl || !key) return;

    const li =
      key === 'about' ? aboutRef.current :
      key === 'solutions' ? solutionsRef.current : null;
    if (!li) return;

    const target = (li.querySelector('button, a') as HTMLElement) || li;
    const navBox = navEl.getBoundingClientRect();
    const linkBox = target.getBoundingClientRect();
    const padL = parseFloat(getComputedStyle(navEl).paddingLeft || '0');
    const navInnerLeft = navBox.left + padL;
    const offset = Math.max(0, Math.round(linkBox.left - navInnerLeft));
    wrapEl.style.setProperty('--menu-offset', `${offset}px`);
  };

  useEffect(() => {
    const onResize = () => openMenu && setMenuOffset(openMenu);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [openMenu]);

  const open = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
    setMenuOffset(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      wrapRef.current?.style.setProperty('--menu-offset', '0px');
    }, 120);
  };
  const cancelClose = () => closeTimer.current && clearTimeout(closeTimer.current);

  const wrapCls =
    styles.wrap +
    (scrolled ? ' ' + styles.scrolled : '') +
    (revealed ? ' ' + styles.revealed : ' ' + styles.hidden) +
    ((openMenu || mobileOpen) ? ' ' + styles.megaOpen : '');

  const toggleMobile = () => setMobileOpen(v => !v);
  const closeMobile = () => setMobileOpen(false);
  const handleMobileLinkClick = () => setMobileOpen(false);

  return (
    <div className={wrapCls} ref={wrapRef}>
      <nav
        className={styles.nav}
        aria-label="Primary"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
        ref={navRef as any}
      >
        <Link href="#" className={styles.brand} aria-label="LABQS home">
          <Image src="/images/logo.svg" alt="" width={187} height={36} priority />
        </Link>

        <div className={styles.spacer} />

        {/* Mobile toggle (uses SVG icons) */}
        <button
          className={styles.mobileToggle}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <Image
            src={mobileOpen ? '/icons/close.svg' : '/icons/hamburger.svg'}
            alt=""
            width={18}
            height={18}
            priority
          />
        </button>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li
            className={styles.hasDropdown}
            onMouseEnter={() => open('about')}
            onFocus={() => open('about')}
            ref={aboutRef}
          >
            <button
              className={styles.toplink}
              aria-haspopup="true"
              aria-expanded={openMenu === 'about'}
            >
              <span className={styles.toptext}>About</span>
              <span className={styles.chev} aria-hidden />
            </button>
          </li>

          <li
            className={styles.hasDropdown}
            onMouseEnter={() => open('solutions')}
            onFocus={() => open('solutions')}
            ref={solutionsRef}
          >
            <button
              className={styles.toplink}
              aria-haspopup="true"
              aria-expanded={openMenu === 'solutions'}
            >
              <span className={styles.toptext}>Solutions</span>
              <span className={styles.chev} aria-hidden />
            </button>
          </li>

          <li><Link href="#media">Media</Link></li>
          <li><Link href="#faq">FAQ</Link></li>
          <li><Link href="#contact">Contact</Link></li>
          <li><Link href="#investor" className="btn">Investor portal</Link></li>
        </ul>
      </nav>

      {/* Desktop mega dropdown */}
      <div
        className={`${styles.dropdown} ${openMenu ? styles.open : ''}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        aria-hidden={!openMenu}
      >
        <div className={styles.dropdownInner}>
          <div className={styles.menuGrid}>
            {openMenu === 'about' && (
              <>
                <ul>
                  <li><a href="#">LAB QS Story</a></li>
                  <li><a href="#">Timeline</a></li>
                  <li><a href="#">Platform</a></li>
                  <li><a href="#">Leadership</a></li>
                </ul>
                <ul>
                  <li><a href="#">About our solutions</a></li>
                  <li><a href="#">Why portable alpha</a></li>
                  <li><a href="#">Why LAB QS</a></li>
                  <li><a href="#">Products</a></li>
                </ul>
              </>
            )}
            {openMenu === 'solutions' && (
              <>
                <ul>
                  <li><a href="#">Multi-strategy</a></li>
                  <li><a href="#">Systematic macro</a></li>
                  <li><a href="#">Quant equities</a></li>
                </ul>
                <ul>
                  <li><a href="#">Risk solutions</a></li>
                  <li><a href="#">Research & insights</a></li>
                  <li><a href="#">Client onboarding</a></li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <button
          className={styles.mobileClose}
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <Image src="/icons/close.svg" alt="" width={18} height={18} priority />
        </button>

        <div className={styles.mobileWatermark} aria-hidden>LAB</div>

        <ul className={styles.mobileList}>
          <li><a href="#" onClick={handleMobileLinkClick}>HOME</a></li>
          <li><a href="#" onClick={handleMobileLinkClick}>ABOUT</a></li>
          <li><a href="#" onClick={handleMobileLinkClick}>SOLUTIONS</a></li>
          <li><a href="#" onClick={handleMobileLinkClick}>MEDIA</a></li>
          <li><a href="#" onClick={handleMobileLinkClick}>FAQ</a></li>
          <li><a href="#" onClick={handleMobileLinkClick}>CONTACT</a></li>
          <li><a href="#" className={styles.investor} onClick={handleMobileLinkClick}>INVESTOR PORTAL</a></li>
        </ul>
      </div>
    </div>
  );
}

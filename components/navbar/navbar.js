import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
  const kartCount = useSelector((state) => state.counter.value);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.dummyContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>
        <div className={styles.navbarTitle}>
          <h1>Jay Amba Events</h1>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        <ul
          className={`${styles.navbarMenu} ${
            mobileMenuOpen ? styles.mobileOpen : ""
          }`}
        >
          <li>
            <Link href="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={closeMobileMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/shopping" onClick={closeMobileMenu}>
              Shopping
            </Link>
          </li>
          <li>
            <Link href="/gallery" onClick={closeMobileMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className={styles.kart}>
            {kartCount > 0 && (
              <div className={styles.kart__kartCount}>{kartCount}</div>
            )}
            <Link href="/kart" onClick={closeMobileMenu}>
              Kart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

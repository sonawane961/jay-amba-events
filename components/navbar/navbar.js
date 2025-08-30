import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Navbar = () => {
  const cartCount = useSelector((state) => state.counter.value);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.dummyContainer}>
      <nav className={styles.navbar}>
        <div
          className={styles.navbarLogo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
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
              Events
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
          <li className={styles.cart}>
            {cartCount > 0 && (
              <div className={styles.cart__cartCount}>{cartCount}</div>
            )}
            <Link href="/cart" onClick={closeMobileMenu}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

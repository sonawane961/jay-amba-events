import React from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import Icon from "../icon/icon";

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.navbarTitle}>
        <h1>Jay Amba Event and Balloon Decorations</h1>
      </div>
      <ul className={styles.navbarMenu}>
        <li>
          <a onClick={() => handleNavigation("/")}>Home</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/services")}>Services</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/events")}>Events</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/reviews")}>Client Reviews</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/packages")}>packages</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/gallery")}>gallery</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/contact")}>Contact Us</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/kart")}>
            <Icon iconName={"ShoppingKart"} /> Kart
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

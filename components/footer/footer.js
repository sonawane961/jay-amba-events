import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo and Brief */}
        <div className={styles.brandSection}>
          <h2>JAY AMBA EVENTS & DECORATORS</h2>
          <p>
            Crafting unforgettable memories with elegance and precision. Let us
            bring your dream event to life!
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Our Services</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h3>Contact Us</h3>
          <p>Jay Amba Decorators, Vaijapur</p>
          <p>Email: sonawanedattu2001@gmail.com</p>
          <p>Phone: +91 9529366493 </p>
        </div>

        {/* Social Media */}
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/jay_amba_decoraters_vaijapur/">
              <FaInstagram />
            </a>
            <a href="https://twitter.com">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className={styles.newsletter}>
        <h3>Subscribe to our Newsletter</h3>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} JAY AMBA EVENTS. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

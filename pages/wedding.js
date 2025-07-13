import Image from "next/image";
import styles from "./../styles/wedding.module.scss";
import { useEffect, useState } from "react";

const WeddingPage = () => {
  const [images, setImages] = useState();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/getweddingimg");
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchImages();
  }, []);
  useEffect(() => {
    console.log("images fetched from the mongo server", images);
  }, images);
  const [imageArray, setImageArray] = useState([
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_1.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_2.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_3.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_4.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_5.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_6.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_7.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_8.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_9.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_10.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_11.jpg",
    "https://res.cloudinary.com/dllijcdic/image/upload/v1734540053/wedding/wedding_12.jpg",
  ]);
  return (
    <div className={styles.weddingPage}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Your Dream Wedding Starts Here</h1>
          <p>
            Let us help you create unforgettable memories on your special day.
          </p>
          <button className={styles.ctaButton}>Start Planning</button>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>About Our Wedding Services</h2>
        <p>
          We offer a range of personalized wedding planning services to make
          your day magical. From venue selection to final touches, we handle
          everything so you can focus on cherishing every moment.
        </p>
      </section>

      <section className={styles.packagesSection}>
        <h2>Wedding Packages</h2>
        <div className={styles.packages}>
          <div className={styles.packageCard}>
            <h3>Basic Package</h3>
            <p>Includes venue, and decor.</p>
            <button>View Details</button>
          </div>
          <div className={styles.packageCard}>
            <h3>Premium Package</h3>
            <p>Includes photography, venue, catering, and decor.</p>
            <button>View Details</button>
          </div>
          <div className={styles.packageCard}>
            <h3>Luxury Package</h3>
            <p>All-inclusive package with custom options.</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2>Gallery</h2>
        <div className={styles.gallery}>
          {images?.map((imageSrc) => {
            return (
              <Image
                src={imageSrc.url}
                alt="Wedding 1"
                width={300}
                height={200}
              />
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2>What Our Clients Say</h2>
        <div className={styles.testimonial}>
          <p>"An unforgettable experience! The team was incredible."</p>
          <h4>- Emily & James</h4>
        </div>
        <div className={styles.testimonial}>
          <p>"They made our wedding day perfect! Highly recommend."</p>
          <h4>- Sarah & Alex</h4>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="date" placeholder="Wedding Date" />
          <textarea placeholder="Message" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default WeddingPage;

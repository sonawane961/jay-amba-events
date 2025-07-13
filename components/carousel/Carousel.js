import { useEffect, useRef } from "react";
import styles from "./Carousel.module.scss";

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    let interval;

    const startCarousel = () => {
      interval = setInterval(() => {
        currentIndexRef.current++;
        if (currentIndexRef.current >= images.length) {
          currentIndexRef.current = 0;
        }
        carousel.style.transition = "transform 1s ease-in-out"; // 1 second smooth scroll
        carousel.style.transform = `translateX(-${
          currentIndexRef.current * 100
        }%)`;
      }, 5000); // 5 seconds delay
    };

    startCarousel();

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className={styles.carouselContainer}>
        <div className={styles.carousel} ref={carouselRef}>
          {images.map((src, index) => (
            <div className={styles.carouselItem} key={index}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles.infoText}>
          <div className={styles.infoTextdiv}>
            <h2>Our Event Decoration Service</h2>
            <h1>Crafting Joy, One Event at a Time!</h1>
            {/* <p>
              Welcome to Jay Amba Event And decorations – where every event is a
              celebration of creativity and joy! With a passion for turning
              ordinary moments into extraordinary memories, we specialize in
              event management, balloon decorations, and much more. Whether it's
              a grand wedding, a corporate gala, or an intimate gathering, we
              bring your vision to life with meticulous planning, vibrant
              decorations, and a touch of magic.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;

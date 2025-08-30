import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Add a timeout to show carousel even if images don't load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, []);

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

    // Only start carousel when images are loaded
    if (imagesLoaded && images.length > 0) {
      startCarousel();
    }

    return () => clearInterval(interval);
  }, [images, imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const handleImageError = (index) => {
    console.error(`Failed to load image: ${images[index]}`);
    // If the first image fails, still show the carousel after a delay
    if (index === 0) {
      setTimeout(() => setImagesLoaded(true), 2000);
    }
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        {!imagesLoaded && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading carousel images...</p>
          </div>
        )}
        <div className={styles.carousel} ref={carouselRef}>
          {images.map((src, index) => (
            <div className={styles.carouselItem} key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                onLoad={index === 0 ? handleImageLoad : undefined}
                onError={() => handleImageError(index)}
                style={{ opacity: imagesLoaded ? 1 : 0 }}
              />
            </div>
          ))}
        </div>
        <div className={styles.infoText}>
          <div className={styles.infoTextdiv}>
            <h2>Our Event Decoration Service</h2>
            <h1>Crafting Joy!</h1>
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

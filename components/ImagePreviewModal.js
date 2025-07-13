import React, { useState, useEffect } from "react";
import styles from "./ImagePreviewModal.module.scss";

const ImagePreviewModal = ({ images, currentIndex, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex || 0);

  useEffect(() => {
    // Clamp the index if images array changes
    if (currentIndex >= images.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentIndex || 0);
    }
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !images.length) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.imageContainer}>
          <img
            src={images[currentImageIndex]?.url || images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className={styles.previewImage}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={prevImage}>
            ‹
          </button>
          <span className={styles.imageCounter}>
            {Math.min(currentImageIndex + 1, images.length)} / {images.length}
          </span>
          <button className={styles.navButton} onClick={nextImage}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;

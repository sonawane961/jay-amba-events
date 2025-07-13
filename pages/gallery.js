import React, { useState, useEffect } from "react";
import styles from "../styles/Gallery.module.css";
import ImagePreviewModal from "@/components/ImagePreviewModal";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { value: "all", label: "All Images" },
    { value: "ballod-decoration", label: "Balloon decoration" },
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate" },
    { value: "babyshower", label: "Baby Shower" },
    { value: "ganapati", label: "Ganapati" },
    { value: "anniversary", label: "Anniversary" },
    { value: "navaratri", label: "Navaratri" },
  ];

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getweddingimg");
      const data = await response.json();
      console.log(data);

      if (selectedCategory === "all") {
        setGalleryImages(data);
      } else {
        // Filter images based on selected category
        const filteredImages = data.filter(
          (img) => img.urlType?.toLowerCase() === selectedCategory
          // img.url?.toLowerCase().includes(selectedCategory)
        );
        setGalleryImages(filteredImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.galleryPage}>
      <h1 className={styles.heading}>Image Gallery</h1>

      <div className={styles.filterContainer}>
        <label htmlFor="categorySelect" className={styles.filterLabel}>
          Filter by Category:
        </label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categorySelect}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className={styles.loading}>Loading images...</div>}

      <div className={styles.galleryGrid}>
        {galleryImages?.map((img, idx) => (
          <div
            className={styles.galleryItem}
            key={idx}
            onClick={() => handleImageClick(idx)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={img.url || img}
              alt={`Gallery ${idx + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <ImagePreviewModal
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Gallery;

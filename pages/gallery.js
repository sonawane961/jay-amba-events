import React, { useState, useEffect } from "react";
import styles from "../styles/Gallery.module.css";
import ImagePreviewModal from "@/components/ImagePreviewModal";
// Simple cross icon as a component
const CrossIcon = ({ onClick }) => (
  <span
    style={{
      position: "absolute",
      top: 8,
      right: 8,
      background: "rgba(255,255,255,0.8)",
      borderRadius: "50%",
      padding: "2px 6px",
      cursor: "pointer",
      fontWeight: "bold",
      zIndex: 2,
      fontSize: 18,
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    }}
    title="Delete image"
    onClick={onClick}
  >
    ×
  </span>
);

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
    { value: "haldi", label: "Haldi" },
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

  const handleDeleteImage = async (img, idx) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    setLoading(true);
    try {
      const id = img._id || (img.id ? img.id : null);
      if (!id) throw new Error("Image id not found");
      const res = await fetch(`/api/getweddingimg?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Remove from UI
        setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete image");
      }
    } catch (err) {
      alert("Error deleting image");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            key={img._id || idx}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <CrossIcon
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteImage(img, idx);
              }}
            />
            <img
              src={img.url || img}
              alt={`Gallery ${idx + 1}`}
              className={styles.image}
              onClick={() => handleImageClick(idx)}
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

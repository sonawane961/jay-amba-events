import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Carousel from "@/components/carousel/Carousel";
import { useEffect, useState } from "react";
import Events from "@/components/events/events";
import Packagecard from "@/components/packageCard/packagecard";
import { useRouter } from "next/router";
import ImagePreviewModal from "@/components/ImagePreviewModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const packageData = [
    // {
    //   imageSrc: "packageimages/1.png",
    //   rating: 4,
    //   title: "Unicorn Naming Ceremony Theme",
    //   price: "129999/-",
    // },
    // {
    //   imageSrc: "packageimages/1.png",
    //   rating: 4,
    //   title: "Unicorn Naming Ceremony Theme",
    //   price: "129999/-",
    // },
    // {
    //   imageSrc: "packageimages/1.png",
    //   rating: 4,
    //   title: "Unicorn Naming Ceremony Theme",
    //   price: "129999/-",
    // },
    {
      imageSrc: "packageimages/baby_shower.png",
      rating: 4,
      title: "Baby Shower Theme",
      price: "12999/-",
    },
    {
      imageSrc: "packageimages/wedding.jpg",
      rating: 4,
      title: "Unicorn wedding Theme",
      price: "12999/-",
    },
    {
      imageSrc: "packageimages/bal.jpg",
      rating: 4,
      title: "balloon decoration Theme",
      price: "12999/-",
    },
    {
      imageSrc: "packageimages/birthday.jpg",
      rating: 4,
      title: "Birthday Theme",
      price: "12999/-",
    },
    // ... repeat or add more as needed
  ];

  const [carouselImageArray, setcarouselImageArray] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePackageCardAction = (action) => {
    console.log("ACTION", action);
  };
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push(`/carouselimages/${i}.jpg`);
    }
    setcarouselImageArray(arr);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getweddingimg");
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const routeToWeddingPage = () => {
    router.push("/wedding");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Carousel images={carouselImageArray} />
      <p className={styles.eventHeading}>Event Decorations We Offer</p>
      <div className={styles.eventcardsContainer}>
        <Events
          imageSrc={"/eventimages/wedding.png"}
          title={"WEDDING"}
          onClick={routeToWeddingPage}
        />
        <Events imageSrc={"/eventimages/birthday.png"} title={"Birthday"} />
        <Events imageSrc={"/eventimages/babyshower.png"} title={"Babyshower"} />
        <Events imageSrc={"/eventimages/ganapati.png"} title={"Ganapati"} />
        <Events imageSrc={"/eventimages/aniversary.jpg"} title={"Aniversary"} />
        <Events imageSrc={"/eventimages/navaratri.jpg"} title={"Navaratri"} />
      </div>
      <hr className={styles.grayLine} />
      <p className={styles.eventHeading}> Our Packages</p>
      {loading ? (
        <div style={{ textAlign: "center", padding: "32px" }}>
          Loading images...
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {galleryImages.slice(0, 8).map((img, idx) => (
            <div
              className={styles.galleryItem}
              key={idx}
              onClick={() => handleImageClick(idx)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={img.url}
                alt={`Gallery ${idx + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      )}

      <ImagePreviewModal
        images={galleryImages.slice(0, 8)}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

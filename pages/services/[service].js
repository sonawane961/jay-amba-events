import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/ServiceDetail.module.css";

const serviceData = {
  "event-planning-management": {
    title: "Event Planning & Management",
    images: ["/eventimages/birthday.png", "/eventimages/ganapati.png"],
    moment: "Seamless event experiences, from start to finish.",
    description:
      "Our expert team handles every detail, ensuring your event is stress-free and memorable. From concept to execution, we bring your vision to life with creativity and precision.",
  },
  "balloon-decorations": {
    title: "Balloon Decorations",
    images: ["/eventimages/babyshower.png"],
    moment: "Transforming spaces with color and joy.",
    description:
      "We create stunning balloon arrangements for all occasions. Whether it's arches, bouquets, or custom designs, our decorations add a festive touch to your celebration.",
  },
  "theme-parties": {
    title: "Theme Parties",
    images: ["/eventimages/navaratri.jpg"],
    moment: "Every party, a unique adventure.",
    description:
      "From superheroes to fairy tales, we design immersive theme parties that delight guests of all ages. Let us turn your ideas into a magical reality!",
  },
  "wedding-decor": {
    title: "Wedding Decor",
    images: ["/eventimages/wedding.png"],
    moment: "Making your special day unforgettable.",
    description:
      "Elegant, personalized wedding decorations that reflect your style and love story. We handle everything from floral arrangements to stage setups.",
  },
  "birthday-celebrations": {
    title: "Birthday Celebrations",
    images: ["/eventimages/birthday.png"],
    moment: "Birthdays made brighter.",
    description:
      "Celebrate another year with creative themes, fun games, and beautiful decor. We make birthdays joyful and hassle-free for all ages.",
  },
  "corporate-events": {
    title: "Corporate Events",
    images: ["/eventimages/ganapati.png"],
    moment: "Professional, polished, and impactful.",
    description:
      "From team-building to product launches, we organize corporate events that impress. Our attention to detail ensures your brand shines.",
  },
  "custom-packages": {
    title: "Custom Packages",
    images: ["/eventimages/aniversary.jpg"],
    moment: "Tailored to your dreams.",
    description:
      "No two events are the same. We offer custom packages to fit your needs, preferences, and budget. Let's create something extraordinary together!",
  },
};

const ServiceDetail = () => {
  const router = useRouter();
  const { service } = router.query;
  const data = serviceData[service];

  if (!data) {
    return <div className={styles.notFound}>Service not found.</div>;
  }

  return (
    <div className={styles.detailPage}>
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles.imagesRow}>
        {data.images.map((src, idx) => (
          <img key={idx} src={src} alt={data.title} className={styles.image} />
        ))}
      </div>
      <h2 className={styles.moment}>{data.moment}</h2>
      <p className={styles.description}>{data.description}</p>
    </div>
  );
};

export default ServiceDetail;

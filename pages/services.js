import React from "react";
import Link from "next/link";
import styles from "../styles/Services.module.css";

const services = [
  { name: "Event Planning & Management", slug: "event-planning-management" },
  { name: "Balloon Decorations", slug: "balloon-decorations" },
  { name: "Theme Parties", slug: "theme-parties" },
  { name: "Wedding Decor", slug: "wedding-decor" },
  { name: "Birthday Celebrations", slug: "birthday-celebrations" },
  { name: "Corporate Events", slug: "corporate-events" },
  { name: "Custom Packages", slug: "custom-packages" },
];

const Services = () => {
  return (
    <div className={styles.servicesPage}>
      <h1 className={styles.heading}>Our Services</h1>
      <ul className={styles.servicesList}>
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`}>{service.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;

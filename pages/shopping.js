import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/counterSlice";
import styles from "../styles/Shopping.module.css";

const Shopping = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const dispatch = useDispatch();

  const events = [
    { value: "", label: "Select Event Type" },
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate Event" },
    { value: "babyshower", label: "Baby Shower" },
    { value: "anniversary", label: "Anniversary" },
    { value: "ganapati", label: "Ganapati" },
    { value: "navaratri", label: "Navaratri" },
  ];

  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: "₹15,999",
      description:
        "Essential decorations and basic setup for intimate gatherings",
      features: [
        "Basic Balloon Decor",
        "Simple Backdrop",
        "Basic Lighting Setup",
        "4 Hours Setup Time",
        "Basic Photo Corner",
        "Standard Cleanup",
      ],
      image: "/packageimages/1.jpg",
      category: "basic",
    },
    {
      id: 2,
      name: "Wedding Special Package",
      price: "₹45,999",
      description:
        "Complete wedding decoration with premium elements and elegant themes",
      features: [
        "Premium Balloon Arch & Columns",
        "Custom Wedding Backdrop",
        "LED String Lights & Spotlights",
        "8 Hours Setup & Coordination",
        "Professional Photo Booth",
        "Wedding Stage Decoration",
        "Entrance Arch Design",
        "Complete Cleanup Service",
      ],
      image: "/packageimages/wedding.jpg",
      category: "wedding",
    },
    {
      id: 3,
      name: "Birthday Celebration Package",
      price: "₹25,999",
      description: "Vibrant and colorful birthday decorations with fun themes",
      features: [
        "Colorful Balloon Decorations",
        "Themed Backdrop Design",
        "Party Lighting Effects",
        "6 Hours Setup Time",
        "Birthday Photo Corner",
        "Balloon Bouquets",
        "Party Props & Accessories",
        "Basic Cleanup Included",
      ],
      image: "/packageimages/birthday.jpg",
      category: "birthday",
    },
    {
      id: 4,
      name: "Baby Shower Package",
      price: "₹22,999",
      description:
        "Adorable baby shower decorations with gender-specific themes",
      features: [
        "Baby Shower Balloon Arch",
        "Gender Reveal Decorations",
        "Soft Pastel Lighting",
        "5 Hours Setup Time",
        "Baby Shower Photo Booth",
        "Diaper Cake Display",
        "Baby Shower Games Setup",
        "Gentle Cleanup Service",
      ],
      image: "/packageimages/baby_shower.png",
      category: "babyshower",
    },
    {
      id: 5,
      name: "Premium Balloon Package",
      price: "₹35,999",
      description:
        "Advanced balloon artistry with custom designs and premium materials",
      features: [
        "Advanced Balloon Sculptures",
        "Custom Balloon Garlands",
        "Premium Balloon Materials",
        "7 Hours Professional Setup",
        "LED Balloon Lights",
        "Balloon Arch & Columns",
        "Custom Balloon Centerpieces",
        "Premium Cleanup Service",
      ],
      image: "/packageimages/bal.jpg",
      category: "balloon",
    },
    {
      id: 6,
      name: "Luxury Custom Package",
      price: "Contact Us",
      description:
        "Bespoke decoration services tailored to your specific vision and requirements",
      features: [
        "Custom Design Consultation",
        "Premium Materials Selection",
        "Flexible Setup Duration",
        "Personal Event Coordinator",
        "Custom Lighting Design",
        "Exclusive Photo Setup",
        "VIP Treatment",
        "Complete Event Management",
      ],
      image: "/packageimages/1.png",
      category: "custom",
    },
  ];

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  const handleAddToCart = (pkg) => {
    dispatch(addToCart(pkg));
    alert(`${pkg.name} added to cart!`);
  };

  // Filter packages based on selected event
  const filteredPackages = selectedEvent
    ? packages.filter(
        (pkg) =>
          pkg.category === selectedEvent ||
          pkg.category === "basic" ||
          pkg.category === "custom"
      )
    : packages;

  return (
    <div className={styles.shoppingPage}>
      <h1 className={styles.heading}>Choose Your Package</h1>

      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <label htmlFor="eventSelect" className={styles.filterLabel}>
            Select Event Type:
          </label>
          <select
            id="eventSelect"
            value={selectedEvent}
            onChange={handleEventChange}
            className={styles.eventSelect}
          >
            {events.map((event) => (
              <option key={event.value} value={event.value}>
                {event.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.packagesGrid}>
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className={styles.packageCard}>
            <div className={styles.packageImage}>
              <img src={pkg.image} alt={pkg.name} />
            </div>
            <div className={styles.packageContent}>
              <h3 className={styles.packageName}>{pkg.name}</h3>
              <p className={styles.packagePrice}>{pkg.price}</p>
              <p className={styles.packageDescription}>{pkg.description}</p>
              <ul className={styles.packageFeatures}>
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleAddToCart(pkg)}
                className={styles.addToCartButton}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, viewEventDetails } from "@/store/slices/cartslice";
import styles from "../../styles/Shopping.module.scss";
import { useRouter } from "next/router";

const Shopping = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
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
      image: "/packageimages/1.jpg",
      category: "basic",
      features: [
        {
          id: 1,
          feature: "Basic Balloon Decor",
          price: "₹2,667",
          included: true,
        },
        { id: 2, feature: "Simple Backdrop", price: "₹2,667", included: true },
        {
          id: 3,
          feature: "Basic Lighting Setup",
          price: "₹2,667",
          included: true,
        },
        {
          id: 4,
          feature: "4 Hours Setup Time",
          price: "₹2,666",
          included: true,
        },
        {
          id: 5,
          feature: "Basic Photo Corner",
          price: "₹2,666",
          included: true,
        },
        { id: 6, feature: "Standard Cleanup", price: "₹2,666", included: true },
      ],
      additionalServices: [
        {
          id: 7,
          feature: "Extra Hour Setup",
          price: "₹1,500",
          included: false,
        },
        {
          id: 8,
          feature: "Premium Backdrop",
          price: "₹3,000",
          included: false,
        },
        {
          id: 9,
          feature: "Professional Photography",
          price: "₹5,000",
          included: false,
        },
        { id: 10, feature: "DJ Services", price: "₹8,000", included: false },
      ],
    },
    {
      id: 2,
      name: "Wedding Special Package",
      price: "₹45,999",
      description:
        "Complete wedding decoration with premium elements and elegant themes",
      image: "/packageimages/wedding.jpg",
      category: "wedding",
      features: [
        {
          id: 11,
          feature: "Premium Balloon Arch & Columns",
          price: "₹5,750",
          included: true,
        },
        {
          id: 12,
          feature: "Custom Wedding Backdrop",
          price: "₹5,750",
          included: true,
        },
        {
          id: 13,
          feature: "LED String Lights & Spotlights",
          price: "₹5,750",
          included: true,
        },
        {
          id: 14,
          feature: "8 Hours Setup & Coordination",
          price: "₹5,750",
          included: true,
        },
        {
          id: 15,
          feature: "Professional Photo Booth",
          price: "₹5,750",
          included: true,
        },
        {
          id: 16,
          feature: "Wedding Stage Decoration",
          price: "₹5,750",
          included: true,
        },
        {
          id: 17,
          feature: "Entrance Arch Design",
          price: "₹5,750",
          included: true,
        },
        {
          id: 18,
          feature: "Complete Cleanup Service",
          price: "₹5,749",
          included: true,
        },
      ],
      additionalServices: [
        {
          id: 19,
          feature: "Live Band Setup",
          price: "₹15,000",
          included: false,
        },
        {
          id: 20,
          feature: "Wedding Cake Display",
          price: "₹8,000",
          included: false,
        },
        {
          id: 21,
          feature: "Premium Flower Arrangements",
          price: "₹12,000",
          included: false,
        },
        {
          id: 22,
          feature: "Wedding Videography",
          price: "₹20,000",
          included: false,
        },
      ],
    },
    {
      id: 3,
      name: "Birthday Celebration Package",
      price: "₹25,999",
      description: "Vibrant and colorful birthday decorations with fun themes",
      image: "/packageimages/birthday.jpg",
      category: "birthday",
      features: [
        {
          id: 23,
          feature: "Colorful Balloon Decorations",
          price: "₹3,250",
          included: true,
        },
        {
          id: 24,
          feature: "Themed Backdrop Design",
          price: "₹3,250",
          included: true,
        },
        {
          id: 25,
          feature: "Party Lighting Effects",
          price: "₹3,250",
          included: true,
        },
        {
          id: 26,
          feature: "6 Hours Setup Time",
          price: "₹3,250",
          included: true,
        },
        {
          id: 27,
          feature: "Birthday Photo Corner",
          price: "₹3,250",
          included: true,
        },
        {
          id: 28,
          feature: "Balloon Bouquets",
          price: "₹3,250",
          included: true,
        },
        {
          id: 29,
          feature: "Party Props & Accessories",
          price: "₹3,250",
          included: true,
        },
        {
          id: 30,
          feature: "Basic Cleanup Included",
          price: "₹3,249",
          included: true,
        },
      ],
      additionalServices: [
        {
          id: 31,
          feature: "Birthday Cake Display",
          price: "₹3,500",
          included: false,
        },
        {
          id: 32,
          feature: "Party Games Setup",
          price: "₹2,000",
          included: false,
        },
        {
          id: 33,
          feature: "Custom Birthday Banner",
          price: "₹1,500",
          included: false,
        },
        { id: 34, feature: "Balloon Artist", price: "₹5,000", included: false },
      ],
    },
    {
      id: 4,
      name: "Baby Shower Package",
      price: "₹22,999",
      description:
        "Adorable baby shower decorations with gender-specific themes",
      image: "/packageimages/baby_shower.png",
      category: "babyshower",
      features: [
        {
          id: 35,
          feature: "Baby Shower Balloon Arch",
          price: "₹2,875",
          included: true,
        },
        {
          id: 36,
          feature: "Gender Reveal Decorations",
          price: "₹2,875",
          included: true,
        },
        {
          id: 37,
          feature: "Soft Pastel Lighting",
          price: "₹2,875",
          included: true,
        },
        {
          id: 38,
          feature: "5 Hours Setup Time",
          price: "₹2,875",
          included: true,
        },
        {
          id: 39,
          feature: "Baby Shower Photo Booth",
          price: "₹2,875",
          included: true,
        },
        {
          id: 40,
          feature: "Diaper Cake Display",
          price: "₹2,875",
          included: true,
        },
        {
          id: 41,
          feature: "Baby Shower Games Setup",
          price: "₹2,875",
          included: true,
        },
        {
          id: 42,
          feature: "Gentle Cleanup Service",
          price: "₹2,874",
          included: true,
        },
      ],
      additionalServices: [
        {
          id: 43,
          feature: "Gender Reveal Balloon",
          price: "₹1,500",
          included: false,
        },
        {
          id: 44,
          feature: "Baby Shower Favors",
          price: "₹2,500",
          included: false,
        },
        {
          id: 45,
          feature: "Professional Photography",
          price: "₹8,000",
          included: false,
        },
        { id: 46, feature: "Catering Setup", price: "₹5,000", included: false },
      ],
    },
    {
      id: 5,
      name: "Premium Balloon Package",
      price: "₹35,999",
      description:
        "Advanced balloon artistry with custom designs and premium materials",
      image: "/packageimages/bal.jpg",
      category: "balloon",
      features: [
        {
          id: 47,
          feature: "Advanced Balloon Sculptures",
          price: "₹4,500",
          included: true,
        },
        {
          id: 48,
          feature: "Custom Balloon Garlands",
          price: "₹4,500",
          included: true,
        },
        {
          id: 49,
          feature: "Premium Balloon Materials",
          price: "₹4,500",
          included: true,
        },
        {
          id: 50,
          feature: "7 Hours Professional Setup",
          price: "₹4,500",
          included: true,
        },
        {
          id: 51,
          feature: "LED Balloon Lights",
          price: "₹4,500",
          included: true,
        },
        {
          id: 52,
          feature: "Balloon Arch & Columns",
          price: "₹4,500",
          included: true,
        },
        {
          id: 53,
          feature: "Custom Balloon Centerpieces",
          price: "₹4,500",
          included: true,
        },
        {
          id: 54,
          feature: "Premium Cleanup Service",
          price: "₹4,499",
          included: true,
        },
      ],
      additionalServices: [
        {
          id: 55,
          feature: "Balloon Artist Performance",
          price: "₹10,000",
          included: false,
        },
        {
          id: 56,
          feature: "Custom Balloon Designs",
          price: "₹5,000",
          included: false,
        },
        {
          id: 57,
          feature: "Balloon Workshop",
          price: "₹3,000",
          included: false,
        },
        {
          id: 58,
          feature: "Premium Balloon Materials",
          price: "₹7,000",
          included: false,
        },
      ],
    },
    {
      id: 6,
      name: "Luxury Custom Package",
      price: "Contact Us",
      description:
        "Bespoke decoration services tailored to your specific vision and requirements",
      features: [
        {
          id: 59,
          feature: "Custom Design Consultation",
          price: 6999,
          included: true,
        },
        {
          id: 60,
          feature: "Premium Materials Selection",
          price: 6999,
          included: true,
        },
        {
          id: 61,
          feature: "Flexible Setup Duration",
          price: 6999,
          included: true,
        },
        {
          id: 62,
          feature: "Personal Event Coordinator",
          price: 6999,
          included: true,
        },
        {
          id: 63,
          feature: "Custom Lighting Design",
          price: 6999,
          included: true,
        },
        {
          id: 64,
          feature: "Exclusive Photo Setup",
          price: 6999,
          included: true,
        },
        { id: 65, feature: "VIP Treatment", price: 6999, included: true },
        {
          id: 66,
          feature: "Complete Event Management",
          price: 6999,
          included: true,
        },
      ],
      additionalServices: [
        {
          id: 67,
          feature: "Luxury Venue Selection",
          price: "₹50,000",
          included: false,
        },
        {
          id: 68,
          feature: "Celebrity Guest Arrangements",
          price: "₹100,000",
          included: false,
        },
        {
          id: 69,
          feature: "International Catering",
          price: "₹75,000",
          included: false,
        },
        {
          id: 70,
          feature: "Premium Transportation",
          price: "₹25,000",
          included: false,
        },
      ],
      image: "/packageimages/1.png",
      category: "custom",
      featurePrices: "Contact for custom pricing",
    },
  ];

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };
  const handleViewDetails = (shoppingEventId, pkg) => {
    console.log("shoppingEventId", shoppingEventId);
    dispatch(viewEventDetails(pkg));
    router.push(`/shopping/${shoppingEventId}`);
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
                {pkg.features.map((item, index) => (
                  <li key={index}>{item.feature}</li>
                ))}
              </ul>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleAddToCart(pkg)}
                  className={styles.addToCartButton}
                >
                  Checkout
                </button>
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleViewDetails(pkg.id, pkg)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartslice";
import styles from "../../styles/Shopping.module.scss";

const ViewDetails = () => {
  const router = useRouter();
  const { shoppingeventid } = router.query;
  const dispatch = useDispatch();
  const viewDetailData = useSelector((state) => state.counter.viewDetailData);

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [removedFeatures, setRemovedFeatures] = useState([]);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug logging
  console.log("viewDetailData", viewDetailData);
  console.log("removedFeatures", removedFeatures);
  console.log("selectedFeatures", selectedFeatures);

  useEffect(() => {
    if (router.isReady && shoppingeventid) {
      // Use data from Redux store
      if (viewDetailData && Object.keys(viewDetailData).length > 0) {
        setPackageData(viewDetailData);
        // Initialize selected features with included ones
        const includedFeatures =
          viewDetailData.features?.filter((f) => f.included).map((f) => f.id) ||
          [];
        setSelectedFeatures(includedFeatures);
        setRemovedFeatures([]); // Reset removed features
      }
      setLoading(false);
    }
  }, [router.isReady, shoppingeventid, viewDetailData]);

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleRemoveFeature = (featureId) => {
    setRemovedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotal = () => {
    if (!packageData) return 0;

    let total = 0;

    // Add base package price
    const basePrice = parseInt(packageData.price.replace(/[^\d]/g, ""));
    total += basePrice;

    // Subtract removed features from base price
    packageData.features?.forEach((feature) => {
      if (removedFeatures.includes(feature.id)) {
        const featurePrice = parseInt(feature.price.replace(/[^\d]/g, ""));
        total -= featurePrice;
      }
    });

    // Add selected additional services
    packageData.additionalServices?.forEach((service) => {
      if (selectedFeatures.includes(service.id)) {
        total += parseInt(service.price.replace(/[^\d]/g, ""));
      }
    });

    return total;
  };

  const handleCheckout = () => {
    if (!packageData) return;

    // Create package with selected features
    const selectedPackage = {
      ...packageData,
      selectedFeatures: selectedFeatures,
      removedFeatures: removedFeatures,
      totalPrice: calculateTotal(),
      customizations:
        packageData.additionalServices?.filter((service) =>
          selectedFeatures.includes(service.id)
        ) || [],
      removedItems:
        packageData.features?.filter((feature) =>
          removedFeatures.includes(feature.id)
        ) || [],
    };

    dispatch(addToCart(selectedPackage));
    alert(`${packageData.name} added to cart with selected features!`);
    router.push("/cart");
  };

  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading package details...</p>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Package not found</h2>
        <button onClick={() => router.back()} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.packageDetailsPage}>
      <div className={styles.backButtonContainer}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back to Packages
        </button>
      </div>

      <div className={styles.packageHeader}>
        <h1 className={styles.packageTitle}>{packageData.name}</h1>
        <p className={styles.packageDescription}>{packageData.description}</p>
      </div>

      <div className={styles.packageContent}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img src={packageData.image} alt={packageData.name} />
          </div>
          <div className={styles.imageGallery}>
            {/* Additional images can be added here */}
            <div className={styles.galleryPlaceholder}>
              <span>More images coming soon</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.priceSection}>
            <h2 className={styles.priceTitle}>Package Price</h2>
            <div className={styles.priceDisplay}>
              <span className={styles.currency}>₹</span>
              <span className={styles.amount}>
                {packageData.price.replace(/[^\d]/g, "")}
              </span>
            </div>
            <p className={styles.priceNote}>
              Base package includes all essential features
            </p>
          </div>

          <div className={styles.featuresSection}>
            <h3 className={styles.sectionTitle}>Included Features</h3>
            <p className={styles.sectionDescription}>
              You can remove any features you don't need (price will be
              deducted)
            </p>
            <div className={styles.featuresList}>
              {packageData.features?.map((feature) => {
                const isRemoved = removedFeatures.includes(feature.id);
                return (
                  <div
                    key={feature.id}
                    className={`${styles.featureItem} ${
                      isRemoved ? styles.removedFeature : ""
                    }`}
                  >
                    <div className={styles.featureInfo}>
                      <span className={styles.featureName}>
                        {feature.feature}
                      </span>
                      <span className={styles.featurePrice}>
                        {feature.price}
                      </span>
                    </div>
                    <div className={styles.featureActions}>
                      {!isRemoved ? (
                        <>
                          <div className={styles.includedBadge}>✓ Included</div>
                          <button
                            onClick={() => handleRemoveFeature(feature.id)}
                            className={styles.removeFeatureButton}
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={styles.removedBadge}>✗ Removed</div>
                          <button
                            onClick={() => handleRemoveFeature(feature.id)}
                            className={styles.restoreFeatureButton}
                          >
                            Restore
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.additionalServicesSection}>
            <h3 className={styles.sectionTitle}>Additional Services</h3>
            <p className={styles.sectionDescription}>
              Customize your package by selecting additional services
            </p>
            <div className={styles.additionalServicesList}>
              {packageData.additionalServices?.map((service) => (
                <div key={service.id} className={styles.serviceItem}>
                  <label className={styles.serviceCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(service.id)}
                      onChange={() => handleFeatureToggle(service.id)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceName}>
                      {service.feature}
                    </span>
                    <span className={styles.servicePrice}>{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Base Package:</span>
              <span className={styles.totalValue}>{packageData.price}</span>
            </div>
            {packageData.features
              ?.filter((feature) => removedFeatures.includes(feature.id))
              .map((feature) => (
                <div key={feature.id} className={styles.totalRow}>
                  <span className={styles.totalLabel}>
                    - {feature.feature}:
                  </span>
                  <span className={styles.totalValue}>-{feature.price}</span>
                </div>
              ))}
            {packageData.additionalServices
              ?.filter((service) => selectedFeatures.includes(service.id))
              .map((service) => (
                <div key={service.id} className={styles.totalRow}>
                  <span className={styles.totalLabel}>
                    + {service.feature}:
                  </span>
                  <span className={styles.totalValue}>{service.price}</span>
                </div>
              ))}
            <div className={styles.totalDivider}></div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>
                ₹{calculateTotal().toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Add to Cart & Checkout
            </button>
            <button
              onClick={() => router.push("/shopping")}
              className={styles.browseMoreButton}
            >
              Browse More Packages
            </button>
          </div>
        </div>
      </div>

      <div className={styles.packageInfo}>
        <div className={styles.infoCard}>
          <h4>What's Included</h4>
          <ul>
            <li>Professional setup and decoration</li>
            <li>Quality materials and equipment</li>
            <li>Setup and cleanup services</li>
            <li>Event coordination support</li>
          </ul>
        </div>
        <div className={styles.infoCard}>
          <h4>Delivery & Setup</h4>
          <ul>
            <li>Setup completed 2-3 hours before event</li>
            <li>Professional team on-site</li>
            <li>Flexible timing options</li>
            <li>Post-event cleanup included</li>
          </ul>
        </div>
        <div className={styles.infoCard}>
          <h4>Customization</h4>
          <ul>
            <li>Color scheme adjustments</li>
            <li>Theme modifications</li>
            <li>Additional decor elements</li>
            <li>Special requests accommodated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

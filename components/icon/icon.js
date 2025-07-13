import React from "react";
import styles from "./icon.module.scss";

const Icon = ({ iconName }) => {
  switch (iconName) {
    case "ShoppingKart": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.shoppingCartIcon} // Assuming you have styles defined in SCSS
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l1.68 10.39a1 1 0 0 0 1 .81h9.72a1 1 0 0 0 1-.81L23 6H6"></path>
        </svg>
      );
    }
    case "filledStar": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          // fill="currentColor"
          className={styles.fillcolor}
        >
          <path d="M12 .587l3.668 7.431 8.215 1.191-5.93 5.774 1.399 8.143L12 18.897l-7.352 3.857 1.399-8.143-5.93-5.774 8.215-1.191L12 .587z" />
        </svg>
      );
    }
    case "emptyStar": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="gray"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="empty-star"
        >
          <path d="M12 .587l3.668 7.431 8.215 1.191-5.93 5.774 1.399 8.143L12 18.897l-7.352 3.857 1.399-8.143-5.93-5.774 8.215-1.191L12 .587z" />
        </svg>
      );
    }
    case "DiagonalArrow": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          stroke="white"
          fill="white"
        >
          <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
        </svg>
      );
    }

    default:
      return <></>; // Default return if no case matches
  }
};

export default Icon;

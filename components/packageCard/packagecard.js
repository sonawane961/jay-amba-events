import React from "react";
import styles from "./packagecard.module.scss";
import Icon from "../icon/icon";

const Packagecard = ({ imageSrc, title, rating, price }) => {
  const filledStars = Array(rating)
    .fill(null)
    .map((_, index) => <Icon iconName="filledStar" />);

  const emptyStars = Array(5 - rating)
    .fill(null)
    .map((_, index) => <Icon iconName="emptyStar" />);
  return (
    <>
      <div className={styles.cardContainer}>
        <img src={imageSrc} alt="Img" />
        <div>
          {filledStars}
          {emptyStars}
        </div>
        <p>{title}</p>
        <p>{price}</p>
        <button>View Details</button>
      </div>
    </>
  );
};
export default Packagecard;

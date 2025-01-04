import React from "react";
import styles from "./packagecard.module.scss";
import Icon from "../icon/icon";
import { Router, useRouter } from "next/router";

const Packagecard = ({ imageSrc, title, rating, price }) => {
  const router = useRouter();
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
        <div className={styles.packagecardButtonsContainer}>
          <button
            onClick={() => {
              router.push("/detailspage");
            }}
          >
            View Details
          </button>
          <button>Add To Kart</button>
        </div>
      </div>
    </>
  );
};
export default Packagecard;

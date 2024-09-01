import React from "react";
import styles from "./events.module.scss";

const Events = ({ imageSrc, title }) => {
  return (
    <>
      <div className={styles.eventsContainer}>
        <img src={imageSrc} alt="Img" />
        <p>{title}</p>
      </div>
    </>
  );
};
export default Events;

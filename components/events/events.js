import React from "react";
import styles from "./events.module.scss";

const Events = ({ imageSrc, title, onClick }) => {
  return (
    <>
      <div className={styles.eventsContainer} onClick={onClick}>
        <img src={imageSrc} alt="Img" />
        <p>{title}</p>
      </div>
    </>
  );
};
export default Events;

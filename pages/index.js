import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Carousel from "@/components/carousel/Carousel";
import { useEffect, useState } from "react";
import Events from "@/components/events/events";
import Packagecard from "@/components/packageCard/packagecard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [carouselImageArray, setcarouselImageArray] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push(`/carouselimages/${i}.jpg`);
    }
    setcarouselImageArray(arr);
  }, []);

  return (
    <>
      <Carousel images={carouselImageArray} />
      <p className={styles.eventHeading}>Event Decorations We Offer</p>
      <div className={styles.eventcardsContainer}>
        <Events imageSrc={"/eventimages/wedding.png"} title={"WEDDING"} />
        <Events imageSrc={"/eventimages/birthday.png"} title={"Birthday"} />
        <Events imageSrc={"/eventimages/babyshower.png"} title={"Babyshower"} />
        <Events imageSrc={"/eventimages/ganapati.png"} title={"Ganapati"} />
        <Events imageSrc={"/eventimages/aniversary.jpg"} title={"Aniversary"} />
        <Events imageSrc={"/eventimages/wedding.png"} title={"WEDDING"} />
      </div>
      <hr className={styles.grayLine} />
      <p className={styles.eventHeading}> Our Packages</p>
      <div className={styles.packageCardContainer}>
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"129999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"129999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"129999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
        <Packagecard
          imageSrc={"packageimages/1.png"}
          rating={4}
          title={"Unicorn Naming Ceremony Theme"}
          price={"12999/-"}
        />
      </div>
    </>
  );
}

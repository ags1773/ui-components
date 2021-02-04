import React from "react";
import styles from "./image.m.css";

export function Image({ src, altText }) {
  return <img src={src} alt={altText} className={styles.image} />;
}

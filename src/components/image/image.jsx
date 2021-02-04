import React from "react";
import styles from "./image.m.css";
import CSSModules from "react-css-modules";

function ImageBase({ src, altText }) {
  return <img src={src} alt={altText} styleName="image" />;
}

export const Image = CSSModules(ImageBase, styles);

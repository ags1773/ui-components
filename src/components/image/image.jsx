import React from "react";
import "./image.m.css";

/**
 * The image UI component
 *
 * @param {object} props
 * @param {string} props.src image src
 * @param {string} props.altText image alt text
 */

export function Image({ src, altText }) {
  return <img src={src} alt={altText} styleName="image" />;
}

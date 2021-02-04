import React from "react";
import "./image.m.css";

export function Image({ src, altText }) {
  return <img src={src} alt={altText} className="image" />;
}

import React from "react";
import styles from "./basket.m.css";
import CSSModules from "react-css-modules";

function BasketBase({ fruits, onClick }) {
  return (
    <ul styleName="basketWrapper">
      {fruits.map((fruit) => (
        <li key={fruit.id}>
          {fruit.name}
          <button onClick={(event) => onClick({ event, item: fruit })}>
            {fruit.isFav ? "unlike" : "like"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export const Basket = CSSModules(BasketBase, styles);

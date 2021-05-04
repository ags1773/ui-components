import React from "react";
import "./basket.m.css";

/**
 * The basket UI component
 *
 * @param {object} props
 * @param {array} props.fruits Array containing fruits objects { id: 1, name: "Apple", isFav: false }
 * @param {function} props.onClick onClick handler function
 */

export function Basket({ fruits, onClick }) {
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

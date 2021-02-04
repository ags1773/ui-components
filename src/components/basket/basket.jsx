import React from "react";
import "./basket.m.css";

export function Basket({ fruits, onClick }) {
  return (
    <ul className="basketWrapper">
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

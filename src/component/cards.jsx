// Card.tsx
import React from "react";

const Card = ({ suit, rank, style }) => {
  return (
    <div
      className="w-24 h-32 bg-white border rounded-lg shadow-md flex items-center justify-center text-xl"
      style={style}
    >
      <div>
        <p>{rank}</p>
        <p>{suit}</p>
      </div>
    </div>
  );
};

export default Card;

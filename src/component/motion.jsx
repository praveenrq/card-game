import React from "react";

function MotionCard() {
  return (
    <div className="flex flex-1 bg-sky-700 h-screen">
      <div className="flex flex-row w-screen">
        <div className="flex h-screen w-80">deck</div>
        <div className="grid grid-rows-3">
          <div className="flex">sysy cards</div>
          <div className="flex">opponent</div>
          <div className="flex">your card</div>
        </div>
      </div>
    </div>
  );
}

export default MotionCard;

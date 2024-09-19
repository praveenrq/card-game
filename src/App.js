import "./App.css";
import CardStack from "./component/board";
import GameBoard from "./component/board";
// import { useEffect, useState } from "react";
// import Gamex from "./component/game";
// import { Kopp } from "./component/card-flip";
// import Board from "./component/transition-comb";
import MotionCard from "./component/motion";

function App() {
  return (
    <div className="flex flex-1">
      {/* <Gamex /> */}
      {/* <AppContainer /> */}
      {/* <Kopp /> */}
      {/* <Board /> */}
      {/* <MotionCard /> */}
      {/* <GameBoard /> */}
      <CardStack />
    </div>
  );
}

export default App;

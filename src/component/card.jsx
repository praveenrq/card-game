// src/components/Card.js
import React from "react";

class Card extends React.Component {
  render() {
    const { onClick, position, index, cardModel } = this.props;
    return (
      <div
        onClick={onClick}
        className="card"
        style={{ left: position.x, top: position.y }}
      >
        <div className="inner">
          {index}
          <br />
          {cardModel.name}
        </div>
      </div>
    );
  }
}

export default Card;

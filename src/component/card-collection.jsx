// src/components/CardCollection.js
import React from "react";
import Card from "./card";
import CardModel from "./card-model";

class CardCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(this.props.count)
        .fill()
        .map(() => new CardModel()),
    };
    this.collectionRef = React.createRef(); // Using React.createRef()
  }

  getCardPosition(i) {
    return {
      x: i * this.props.shift.left,
      y: i * this.props.shift.top,
    };
  }

  render() {
    return (
      <div
        className="deck"
        style={this.props.style}
        ref={this.collectionRef} // Assigning ref to the DOM element
      >
        {this.state.cards.map((cardModel, i) => {
          const position = this.getCardPosition(i);
          const onClick =
            this.props.topOnly && i !== this.state.cards.length - 1
              ? () => {}
              : () =>
                  this.props.onCardClick(this.props.name, cardModel, position);

          return (
            <Card
              cardModel={cardModel}
              position={position}
              onClick={onClick}
              index={i}
              key={i}
            />
          );
        })}
      </div>
    );
  }
}

export default CardCollection;

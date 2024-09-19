// src/components/Board.js
import React from "react";
import CardCollection from "./card-collection";
import Animation from "./anime";
import Card from "./card";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { animations: [] };

    // Create refs for both CardCollection instances
    this.deckRef = React.createRef();
    this.handRef = React.createRef();
  }

  transferCard(receiverName) {
    return (senderName, card, position) => {
      const sender =
        senderName === "Deck" ? this.deckRef.current : this.handRef.current;
      const receiver =
        receiverName === "Hand" ? this.handRef.current : this.deckRef.current;

      const cards = sender.state.cards.slice();
      cards.splice(cards.indexOf(card), 1);
      sender.setState({ cards });

      const newCardPosition = receiver.getCardPosition(
        receiver.state.cards.length
      );

      // Accessing getBoundingClientRect() through the DOM element
      const senderRect = sender.collectionRef.current.getBoundingClientRect();
      const receiverRect =
        receiver.collectionRef.current.getBoundingClientRect();

      const animation = {
        start: {
          x: position.x + senderRect.left,
          y: position.y + senderRect.top,
        },
        end: {
          x: newCardPosition.x + receiverRect.left,
          y: newCardPosition.y + receiverRect.top,
        },
        subject: <Card cardModel={card} position={{ x: 0, y: 0 }} />,
        onFinish: () => {
          receiver.setState({ cards: receiver.state.cards.concat([card]) });
          const animations = this.state.animations.slice();
          animations.splice(animations.indexOf(animation), 1);
          this.setState({ animations });
        },
      };

      this.setState({ animations: this.state.animations.concat([animation]) });
    };
  }

  render() {
    return (
      <div>
        <CardCollection
          ref={this.deckRef} // Assign deckRef here
          name="Deck"
          onCardClick={this.transferCard("Hand")}
          topOnly
          style={{ left: 0, top: 0 }}
          shift={{ left: 25, top: 16 / 16 }}
          count={10}
        />
        <CardCollection
          ref={this.handRef} // Assign handRef here
          name="Hand"
          onCardClick={this.transferCard("Deck")}
          style={{ left: 0, top: 150 }}
          shift={{ left: 75, top: 0 }}
          count={5}
        />
        {this.state.animations.map((anim, i) => (
          <Animation key={i} state={anim} />
        ))}
      </div>
    );
  }
}

export default Board;

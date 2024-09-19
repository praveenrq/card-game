import "../App.css";
import { useEffect, useState } from "react";

function Gamex() {
  class Card {
    constructor(card) {
      this.card = card;
      const cardValues = {
        "Ace of Hearts": 1,
        "2 of Hearts": 2,
        "3 of Hearts": 3,
        "4 of Hearts": 4,
        "5 of Hearts": 5,
        "6 of Hearts": 6,
        "7 of Hearts": 7,
        "8 of Hearts": 8,
        "9 of Hearts": 9,
        "10 of Hearts": 10,
        "Jack of Hearts": 11,
        "Queen of Hearts": 12,
        "King of Hearts": 13,
        "Ace of Diamonds": 1,
        "2 of Diamonds": 2,
        "3 of Diamonds": 3,
        "4 of Diamonds": 4,
        "5 of Diamonds": 5,
        "6 of Diamonds": 6,
        "7 of Diamonds": 7,
        "8 of Diamonds": 8,
        "9 of Diamonds": 9,
        "10 of Diamonds": 10,
        "Jack of Diamonds": 11,
        "Queen of Diamonds": 12,
        "King of Diamonds": 13,
        "Ace of Clubs": 1,
        "2 of Clubs": 2,
        "3 of Clubs": 3,
        "4 of Clubs": 4,
        "5 of Clubs": 5,
        "6 of Clubs": 6,
        "7 of Clubs": 7,
        "8 of Clubs": 8,
        "9 of Clubs": 9,
        "10 of Clubs": 10,
        "Jack of Clubs": 11,
        "Queen of Clubs": 12,
        "King of Clubs": 13,
        "Ace of Spades": 1,
        "2 of Spades": 2,
        "3 of Spades": 3,
        "4 of Spades": 4,
        "5 of Spades": 5,
        "6 of Spades": 6,
        "7 of Spades": 7,
        "8 of Spades": 8,
        "9 of Spades": 9,
        "10 of Spades": 10,
        "Jack of Spades": 11,
        "Queen of Spades": 12,
        "King of Spades": 13,
      };

      this.value = cardValues[card];
      this.suit = card.substring(card.indexOf(" of ") + 4);
      this.placeHolder = null;
      this.flipped = false;

      var suits = { Hearts: 0, Diamonds: 13, Clubs: 26, Spades: 39 };
      this.position = suits[this.suit] + this.value; //Position in a sorted deck
      this.backgroundPosition = -100 * this.position + "px";
    } //End of Constructor
  }
  class Deck {
    constructor() {
      this.deck = [];
      this.reset(); //Add 52 cards to the deck
      this.shuffle(); //Suffle the deck
    } //End of constructor

    reset() {
      this.deck = [];
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const values = [
        "Ace",
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        "Jack",
        "Queen",
        "King",
      ];

      for (let suit in suits) {
        for (let value in values) {
          this.deck.push(values[value] + " of " + suits[suit]);
        }
      }
    } //End of reset()

    shuffle() {
      let numberOfCards = this.deck.length;
      for (var i = 0; i < numberOfCards; i++) {
        let j = Math.floor(Math.random() * numberOfCards);
        let tmp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = tmp;
      }
      return this.deck;
    } //End of shuffle()

    deal() {
      return this.deck.pop();
    } //End of deal()

    isEmpty() {
      return this.deck.length == 0;
    } //End of isEmpty()

    length() {
      return this.deck.length;
    } //End of length()
  } //End of Deck Class

  const styleCardSize = { maxHeight: "150px", maxWidth: "105px" };

  const [playerCards, setPlayerCards] = useState([]);
  const [opCards, setOpCards] = useState([]);
  const [sysCards, setSysCards] = useState(true);
  const [sysCard1, setSysCard1] = useState([]);
  const [sysCard2, setSysCard2] = useState([]);
  const [sysCard3, setSysCard3] = useState([]);
  const [sysCard4, setSysCard4] = useState([]);
  const [deckCard, setDeckCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    console.log("plauer---", playerCards);
  }, []);

  // shuffle deck

  const deckShuffle = (condition) => {
    const deck = new Deck();
    const rest_card = deck.deck;
    const dshuffled = deck.shuffle();
    let set1 = [],
      set2 = [],
      set3 = [];
    for (let i = 1; i < 5; i++) {
      set1.push(new Card(deck.deal()));
      if (condition == "first_time") {
        set2.push(new Card(deck.deal()));
      }
      set3.push((new Card(deck.deal()).flipped = true));
    }
    console.log("resii----", set1, "sel2--", set2, "set3--", set3);
    setPlayerCards(set1);
    if (condition == "first_time") {
      // setSysCards(set2);
      setSysCard1([set2[0]]);
      setSysCard2([set2[1]]);
      setSysCard3([set2[2]]);
      setSysCard4([set2[3]]);
      setSysCards(false);
    }
    setOpCards(set3);
  };

  const selectCard = (index) => {
    console.log("sele car", index, playerCards[index]);

    // playerCards.splice(index,1)
    setSelectedCard(index);
  };

  const dropCard = (index) => {
    console.log("evv=", index, playerCards.length, selectedCard);
    if (selectedCard !== null && playerCards.length !== 0) {
      playerCards.splice(index, 1);
      setPlayerCards([...playerCards]);
      // setSelectedCard(null);
    }
    setSelectedCard(null);

    console.log("sell", playerCards);
  };

  return (
    <div className="flex flex-1 h-screen justify-center items-center flex-col gap-y-5 bg-sky-700">
      <div className="flex flex-col pb-48">
        <p className="font-bold text-white">4 cards</p>
        <div className="flex flex-row">
          <div>
            {sysCard1.map((card, index) => (
              <div
                id={"sysCard".concat((index + 1).toString())}
                className="card"
                // onClick={setThrowCard}
                style={{
                  backgroundPosition: card.backgroundPosition,
                  ...styleCardSize,
                }}
              ></div>
            ))}
          </div>
          <div>
            {sysCard2.map((card, index) => (
              <div
                id={"sysCard".concat((index + 1).toString())}
                className="card"
                // onClick={setThrowCard}
                style={{
                  backgroundPosition: card.backgroundPosition,
                  ...styleCardSize,
                }}
              ></div>
            ))}
          </div>
          <div>
            {sysCard3.map((card, index) => (
              <div
                id={"sysCard".concat((index + 1).toString())}
                className="card"
                // onClick={setThrowCard}
                style={{
                  backgroundPosition: card.backgroundPosition,
                  ...styleCardSize,
                }}
              ></div>
            ))}
          </div>
          <div>
            {sysCard4.map((card, index) => (
              <div
                id={"sysCard".concat((index + 1).toString())}
                className="card"
                // onClick={setThrowCard}
                style={{
                  backgroundPosition: card.backgroundPosition,
                  ...styleCardSize,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex absolute self-start -mt-60">
        <div className="flex flex-col relative justify-center items-center">
          <p className="text-white font-bold">deck</p>
          <div
            id="deck"
            className="card"
            style={styleCardSize}
            onClick={() => {
              !sysCards
                ? deckShuffle("second_time")
                : deckShuffle("first_time");
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="  font-bold stroke-orange-600">opponent player</p>
        <div>
          {opCards.map((card, index) => (
            <div
              id={"opCard".concat((index + 1).toString())}
              className="card"
              // onClick={setThrowCard}
              style={{
                backgroundPosition: card.backgroundPosition,
                ...styleCardSize,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className=" font-bold">yours</p>
        <div className="">
          {playerCards.map((card, index) => (
            <div
              id={"playerCard".concat((index + 1).toString())}
              className="card"
              // onClick={setThrowCard}
              onClick={() => selectCard(index)}
              style={{
                backgroundPosition: card.backgroundPosition,
                ...styleCardSize,
              }}
            ></div>
          ))}
        </div>
        {selectedCard !== null ? (
          <div className="flex abolute self-end -mt-20 -mr-44 rounded-xl">
            <button
              className="bg-green-600 flex p-4 rounded-xl text-white"
              onClick={() => dropCard(selectedCard)}
            >
              Drop
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Gamex;

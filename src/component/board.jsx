import React, { useState } from "react";
import { useSprings, animated, useSpring } from "@react-spring/web";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import poker_table from "../table.png";
import green_screen from "../top.jpg";
import top_1 from "../top_2.jpg";
import top_2 from "../top_3.jpg";

const suits = ["spades", "hearts", "diamonds", "clubs"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];
const ItemType = {
  CARD: "card",
};

const generateDeck = () =>
  values.flatMap((value) =>
    suits.map((suit) => ({
      id: `${value}_of_${suit}`,
      svg: `/cards/${suit}_${value}.svg`,
      name: `${value} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      back: `/cardback/astronaut.svg`,
    }))
  );
const DraggableCard = ({ key, card, style, face }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springStyle = useSpring({
    transform: isHovered ? "translateY(-10px)" : "translateY(0px)",
    boxShadow: isHovered
      ? "0px 10px 20px rgba(0, 0, 0, 0.3)"
      : "0px 5px 10px rgba(0, 0, 0, 0.1)",
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <animated.div
      key={key}
      ref={drag}
      style={{
        ...springStyle,
        ...style,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isHovered ? 200 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute w-[123px] h-[175px] bg-white rounded-lg shadow-xl cursor-pointer ml-9 "
    >
      <img
        src={face == "svg" ? card.back : card.svg}
        alt={card.name}
        className="w-full h-full object-contain"
      />
    </animated.div>
  );
};

const DropTarget = ({ onDrop, onCardDropped, thirdDivCards }) => {
  // console.log("throooo==", thirdDivCards);
  const [isHovered, setIsHovered] = useState(false);
  const springs = useSpring({
    spreadFactor: isHovered ? 20 : 0,
    rotateFactor: isHovered ? 15 : 0,
  });

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    // drop: (item) => {
    //   onCardDropped(item.card);
    // },
    drop: (item) => {
      onDrop(item);
      onCardDropped(item.card);
    },
  });
  return (
    <div
      ref={drop}
      //   className="relative mt-8 w-[250px] h-[200px] border-2 border-dashed border-gray-500 flex items-center justify-center"
      className="relative w-[150px] h-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cards will be dropped here */}
      <span className="text-gray-500"></span>
      {thirdDivCards.map((card, index) => (
        // <div
        //   key={thirdDivCards[index].id}
        //   className=" w-[123px] h-[175px] bg-white rounded-lg shadow-xl"
        // >
        //   <img
        //     src={thirdDivCards[index].svg}
        //     alt={thirdDivCards[index].name}
        //     className="w-full h-full object-contain"
        //   />
        // </div>
        <animated.div
          key={card.card.id}
          className="absolute w-[123px] h-[175px] bg-white rounded-lg shadow-xl"
          // style={{
          //   transform: `translateY(${index * 26}px)`,
          //   zIndex: index,
          // }}
          style={{
            transform: isHovered
              ? springs.spreadFactor.to(
                  (spread) =>
                    `translate(${index * spread}px, ${
                      index * spread
                    }px) rotate(${index * springs.rotateFactor.get()}deg)`
                )
              : `translateY(${index * 26}px)`,
            zIndex: index,
          }}
        >
          <img
            src={card.card.svg}
            alt={card.card.name}
            className="w-full h-full object-contain"
          />
        </animated.div>
      ))}
    </div>
  );
};

const CardStack = () => {
  // deck
  const [deck, setDeck] = useState(generateDeck);
  const [firstDivCards, setFirstDivCards] = useState([]);
  const [secondDivCards, setSecondDivCards] = useState([]);
  const [movingCards, setMovingCards] = useState([]);
  const [thirdDivCards, setThirdDivCards] = useState(Array(12).fill([]));

  // const [isDragging, setIsDragging] = useState(false);
  const [expand, setExpand] = useState(false);

  const handleMoveCards = () => {
    // console.log("cards==", thirdDivCards);
    if (deck.length >= 8) {
      const newFirstDivCards = deck.slice(0, 4);
      const newSecondDivCards = deck.slice(4, 8);

      setMovingCards(newFirstDivCards.concat(newSecondDivCards));

      //   setFirstDivCards([...firstDivCards, ...newFirstDivCards]);
      //   setSecondDivCards([...secondDivCards, ...newSecondDivCards]);
      //   setDeck(deck.slice(8));
      setTimeout(() => {
        setFirstDivCards([...firstDivCards, ...newFirstDivCards]);
        setSecondDivCards([...secondDivCards, ...newSecondDivCards]);
        setDeck(deck.slice(8));
        setMovingCards([]);
      }, 1000);
    }

    setExpand(false);
  };

  const deckSprings = useSprings(
    deck.length,
    deck.map((_, index) => ({
      to: {
        transform: `translateY(${index * 0.4}px) translateX(${index * 0.2}px)`,
        transform: `translate3d(${index * 0.4}px, ${index * 0.2}px, 0)`,
      },
      from: {
        transform: "translateY(-200px) translateX(-200px)",
        // transform: `translate3d(${index * 0.4}px, ${index * 0.2}px, 0)`,
      },
    }))
  );

  const movingSprings = useSprings(
    movingCards.length,
    movingCards.map((_, index) => ({
      to: {
        transform: `translate(${
          index < 4 ? (index % 4) * 100 : (index % 4) * 100
        }px, ${index < 4 ? 0 : 300}px)`,
        opacity: 0.7,
      },
      from: {
        transform: `translate(0px, 0px)`,
        opacity: 0.3,
      },
      //   config: { duration: 1000 },
      config: { tension: 300, friction: 26 },
    }))
  );

  const transferSprings = useSprings(
    movingCards.length,
    movingCards.map((card, index) => ({
      to: {
        transform: `translate(${
          (index % 4) * 55 + (index < 4 ? -250 : 250)
        }px, ${Math.floor(index / 4) * 75}px)`,
      },
      from: {
        transform: "translate(0px, 0px)",
      },
      config: { tension: 170, friction: 26 },
    }))
  );

  const firstDivSprings = useSprings(
    firstDivCards.length,
    firstDivCards.map((_, index) => ({
      to: {
        transform: `translate(${(index % 4) * 155}px, ${
          Math.floor(index / 4) * -5
        }px)`,
        zIndex: Math.floor(index / 4),
      },
      from: {
        transform: "translate(-600px, 10px)",
      },
      config: { tension: 600, friction: 50 },
    }))
    // firstDivCards.map((_, index) => ({
    //   from: { transform: "translate(-100px, -60px)" },
    //   to: {
    //     transform: `translate(${
    //       (index % 4) * 55 + (index < 4 ? -250 : 250)
    //     }px, ${Math.floor(index / 4) * 75}px)`,
    //   },
    //   config: { tension: 200, friction: 20 },
    // }))
  );

  const secondDivSprings = useSprings(
    secondDivCards.length,
    secondDivCards.map((_, index) => ({
      to: {
        transform: `translate(${(index % 4) * 155}px, ${
          Math.floor(index / 4) * -5
        }px)`,
        zIndex: Math.floor(index / 4),
      },
      from: { transform: "translate(-600px, -300px)" },
      config: { tension: 600, friction: 50 },
    }))
  );

  const handleCardDrop = (card, zoneIndex) => {
    // console.log("card droo", card);
    // console.log("first card==", firstDivCards);
    // console.log("second---", secondDivCards);
    const newDropZones = [...thirdDivCards];
    newDropZones[zoneIndex] = [...newDropZones[zoneIndex], card];
    setThirdDivCards(newDropZones);
    // setThirdDivCards([...thirdDivCards, card]);

    // setFirstDivCards(firstDivCards.filter((c) => c.id !== card.id));
    // setSecondDivCards(secondDivCards.filter((c) => c.id !== card.id));
  };

  const handleFirstSecond = (card) => {
    setFirstDivCards(firstDivCards.filter((c) => c.id !== card.id));
    setSecondDivCards(secondDivCards.filter((c) => c.id !== card.id));
  };

  // const handleDragStart = () => {
  //   setIsDragging(true);
  // };

  // const handleDragEnd = () => {
  //   setIsDragging(false);
  // };

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-row w-screen bg-gradient-to-r from-orange-800 to-red-700 bg-cover"
        style={{
          backgroundImage: `url(${top_2})`,
          backgroundRepeat: "no-repeat",
          // backgroundPositionY: 13,
        }}
      >
        {/* players cards */}
        <div className="flex flex-row items-start h-screen w-auto justify-between pr-56 pl-14">
          {/* Button to move cards */}
          <div className="flex flex-col">
            <button
              onClick={handleMoveCards}
              className="mb-6 px-4 py-4 w-[100px] bg-gray-100 text-black rounded-lg shadow-md mt-[500px]"
            >
              Click me
            </button>

            <button
              onClick={handleExpand}
              className="mb-6 px-4 py-4 w-[100px] bg-gray-100 text-black rounded-lg shadow-md"
            >
              expand
            </button>
          </div>

          {/* Card stack */}
          <div className="flex flex-row justify-start items-start">
            <div className="relative w-[150px] h-[220px] mt-[76px] -ml-[100px]">
              {deckSprings.map((style, index) => (
                <div
                  key={deck[index].id}
                  style={style}
                  className="absolute w-full h-full bg-white rounded-lg flex items-center justify-center shadow-lg"
                >
                  <img
                    src={deck[index].back}
                    alt={deck[index].name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            {/* Moving Cards Animation */}
            {/* </div> */}
            {/* {transferSprings.map((style, index) => (
              <animated.div
                key={movingCards[index].id}
                style={style}
                className="absolute w-[50px] h-[75px] bg-white rounded-lg shadow-xl"
              >
                <img
                  src={movingCards[index].svg}
                  alt={movingCards[index].name}
                  className="w-full h-full object-contain"
                />
              </animated.div>
            ))} */}
          </div>

          {/* Right stack Div */}
          {expand ? (
            <div className="flex w-[600px]"></div>
          ) : (
            <div className="grid grid-rows-2 gap-y-8 pt-11 mt-[370px]">
              {/* <DndProvider backend={HTML5Backend}> */}
              {/* <div className="relative w-[600px] h-[200px] grid grid-cols-4 gap-2">
                <DropTarget
                  onCardDropped={handleCardDrop}
                  thirdDivCards={thirdDivCards}
                />
                
              </div> */}
              {/* First Div */}
              <div className="relative w-[600px] h-[200px] grid grid-cols-4 gap-2">
                <p className="text-white font-bold -mt-20 relative">
                  Opponent card
                </p>
                {firstDivSprings.map((style, index) => (
                  // <animated.div
                  //   key={firstDivCards[index].id}
                  //   style={style}
                  //   className="absolute w-[123px] h-[175px] bg-white rounded-lg shadow-xl ml-9"
                  // >
                  //   <img
                  //     src={firstDivCards[index].back}
                  //     alt={firstDivCards[index].name}
                  //     className="w-full h-full object-contain"
                  //   />
                  // </animated.div>
                  <DraggableCard
                    key={firstDivCards[index].id}
                    card={firstDivCards[index]}
                    style={style}
                    face={"svg"}
                    onDrop={(card) => setThirdDivCards(card)}
                    // handleDragEnd={handleDragEnd}
                    // handleDragStart={handleDragStart}
                  />
                ))}
              </div>

              {/* Second Div */}
              <div className="relative mt-8 w-[600px] h-[200px] grid grid-cols-4 gap-2">
                <p className="text-white font-bold -mt-20 relative">
                  Your card
                </p>
                {secondDivSprings.map((style, index) => (
                  // <animated.div
                  //   key={secondDivCards[index].id}
                  //   style={style}
                  //   className="absolute w-[123px] h-[175px] bg-white rounded-lg shadow-xl ml-9"
                  // >
                  //   <img
                  //     src={secondDivCards[index].svg}
                  //     alt={secondDivCards[index].name}
                  //     className="w-full h-full object-contain"
                  //   />
                  // </animated.div>
                  <DraggableCard
                    key={secondDivCards[index].id}
                    card={secondDivCards[index]}
                    style={style}
                    face={"back"}
                    onDrop={(card) => setThirdDivCards(card)}
                    // handleDragEnd={handleDragEnd}
                    // handleDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* section for throw cards */}
        {/* <div className="flex justify-center items-center h-screen contain-content">
          <div className="flex relative group"> */}
        <div
          className={`flex h-[900px] bg-center mt-5 bg-cover items-center justify-center border-[15px] border-amber-600 rounded-3xl ${
            !expand
              ? "w-[1000px] "
              : " transform origin-right transition-transform duration-700 border-r-[10px] border-l-[10px] pl-6 pr-4 w-[950px] scale-x-185 will-change-transform"
          }`}
          // className={`flex w-[1000px] h-[900px] bg-center bg-cover pt-20 items-center justify-center border-[15px] border-amber-600 rounded-3xl ${
          //   isDragging
          //     ? "w-[1000px] transform origin-right transition-transform duration-700 hover:scale-x-175 will-change-transform"
          //     : ""
          // } `}
          style={{
            backgroundImage: `url(${green_screen})`,
            backgroundRepeat: "no-repeat",
            // backgroundPositionY: 13,
          }}
        >
          <div
            className={`relative pl-8 grid mt-12 gap-2 ${
              !expand
                ? "grid-cols-4 gap-x-6 gap-y-11 w-[900px] h-[800px]"
                : "gap-y-1 gap-x-8 scale-x-50 -ml-[100%] w-[1900px] h-[800px] grid-cols-8 transform origin-right transition-transform duration-1000"
            }`}
            // className={`relative w-auto h-auto grid  ${
            //   isDragging
            //     ? "grid-cols-8 scale-x-50 gap-x-48 transition-transform duration-500"
            //     : "grid-cols-4 gap-x-6 scale-x-200"
            // } gap-2 gap-y-11`}
            hove
          >
            {/* <DropTarget
              onCardDropped={handleCardDrop}
              thirdDivCards={thirdDivCards}
            /> */}
            {thirdDivCards.map((cards, index) => (
              <DropTarget
                key={index}
                onDrop={(item) => handleCardDrop(item, index)}
                onCardDropped={handleFirstSecond}
                thirdDivCards={cards}
              />
            ))}
          </div>
        </div>
        {/* </div>
        </div> */}
      </div>
    </DndProvider>
  );
};

export default CardStack;

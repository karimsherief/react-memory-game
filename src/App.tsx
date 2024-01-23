import { useState, useEffect } from "react";
import Card from "./components/Card";
import Cards from "./constants/Cards";
import { CardsProps } from "./types";
import "./index.css";

export default function App() {
  const [turns, setTurns] = useState(0);
  const [disabled, setDisbaled] = useState(false);
  const [cards, setCards] = useState<CardsProps[]>([]);
  const [choiceOne, setChoiceOne] = useState<CardsProps | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardsProps | null>(null);

  function shuffleCards() {
    const shuffledCards = [...Cards, ...Cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: Math.random().toString(), ...card }));

    setCards(shuffledCards);

    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  const checkMatched = (choiceOne: CardsProps, choiceTwo: CardsProps) =>
    choiceOne.src === choiceTwo.src;

  function handleClick(card: CardsProps) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(() => card);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisbaled(true);
      if (checkMatched(choiceOne, choiceTwo)) {
        setCards((prev) => {
          return prev.map((prevCard) => {
            return prevCard.id === choiceOne.id || prevCard.id === choiceTwo.id
              ? { ...prevCard, matched: true }
              : prevCard;
          });
        });
      }

      setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisbaled(false);
      }, 1200);

      setTurns((prev) => prev + 1);
      
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards__list">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </>
  );
}

import { useState, useEffect } from "react";

import SingleCard from "./components/SingleCard";

import cardsImages from "./constants/Cards";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: Math.random(), ...card }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // handle a choice
  const handleChoice = (card) =>
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prev) => prev + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((cards) => {
          return cards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, mathced: true };
            }
            return card;
          });
        });
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} disabled={disabled}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            handleChoice={handleChoice}
            key={card.id}
            flipped={card === choiceOne || card === choiceTwo || card.mathced}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </>
  );
}

export default App;

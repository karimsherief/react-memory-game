import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardsImages = [
  { "src": "/img/helmet-1.png", mathced: false },
  { "src": "/img/potion-1.png", mathced: false },
  { "src": "/img/ring-1.png", mathced: false },
  { "src": "/img/scroll-1.png", mathced: false },
  { "src": "/img/shield-1.png", mathced: false },
  { "src": "/img/sword-1.png", mathced: false }
]
function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  // Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  // handle a choice
  const handleChoice = (card) => choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  
  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(prev => prev + 1)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(cards => {
          return cards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, mathced: true }
            }
            return card
          })
        })
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo])
  
  return (
    <div className="app">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCard
              card={card}
              handleChoice={handleChoice}
              key={card.id}
              flipped={card === choiceOne || card === choiceTwo || card.mathced}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  return (
    <div
      className={`card ${flipped ? "flipped" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <div>
        <img src={card.src} alt="card front" className="front" />
        <img
          src="./img/cover.png"
          alt="card back"
          className="back"
          onClick={() => handleChoice(card)}
        />
      </div>
    </div>
  );
}

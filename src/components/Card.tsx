import { CardsProps } from "../types";

type SingleCardProps = {
  card: CardsProps;
  disabled: boolean;
  flipped: boolean;
  handleClick: (card: CardsProps) => void;
};
export default function Card({
  card,
  disabled,
  flipped,
  handleClick,
}: SingleCardProps) {
  return (
    <div
      className={`card ${flipped ? "card--flipped" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={() => handleClick(card)}
    >
      <img
        src={card.src}
        alt="card"
        className="card__image card__image--front"
      />
      <img
        src="./images/cover.png"
        alt="card"
        className="card__image card__image--back"
      />
    </div>
  );
}

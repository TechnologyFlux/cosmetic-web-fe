import React from "react";
import Link from "next/link";
import Rate from "../Other/Rate";

export default function Review(props) {
  const { avatar, name, publicDate, rate, children } = props;
  return (
    <div className="review">
      <div className="review__header">
        <div className="review__header__avatar">
          <img
            src="https://static.thenounproject.com/png/363640-200.png"
            alt="Reviewer avatar"
          />
        </div>
        <div className="review__header__info">
          <h5>{name}</h5>
          <p>{publicDate}</p>
        </div>
        <div className="review__header__rate">
          <Rate currentRate={rate} />
        </div>
      </div>
      <p className="review__content">{children}</p>
      
    </div>
  );
}

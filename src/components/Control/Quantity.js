import React, { useState, useEffect } from "react";
import classNames from "classnames";

export default function Quantity({
  className,
  defaultQuantity,
  onIncreaseProduct,
  onDecreaseProduct,
  getQuantity,
  onDecrease,
  onIncrease,
  maxValue,
}) {
  const [quantity, setQuantity] = useState(defaultQuantity || 1);

  useEffect(() => {
    getQuantity && getQuantity(quantity);
  }, [quantity, getQuantity]);

  const handleDecrease = () => {
    if (quantity < 2) {
      return;
    }
    setQuantity(quantity - 1);
    if (onDecreaseProduct) onDecreaseProduct();
    onDecrease && onDecrease();
  };

  const handleIncrease = () => {
    if (quantity >= maxValue) {
      return;
    }
    setQuantity(quantity + 1);
    if (onIncreaseProduct) onIncreaseProduct();
    onIncrease && onIncrease();
  };

  return (
    <div className={`quantity-controller ${classNames(className)}`}>
      <div className="quantity-controller__btn -decrease" onClick={handleDecrease}>
        -
      </div>
      <h5 className="quantity-controller__number">{defaultQuantity ?  defaultQuantity:quantity}</h5>
      <div className="quantity-controller__btn -increase" onClick={handleIncrease}>
        +
      </div>
    </div>
  );
}

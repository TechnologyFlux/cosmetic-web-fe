import { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

import Quantity from "../../Control/Quantity";
import AddToCart from "../../Control/AddToCart";
import Button from "../../Control/Button";
import {
  getAvaiableQuantityInCart,
  checkProductInWishList,
} from "../../../common/shopUtils";

export default function ProductDetailController({
  data,
  getQuantity,
  onAddToCart,
  onAddToWishList,
  color,
}) {
  const [quantity, setQuantity] = useState(1);
  const cartState = useSelector((state) => state?.cartReducer?.cart?.cartLineDTOS);
  const wishlistState = useSelector((state) => state.wishlistReducer);

  const avaiableProduct = getAvaiableQuantityInCart(
    cartState,
    data?.id,
    data?.quantity
  );
  return (
    <div className="product-detail__controler">
      <Quantity
        className="-border -round"
        getQuantity={(q) => {
          setQuantity(q), getQuantity(q);
        }}
        onIncreaseProduct={() => setQuantity(quantity + 1)}
        onDecreaseProduct={() => setQuantity(quantity - 1)}
        maxValue={avaiableProduct}
      />
      <AddToCart
        className={`-dark`}
        className={`-dark ${classNames({
          "-disable": quantity > avaiableProduct || data?.quantity < 1,
        })}`}
        onClick={onAddToCart}
      />
      <div className="product-detail__controler__actions">
       
      </div>
    </div>
  );
}

import { useDispatch } from "react-redux";

import { formatCurrency } from "../../../common/utils";
import { getCartByCartId, removeFromCart } from "../../../redux/actions/cartActions";
import Link from "next/link";
import { toast } from "react-toastify";

function CartItem(props) {
  const dispatch = useDispatch();
  const { image, name, price, quantity, cartId, slug } = props;
  const removeProductHandle = async(e) => {
    e.preventDefault();
    const cartId = localStorage.getItem("cart");
    await dispatch(removeFromCart(slug,cartId));
    await dispatch(getCartByCartId(cartId));
  };
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={process.env.PUBLIC_URL + image} alt="Product image" />
      </div>
      <div className="cart-item__info">
        <Link
          href={process.env.PUBLIC_URL + "/shop/product/[slug]"}
          as={process.env.PUBLIC_URL + "/shop/product/" + slug}
        >
          <a>{name}</a>
        </Link>
        <h5>{formatCurrency(price)}</h5>
        <p>
          Quantity: <span>{quantity}</span>
        </p>
      </div>
      <a className="cart-item__remove" href="#" onClick={removeProductHandle}>
        <i className="fal fa-times"></i>
      </a>
    </div>
  );
}

export default CartItem;

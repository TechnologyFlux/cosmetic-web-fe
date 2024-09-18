import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import CartItem from "./CartItem";
import ClientOnlyPortal from "../../../common/ClientOnlyPortal";
import Button from "../../Control/Button";
import { calculateTotalPrice } from "../../../common/shopUtils";
import { getCartByCartId } from "../../../redux/actions/cartActions";
import { formatCurrency } from "../../../common/utils";

function CartItemsSidebar({ showCart, setShowCart }) {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.cartReducer?.cart?.cartLineDTOS);
  const cartOverview = useSelector((state) => state?.cartReducer?.cart);

  useEffect(() => {
    const cartId = localStorage.getItem("cart");
    dispatch(getCartByCartId(cartId));
  }, [dispatch]);

  return (
    <>
      <ClientOnlyPortal selector="#cart-sidebar">
        <CSSTransition
          in={showCart}
          unmountOnExit
          timeout={200}
          classNames="cart-sidebar"
        >
          <div className="cart-items__wrapper">
            <h2>Shopping cart</h2>
            {cartState?.length === 0 ? (
              <h3 className="empty-noti">No product in cart</h3>
            ) : (
              <>
                {cartState?.length !== 0 &&
                  cartState?.map((item,index) => (
                    <CartItem
                      key={index}
                      image={item.imageUrl} 
                      name={item.title}
                      price={item.price}
                      quantity={item.quantity}
                      cartId={item?.cartId}
                      slug={item?.productId}
                    />
                  ))}
                <div className="cart-items__total">
                  <div className="cart-items__total__price">
                    <h5>Total</h5>
                    <span>{formatCurrency(cartOverview?.totalCost ? cartOverview.totalCost : 0)}</span>
                  </div>
                  <div className="cart-items__total__buttons">
                    <Button
                      width="100%"
                      action={process.env.PUBLIC_URL + "/shop/cart"}
                      color="dark"
                      content="View cart"
                    />
                    <Button
                      width="100%"
                      action={process.env.PUBLIC_URL + "/shop/checkout"}
                      color="red"
                      content="Checkout"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </ClientOnlyPortal>
      {showCart && (
        <ClientOnlyPortal selector="#overlay">
          <div className="overlay" onClick={() => setShowCart(false)}></div>
        </ClientOnlyPortal>
      )}
    </>
  );
}

export default CartItemsSidebar;

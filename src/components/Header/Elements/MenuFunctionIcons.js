import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import SearchBox from "./SearchBox";
import CartItemsSidebar from "./CartItemsSidebar";
import MobileNavSidebar from "./MobileNavSidebar";
import { formatCurrency } from "../../../common/utils";
import Link from "next/link";
import { getCartByCartId } from "../../../redux/actions/cartActions";

export default function MenuFunctionIcons(props) {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const hide = props.hide || "";
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  function calcalateTotal(arr) {
    // let total = 0;
    // arr?.forEach((item) => (total += item.price * item.cartQuantity));
    return 0;
  }
  useEffect(() => {
    const cartId = localStorage.getItem("cart");
    dispatch(getCartByCartId(cartId));
  }, []);

  return (
    <>
      <div
        className={`menu__wrapper__functions ${classNames(props.className)}`}
      >
        {!hide.includes("search") && (
          <a
            href="#"
            className="menu-icon -search"
            onClick={(e) => {
              e.preventDefault();
              setShowSearch(true);
            }}
            style={{ marginRight: hide.includes("cart") && 0 }}
          >
            <img
              src={
                props.white
                  ? process.env.PUBLIC_URL +
                    "/assets/images/header/search-icon-white.png"
                  : process.env.PUBLIC_URL +
                    "/assets/images/header/search-icon.png"
              }
              alt="Search icon"
            />
          </a>
        )}
        {!hide.includes("cart") && (
          <>
            {localStorage.getItem("cart") && (
              <Link href={process.env.PUBLIC_URL + "/user/orderPage"}>
              <a className="menu-icon -cart ">
                <img className=" "
                  src={
                    props.white
                      ? "https://static.thenounproject.com/png/3025366-200.png"
                      :
                        "https://static.thenounproject.com/png/3025366-200.png"
                  }
                  alt="Wishlist icon"
                />
              </a>
            </Link>
            )}
            <div className="menu__cart">
              <a
                href="#"
                className="menu-icon -cart"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCart(!showCart);
                }}
              >
                <img
                  src={
                    props.white
                      ? process.env.PUBLIC_URL +
                        "/assets/images/header/cart-icon-white.png"
                      : process.env.PUBLIC_URL +
                        "/assets/images/header/cart-icon.png"
                  }
                  alt="Cart icon"
                />
                <span className="cart__quantity">{cartState?.cart?.totalItems}</span>
              </a>
              <h5>
                Cart: <span>{formatCurrency(cartState?.cart?.totalFinalPrice ? cartState?.cart?.totalFinalPrice : 0)}</span>
              </h5>
            </div>
            <a
              href="#"
              className="menu-icon -navbar"
              onClick={(e) => {
                e.preventDefault();
                setShowMobileNav(!showMobileNav);
              }}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </a>
          </>
        )}
      </div>
      {/* Search input */}
      <SearchBox showSearch={showSearch} setShowSearch={setShowSearch} />
      {/* Cart sidebar */}
      <CartItemsSidebar showCart={showCart} setShowCart={setShowCart} />
      {/* Mobile navigation sidebar */}
      <MobileNavSidebar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
    </>
  );
}

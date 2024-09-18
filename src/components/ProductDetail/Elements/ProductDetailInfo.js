import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import classNames from "classnames";

import { formatCurrency } from "../../../common/utils";
import { addToCart, getCartByCartId } from "../../../redux/actions/cartActions";
import { addToWishlist } from "../../../redux/actions/wishlistActions";
import ProductDetailController from "./ProductDetailController";
import ProductDetailInfoTab from "./ProductDetailInfoTab";
import Rate from "../../Other/Rate";
import { checkProductInWishList } from "../../../common/shopUtils";

export default function ProductDetailInfo({ data1, onReviewSubmit, hideTab }) {

  const data = data1?.displayProductDTO;
  console.log(data1)
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const [quantity, setQuantity] = useState(1);
  const [otherColor, setOtherColor] = useState();
  const getQuantity = (q) => {
    setQuantity(q);
  };
  const onAddToCart = async(e) => {
    e.preventDefault();
    const cartId = localStorage.getItem("cart");
    const req = {
      productId: data?.id,
      quantity: quantity,
      cartId: parseInt(cartId),
    };
    
    await dispatch(addToCart(req));
    await dispatch(getCartByCartId(cartId));
  };
  const onAddToWishList = (e) => {
    e.preventDefault();
    let product = checkProductInWishList(wishlistState, data?.id);
    dispatch(addToWishlist(data));
    toast.dismiss();
    if (!product) {
      return toast.success("Product added to wishlist !");
    } else {
      return toast.error("Product removed from wishlist !");
    }
  };
  return (
    <div className="product-detail__content">
      <div className="product-detail__content__header">
        <h5>{data?.category}</h5>
        <h2>{data?.title}</h2>
        <div className="product-detail__content__header__comment-block">
          <Rate currentRate={data?.averageRating} />
          <p>{data1?.productReviews?.length} Reviews</p>
          
        </div>
        <h3>
          {data?.discount
            ? formatCurrency(data?.discount)
            : formatCurrency(data?.currentCost)}
          {data?.discount && <span>{formatCurrency(data?.currentCost)}</span>}
        </h3>
      </div>
      <div className="divider"></div>
      <div className="product-detail__content__footer">
        <ul>
          {data?.brandName && (
            <li>
              Brand: <span>{data?.brandName}</span>
            </li>
          )}
          {data?.categoryName && (
            <li>
              Category: <span>{data?.categoryName}</span>
            </li>
          )}
          {data?.madeIn && (
            <li>
              Made in: <span>{data.madeIn}</span>
            </li>
          )}
          {data?.capacity && (
            <li>
              Capacity: <span>{data.capacity}</span>
            </li>
          )}
          <li>
            Purchase: <span>{data?.countPurchase}</span>
          </li>
          <li>
            Availability:
            {data?.quantity > 0 ? (
              <span className="in-stock"> {data?.quantity} products</span>
            ) : (
              <span className="out-stock"> Out Stock</span>
            )}
          </li>
        </ul>
        {/* {data?.variation && (
          <div className="product-detail__colors">
            <span>Color:</span>
            {data.variation.map((color, index) => (
              <div
                key={index}
                className={`product-detail__colors__item ${classNames({
                  active: otherColor === color.color,
                })}`}
                style={{ backgroundColor: color.colorCode }}
                onClick={() => setOtherColor(color.color)}
              />
            ))}
          </div>
        )} */}
        <ProductDetailController
          data={data}
          getQuantity={getQuantity}
          onAddToCart={onAddToCart}
          onAddToWishList={onAddToWishList}
          color={otherColor}
        />
      </div>
      {!hideTab && (
        <>
          <div className="divider"></div>
          <div className="product-detail__content__tab">
            <ProductDetailInfoTab data={data1} onReviewSubmit={onReviewSubmit} />
          </div>
        </>
      )}
    </div>
  );
}

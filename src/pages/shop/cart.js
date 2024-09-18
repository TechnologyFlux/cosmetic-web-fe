import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import LayoutFour from "../../components/Layout/LayoutFour";
import Quantity from "../../components/Control/Quantity";
import Button from "../../components/Control/Button";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import {
  removeFromCart,
  removeAllFromCart,
  increaseQuantityCart,
  decreaseQuantityCart,
  updateCart,
  getCartByCartId,
  clearCart,
} from "../../redux/actions/cartActions";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function () {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const cartState = useSelector((state) => state?.cartReducer?.cart?.cartLineDTOS);
  const cartOverview = useSelector((state) => state?.cartReducer?.cart);
  const onSubmit = (data) => console.log(data);
  const cartId = parseInt(localStorage.getItem("cart"));

  const updateToCart = async (item, type) => {
    if (type === "INCREASE") {
      item.quantity = 1;
    }else{
      item.quantity = -1;
    }
    const req ={
      cartId: cartId,
      productId: item.productId,
      quantity: item.quantity
    }

    await dispatch(updateCart(req));
    await dispatch(getCartByCartId(cartId));
  }
  const removeAllProduct = async(e) => {
    const user =JSON.parse(localStorage.getItem("userData"));
    console.log(user)
    e.preventDefault();
    await dispatch(clearCart(user?.id));
    await dispatch(getCartByCartId(cartId));
    // dispatch(removeAllFromCart());
    // return toast.error("All product removed from cart");
    return null;
  };
  const removeProduct = async(e, item) => {
    e.preventDefault();
    await dispatch(removeFromCart(item?.productId, cartId));
    await dispatch(getCartByCartId(cartId));
    // dispatch(removeFromCart(cartId));
    // return toast.error("Product removed from cart");
  };
  return (
    <LayoutFour title="Cart">
      <Breadcrumb title="Shopping cart">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" />
        <BreadcrumbItem name="Shopping cart" current />
      </Breadcrumb>
      <div className="cart">
        <div className="container">
          {!cartState || cartState.length === 0 ? (
            <div className="cart__empty">
              <h3>No product in cart</h3>
              <Button
                color="dark"
                action={process.env.PUBLIC_URL + "/shop/fullwidth-4col"}
                content="Shopping now"
              />
            </div>
          ) : (
            <>
              <div className="cart__table">
                <div className="cart__table__wrapper">
                  <table>
                    <colgroup>
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "17%" }} />
                      <col style={{ width: "17%" }} />
                      <col style={{ width: "17%" }} />
                      <col style={{ width: "9%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartState.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="cart-product">
                              <div className="cart-product__image">
                                <img src={item?.imageUrl} alt={item.name} />
                              </div>
                              <div className="cart-product__content ">
                                <h5>{item.category}</h5>
                                <Link
                                  href={
                                    process.env.PUBLIC_URL +
                                    `/shop/product/${item.productId}`
                                  }
                                  as={
                                    process.env.PUBLIC_URL +
                                    "/shop/product/" +
                                    item.productId
                                  }
                                >
                                  <div
                                    className="w-48 overflow-x-hidden truncate"
                                    title={item.title}
                                  >
                                    <a>{item.title}</a>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>
                            <Quantity
                              defaultQuantity={item?.quantity}
                              onIncrease={() => updateToCart(item, "INCREASE")}
                              onDecrease={() => updateToCart(item, "DECREASE")}
                            />
                          </td>
                          <td>
                            {formatCurrency(item?.price * item?.quantity)}
                          </td>
                          <td>
                            <a
                              href={process.env.PUBLIC_URL + "#"}
                              onClick={(e) => removeProduct(e, item)}
                            >
                              <i className="fal fa-times"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cart__table__footer">
                  <Link href={process.env.PUBLIC_URL + "/shop/fullwidth-4col"}>
                    <a>
                      <i className="fal fa-long-arrow-left"></i>
                      Continue Shopping
                    </a>
                  </Link>

                  <Link href="#">
                    <a onClick={(e) => removeAllProduct(e)}>
                      <i className="fal fa-trash"></i>
                      Clear Shopping Cart
                    </a>
                  </Link>
                </div>
              </div>
              <div className="cart__total">
                <div className="row">
                  <div className="col-12 col-md-8">
                    {/* <div className="cart__total__discount">
                      <p>Enter coupon code. It will be applied at checkout.</p>
                      <div className="input-validator">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            type="text"
                            name="discountCode"
                            placeholder="Your code here"
                            ref={register({ required: true })}
                          />
                          <button className="btn -dark">Apply</button>
                        </form>
                        {errors.discountCode && (
                          <span className="input-error">
                            Please provide a discount code
                          </span>
                        )}
                      </div>
                    </div> */}
                    {cartOverview?.discount && (
                      <div className="max-w-md mx-auto my-4 overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="p-6">
                          <h2 className="mb-2 text-xl font-bold">
                            Discount Code
                          </h2>
                          <div className="flex items-center justify-between mt-4 mb-2">
                            <p className="font-bold text-gray-700">
                              Apply To: {cartOverview?.discount?.applyTo}
                            </p>
                          </div>
                          <div className="mb-2">
                            <p className="font-bold text-gray-700">
                              Discount: {cartOverview?.discount?.discountPercent}%
                            </p>
                          </div>
                          <div className="mt-4 mb-2">
                            <p className="font-bold text-gray-700">
                              Minimum Amount: {formatCurrency(cartOverview?.discount?.minAmount?.toLocaleString())} 
                            </p>
                          </div>
                          <div className="mt-4 mb-2">
                            <p className="font-bold text-gray-700">
                              Max Usage: {cartOverview?.discount?.maxUsage}
                            </p>
                          </div>
                          <div className="mt-4 mb-2">
                            <p className="font-bold text-gray-700">
                              Total Usage: {cartOverview?.discount.totalUsage}
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <p className="mr-4 font-bold text-red-600">
                              From: {new Date(cartOverview?.discount?.fromDate).toLocaleDateString()}
                            </p>
                            <p className="font-bold text-red-600">
                              To: {new Date(cartOverview?.discount?.toDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="cart__total__content">
                      <h3>Cart Total</h3>
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>{formatCurrency(cartOverview.totalCost)}</td>
                          </tr>
                          <tr>
                            <th>Discount</th>
                            <td>-{formatCurrency(cartOverview.totalCost-cartOverview.totalFinalPrice)}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td className="final-price">
                              {formatCurrency(cartOverview.totalFinalPrice)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        height={45 / 14 + "em"}
                        width="100%"
                        action={process.env.PUBLIC_URL + "/shop/checkout"}
                        color="dark"
                        content="Proceed to checkout"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { formatCurrency, formatSingleNumber } from "../../common/utils";
import { useEffect, useState } from "react";
import { getAllAddressByUserId } from "../../redux/actions/addressAction";
import { createNewOrder } from "../../redux/actions/orderAction";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartState = useSelector((state) => state?.cartReducer?.cart);
  const addressList = useSelector((state) => state?.addressReducer?.addressList);
  console.log(addressList)
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async(data) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    const orderResponse = {
      userId: user?.id,
      address: {
        id: selectedAddress?.id || cartState?.address?.id || null,
        fullName: selectedAddress ? `${selectedAddress.fullName}` : `${data.firstName} ${data.lastName}`,
        phoneNumber: selectedAddress ? selectedAddress.phoneNumber : data.phoneNumber,
        provinceName: selectedAddress ? selectedAddress.provinceName : data.provinceName,
        districtName: selectedAddress ? selectedAddress.districtName : data.districtName,
        wardName: selectedAddress ? selectedAddress.wardName : data.wardName,
        addressDetail: selectedAddress ? selectedAddress.addressDetail : data.addressDetail
      },
      discountId: cartState?.discount?.id || null
    };

    const dataOrder = await dispatch(createNewOrder(orderResponse));
    if(dataOrder){
      router.push(`/user/order/${dataOrder.order.id}`);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    dispatch(getAllAddressByUserId(user?.id));
  }, []);

  return (
    <LayoutFour title="Checkout">
      <Breadcrumb title="Checkout">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" />
        <BreadcrumbItem name="Checkout" current />
      </Breadcrumb>
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <form >
                <div className="checkout__form">
                  <div className="checkout__form__contact">
                  </div>
                  <div className="checkout__form__shipping">
                    <h5 className="checkout-title">Shipping address</h5>
                    <div className="row">
                      <div className="col-12 col-md-12">
                      <div className="input-validator ">
                      <label>
                        <div className="mb-4">
                        Your address <span>*</span>
                        </div>
                        <select
                          className="border-2 col-12 col-md-12 p-2"
                          name="addressId"
                          onChange={(e) => {
                            const address = addressList.find(
                              (addr) => addr.id === parseInt(e.target.value)
                            );
                            setSelectedAddress(address);
                          }}
                          ref={register}
                        >
                          <option value="">Select Address</option>
                          {addressList?.map((address) => (
                            <option key={address.id} value={address.id}>
                              {address.fullName} - {address.addressDetail}, {address.wardName}, {address.districtName}, {address.provinceName}
                            </option>
                          ))}
                        </select>
                      </label>
                      {errors.addressId && (
                        <span className="input-error">
                          Please select an address
                        </span>
                      )}
                    </div>
                      </div>
                    </div>
                    <h5 className="checkout-title">Create temporary address</h5>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            First name <span>*</span>
                            <input
                              type="text"
                              name="firstName"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.firstName && (
                            <span className="input-error">
                              Please provide your first name
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            Last name <span>*</span>
                            <input
                              type="text"
                              name="lastName"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.lastName && (
                            <span className="input-error">
                              Please provide your last name
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Phone number <span>*</span>
                            <input
                              type="text"
                              name="phoneNumber"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.phoneNumber && (
                            <span className="input-error">
                              Please provide your phone number
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Province/City <span>*</span>
                            <input
                              type="text"
                              name="provinceName"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.provinceName && (
                            <span className="input-error">
                              Please provide your province/city
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            District <span>*</span>
                            <input
                              type="text"
                              name="districtName"
                              ref={register(selectedAddress!=null ? {required:false} : { required: true })}
                            />
                          </label>
                          {errors.districtName && (
                            <span className="input-error">
                              Please provide your district
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Ward <span>*</span>
                            <input
                              type="text"
                              name="wardName"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.wardName && (
                            <span className="input-error">
                              Please provide your ward
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Address detail <span>*</span>
                            <input
                              type="text"
                              name="addressDetail"
                              ref={register(selectedAddress ? {} : { required: true })}
                            />
                          </label>
                          {errors.addressDetail && (
                            <span className="input-error">
                              Please provide your address detail
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </form>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-12 ml-auto">
                  <div className="checkout__total">
                    <h5 className="checkout-title">Your order</h5>
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
                      {cartState?.discount && (
                        <div className="p-6">
                          <h2 className="text-xl font-bold mb-2">Discount Code</h2>
                          <div className="mt-4">
                            <p className="text-gray-700">
                              Discount: {cartState?.discount?.discountPercent}%
                            </p>
                            <p className="text-gray-700">
                              Minimum Amount:{" "}
                              {formatCurrency(cartState?.discount?.minAmount?.toLocaleString())}
                            </p>
                            <p className="text-gray-700">
                              Max Usage: {cartState?.discount?.maxUsage}
                            </p>
                            <p className="text-gray-700">
                              Total Usage: {cartState?.discount?.totalUsage}
                            </p>
                          </div>
                          <div className="mt-4 flex">
                            <p className="text-gray-700 mr-4">
                              From:{" "}
                              {new Date(cartState?.discount?.fromDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">
                              To: {new Date(cartState?.discount?.toDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="checkout__total__price">
                      <h5>Product</h5>
                      <table>
                        <colgroup>
                          <col style={{ width: "70%" }} />
                          <col style={{ width: "30%" }} />
                        </colgroup>
                        <tbody>
                          {cartState?.cartLineDTOS?.map((item) => (
                            <tr key={item.cartId}>
                              <td>
                                <span>{formatSingleNumber(item?.quantity)}</span>{" "}
                                x {item?.title}
                              </td>
                              <td>{formatCurrency(item?.price * item?.quantity)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="checkout__total__price__total-count">
                        <table>
                          <tbody>
                            <tr>
                              <td>Subtotal</td>
                              <td>{formatCurrency(cartState?.totalCost)}</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{formatCurrency(cartState?.totalFinalPrice)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button className="btn -red" onClick={selectedAddress? onSubmit: handleSubmit(onSubmit)}>
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}

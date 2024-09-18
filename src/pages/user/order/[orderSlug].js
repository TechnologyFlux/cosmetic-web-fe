import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getOrderDetail } from '../../../redux/actions/orderAction';
import LayoutOne from '../../../components/Layout/LayoutOne';
import { formatCurrency } from '../../../common/utils';
import { Breadcrumb, BreadcrumbItem } from '../../../components/Other/Breadcrumb';
import { createAProductReview } from '../../../redux/actions/userAction';

const statusMapping = {
  'Đặt hàng thành công.': 'Order Successful.',
  'Đơn hàng đã bị hủy.': 'Canceled.',
  'Người bán đang chuẩn bị hàng.': 'Waiting for delivery.',
  'Đang giao hàng.': 'Delivering.',
  'Giao hàng thành công.': 'Successful delivery.',
  'Giao hàng không thành công.': 'Delivery failed.',
  'Đã nhận hàng.': 'Has received the goods.',
  'Trả hàng /Hoàn tiền.': 'Returns/Refund.'
};


function getStatusNumber(vietnameseStatus) {
  const englishStatus = statusMapping[vietnameseStatus];
  
  if (!englishStatus) {
    return -1; // Trả về -1 nếu trạng thái không khớp với bất kỳ trường hợp nào
  }

  switch (englishStatus) {
    case 'Order Successful.':
      return 1;
    case 'Waiting for delivery.':
      return 2;
    case 'Delivering.':
      return 3;
    case 'Successful delivery.':
      return 4;
    case 'Canceled.':
      return 5;
    case 'Returns/Refund.':
      return 6;
    default:
      return -1; // Trả về -1 nếu trạng thái không khớp với bất kỳ trường hợp nào
  }
}



const ReviewPopup = ({ product, onClose }) => {
  console.log(product);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">REVIEW</h2>
        <div className="mb-4">
          <p className="mb-2 font-medium">RATING</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium">Your review of the product</p>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle submit review
              createAProductReview({ product, rating, review });
              onClose();
            }}
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderTracking = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderReducer.orderDetail);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();
  const { orderSlug } = router.query;
  console.log(orderSlug);

  console.log(orderDetail);

  useEffect(() => {
    dispatch(getOrderDetail(orderSlug)); // call lai sau khi cancel
  }, [orderSlug]);

  

  const handleDelete = (index) => {
    const newProducts = orderDetail.orderDetail.filter((_, i) => i !== index);
    // Assuming you would update the state or dispatch an action to update the orderDetail
  };

  const cancelOrderId = async () => {
    console.log(orderDetail.order);
    console.log(orderDetail?.order?.id)
    await cancelOrder(orderDetail?.order?.id);
    router.push(`/user/order/${orderSlug}`);
  }

  return (
    <LayoutOne>
      <div className="h-32">
        <Breadcrumb>
          <BreadcrumbItem href="/" name={"Home"}></BreadcrumbItem>
          <BreadcrumbItem href="/user/order" name={"Order"}>
            My Orders
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/user/order"
            name={"OrderDetail"}
          ></BreadcrumbItem>
        </Breadcrumb>
      </div>
      {orderDetail?.order?.status == 'Đặt hàng thành công.'  && (
        <div onClick={cancelOrderId} className="flex justify-end">
        <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-10 mt-10">
          Cancel order
        </button>
      </div>
      )}

      <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-white">
        <div className="w-full p-8 bg-white rounded-lg shadow-md">
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium">Recipient's name</p>
                <p className="text-gray-700">{orderDetail?.order?.fullName}</p>
              </div>
              <div>
                <p className="font-medium">Delivery address</p>
                <p className="text-gray-700">
                  {orderDetail?.order?.addressDetail}
                </p>
              </div>
              <div>
                <p className="font-medium">Phone number</p>
                <p className="text-gray-700">
                  {orderDetail?.order?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="font-medium">Order status</p>
                <p className="text-gray-700">
                  {statusMapping[orderDetail?.order?.status]}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Order Status</h2>
            <div className="flex items-center justify-between">
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) >= 1
                        ? "bg-red-400"
                        : "bg-gray-300"
                    }`}
                  >
                    <span className="flex items-center justify-center w-full h-full font-semibold text-white">
                      1
                    </span>
                  </div>
                  <p>Order Successful</p>
                </div>
                <div
                  className={`absolute top-1/2 left-full w-80 h-1 -ml-16 ${
                    getStatusNumber(orderDetail?.order?.status) > 1
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) > 1
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full ${
                        getStatusNumber(orderDetail?.order?.status) > 1
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      2
                    </span>
                  </div>
                  <p>Waiting for delivery</p>
                </div>
                <div
                  className={`absolute top-1/2 left-full w-96 h-1 -ml-24 ${
                    getStatusNumber(orderDetail?.order?.status) > 2
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) > 2
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full ${
                        getStatusNumber(orderDetail?.order?.status) > 2
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      3
                    </span>
                  </div>
                  <p>Delivering</p>
                </div>
                <div
                  className={`absolute top-1/2 left-full w-96 h-1 -ml-14 ${
                    getStatusNumber(orderDetail?.order?.status) > 3
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) > 3
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full ${
                        getStatusNumber(orderDetail?.order?.status) > 3
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      4
                    </span>
                  </div>
                  <p>Successful delivery</p>
                </div>
                <div
                  className={`absolute top-1/2 left-full w-80 h-1 -ml-14 ${
                    getStatusNumber(orderDetail?.order?.status) > 4
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) > 4
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full ${
                        getStatusNumber(orderDetail?.order?.status) > 4
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      5
                    </span>
                  </div>
                  <p>Canceled</p>
                </div>
                <div
                  className={`absolute top-1/2 left-full w-80 h-1 -ml-14 ${
                    getStatusNumber(orderDetail?.order?.status) > 5
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`inline-block w-8 h-8 mb-2 rounded-full ${
                      getStatusNumber(orderDetail?.order?.status) > 5
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-full h-full ${
                        getStatusNumber(orderDetail?.order?.status) > 5
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      6
                    </span>
                  </div>
                  <p>Returns/Refund</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {orderDetail?.orderDetail.map((product, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex items-center">
                  <img
                    src={product.productImageUrl}
                    alt={product?.name}
                    className="object-cover w-24 h-full rounded-lg"
                  />
                  <div className="flex-1 ml-6">
                    <p className="mt-2 font-medium">{product?.productTitle}</p>
                    <p className="mt-3">Quantity: {product?.quantity}</p>
                    <p className="mt-3 font-semibold text-green-500">
                      {formatCurrency(product?.productCost)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {/* <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600"
                    >
                      Delete
                    </button> */}
                    {statusMapping[orderDetail?.order?.status] === "Successful delivery." && (
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          console.log(product);
                        }}
                        className="flex items-center px-4 py-2 font-medium text-purple-900 transition duration-150 ease-in-out border rounded-md hover:underline focus:outline-none focus:shadow-outline-purple active:bg-purple-100"
                      >
                        <span className="mr-2">&#9734;</span> Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedProduct && (
          <ReviewPopup
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </LayoutOne>
  );
};

export default OrderTracking;

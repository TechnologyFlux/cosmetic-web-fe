import React, { useEffect, useState } from 'react';
import LayoutOne from '../../components/Layout/LayoutOne';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../redux/actions/orderAction';
import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem } from '../../components/Other/Breadcrumb';
const OrderPage = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state?.orderReducer?.orderList) || [];
  const router = useRouter();
  const [filters, setFilters] = useState({
    orderPlacedSuccess: false,
    orderCancelled: false,
    sellerPreparingOrder: false,
    inTransit: false,
    deliverySuccessful: false,
    deliveryFailed: false,
    returnedAndRefunded: false,
  });
  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };
  const isAnyFilterActive = Object.values(filters).some((filter) => filter);

  const statusMapping = {
    'Đặt hàng thành công.': 'Order Success',
    'Đơn hàng đã bị hủy.': 'Order Cancelled',
    'Người bán đang chuẩn bị hàng.': 'Seller Preparing Order',
    'Đang giao hàng.': 'Delivery',
    'Giao hàng thành công.': 'Delivery Successful',
    'Giao hàng không thành công.': 'Delivery Failed',
    'Trả hàng /Hoàn tiền.': 'Return/Refunded',
  };

  const statusMappingFilter = {
    'orderPlacedSuccess': 'Order Success',
    'orderCancelled': 'Order Cancelled',
    'sellerPreparingOrder': 'Seller Preparing Order',
    'inTransit': 'Delivery',
    'deliverySuccessful': 'Delivery Successful',
    'deliveryFailed': 'Delivery Failed',
    'returnedAndRefunded': 'Returned And Refunded',
  };

  const filteredOrders = orderList.filter((order) => {
    if (!isAnyFilterActive) return true;
    return (
      (filters.orderPlacedSuccess && order.status === 'Đặt hàng thành công.') ||
      (filters.orderCancelled && order.status === 'Đơn hàng đã bị hủy.') ||
      (filters.sellerPreparingOrder && order.status === 'Người bán đang chuẩn bị hàng.') ||
      (filters.inTransit && order.status === 'Đang giao hàng.') ||
      (filters.deliverySuccessful && order.status === 'Giao hàng thành công.') ||
      (filters.deliveryFailed && order.status === 'Giao hàng không thành công.') ||
      (filters.returnedAndRefunded && order.status === 'Trả hàng /Hoàn tiền.')
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData?.id) {
      dispatch(getAllOrder(userData.id));
    }
  }, [dispatch]);
  return (
    <LayoutOne>
      <div className='h-32'>
        <Breadcrumb>
          <BreadcrumbItem href="/" name="Home" />
          <BreadcrumbItem href="/user/order" name="Order">My order</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='mt-5'>
        <div className="flex items-center justify-center bg-[#f6eeed]">
          <div className="container flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-white rounded-lg shadow h-96">
              <h2 className="mb-2 text-lg font-bold">Filter</h2>
              <div>
                <h3 className="text-sm font-semibold">Order status</h3>
                <ul>
                  {Object.keys(filters).map((filterName) => (
                    <li key={filterName}>
                      <label className="flex items-center py-2 space-x-2">
                        <input
                          type="checkbox"
                          checked={filters[filterName]}
                          onChange={() => handleFilterChange(filterName)}
                        />
                        <span>{statusMappingFilter[filterName]}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Main Content */}
            <div className="w-3/4 h-screen ml-4 space-y-4 overflow-y-auto">
              {filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex p-4 bg-white rounded-lg shadow cursor-pointer"
                  onClick={() => router.push(`/user/order/${order?.id}`)}
                >
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/icondian/icon-order-1.png"
                    alt="product"
                    className="object-cover w-24 h-24 rounded"
                  />
                  <div className="flex flex-col justify-between w-full ml-4">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="mb-2 text-sm text-gray-500">
                          {formatDate(order.orderDate)}
                        </div>
                        <div className="mb-2 text-sm text-gray-500">
                          {order.fullName}
                        </div>
                        <div className="mb-2 text-sm text-gray-500">
                          {order.phoneNumber}
                        </div>
                      </div>
                      <div className="flex-grow text-lg font-bold text-center">
                        {order.price}
                      </div>
                    </div>
                    <div className="self-end text-sm text-gray-500">
                      {statusMapping[order.status]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};
export default OrderPage;
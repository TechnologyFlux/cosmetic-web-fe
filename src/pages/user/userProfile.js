import React, { useEffect, useState } from "react";
import LayoutOne from "../../components/Layout/LayoutOne";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../redux/actions/userAction";
import Modal from "../../components/Control/Modal";
import storage from "redux-persist/lib/storage";
import { createNewAddress, deleteAddress, getAllAddressByUserId, updateAdress } from "../../redux/actions/addressAction";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.addressReducer.addressList);
  console.log(addressList);
  const [user, setUser] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const fetchUserData = async () => {
      if (userData && userData.id) {
        const data = await dispatch(getUserById(userData?.id));
        if (data) {
          setUser(data);
        }
      }
    };
    fetchUserData();
    dispatch(getAllAddressByUserId(userData?.id));
  }, [dispatch]);

  const handleAddClick = () => {
    setShowPopup(true);
    setEditIndex(-1);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = async (data) => {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      provinceName: data.provinceName,
      districtName: data.districtName,
      wardName: data.wardName,
      addressDetail: data.addressDetail,
      userId: userId,
    };

    if (editIndex === -1) {
      await dispatch(createNewAddress(body));
    } else {
      await dispatch(updateAdress({ ...body, id: addressList[editIndex].id }));
    }

    await dispatch(getAllAddressByUserId(userId));
    handleClosePopup();
  };

  const handleEditClick = (index) => {
    setShowPopup(true);
    setEditIndex(index);
  };

  const handleDeleteClick = async (address) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(address);
    await dispatch(deleteAddress(address.id));
    await dispatch(getAllAddressByUserId(userData.id));
  };

  const updateProfileUser = async () => {
    const updatedUser = {
      userId: user.id,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      userName: document.getElementById("userName").value,
      password: document.getElementById("password")?.value ||"",
    };

    await dispatch(updateUser(updatedUser));
    const data = await dispatch(getUserById(user.id));
    setUser(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setShowModal(false);
  };

  return (
    <LayoutOne>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full p-6 overflow-hidden bg-white border rounded-lg shadow max-w-7xl">
          <div className="flex flex-col w-1/2 p-4 shadow">
            <div className="px-4 py-5 text-center sm:px-6">
              <h3 className="text-lg font-bold leading-6 text-gray-900">
                User Profile
              </h3>
            </div>
            <div className="flex-grow px-4 py-5 border-t border-gray-200 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.firstName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.lastName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    User Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.userName}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              width={"40vw"}
            >
              <div className="px-6 py-4 text-2xl font-bold text-center text-white uppercase bg-red-400">
                Update Profile
              </div>
              <form
                className="px-6 py-4 border-2 rounded-2xl"
                action=""
                method="POST"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    defaultValue={user?.firstName}
                    placeholder="Enter your first name"
                  ></input>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    defaultValue={user?.lastName}
                    placeholder="Enter your last name"
                  ></input>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="userName"
                  >
                    User Name
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="userName"
                    type="text"
                    defaultValue={user?.userName}
                    placeholder="Enter your user name"
                  ></input>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    placeholder="Enter your email"
                  ></input>
                </div>
                <div className="mb-4">
                  <button
                    type="button"
                    className="px-4 py-2 font-medium text-white bg-red-400 rounded hover:bg-red-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide Password" : "Change Password"}
                  </button>
                </div>
                {showPassword && (
                  <div className="mb-4">
                    <label
                      className="block mb-2 font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    ></input>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(false);
                    }}
                    className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={updateProfileUser}
                  >
                    Update
                  </button>
                </div>
              </form>
            </Modal>
          </div>
          <div className="w-1/2 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Address Account</h2>
              <button
                className="px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-red-400 rounded-md hover:bg-red-400 focus:outline-none focus:shadow-outline-green active:bg-green-600"
                onClick={handleAddClick}
              >
                Add
              </button>
            </div>
            <div className="relative w-full h-full p-8 overflow-y-auto bg-white rounded-lg shadow-md">
              <div className="space-y-6">
                <div className="h-5">
                  {addressList?.map((address, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            Full Name: {address.fullName}
                          </p>
                          <p className="font-medium">
                            Phone Number: {address.phoneNumber}
                          </p>
                          <p className="font-medium">
                            Province: {address.provinceName}
                          </p>
                          <p className="font-medium">
                            District: {address.districtName}
                          </p>
                          <p className="font-medium">
                            Ward: {address.wardName}
                          </p>
                          <p className="font-medium">
                            Address Detail: {address.addressDetail}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
                            onClick={() => handleEditClick(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600"
                            onClick={() => handleDeleteClick(address)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showPopup && (
              <PopupForm
                onClose={handleClosePopup}
                onSubmit={handleFormSubmit}
                initialData={editIndex !== -1 ? addressList[editIndex] : null}
              />
            )}
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};
const PopupForm = ({ onClose, onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    provinceName: "",
    districtName: "",
    wardName: "",
    addressDetail: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2">
        <h2 className="mb-4 text-xl font-semibold">Delivery Address</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Province"
            name="provinceName"
            value={formData.provinceName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="District"
            name="districtName"
            value={formData.districtName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Ward"
            name="wardName"
            value={formData.wardName}
            onChange={handleChange}
          />
          <textarea
            className="w-full p-2 mb-4 border rounded"
            placeholder="Address Detail"
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
          ></textarea>
          <button className="w-full px-4 py-2 font-medium text-white bg-red-400 rounded hover:bg-red-400">
            Place Order
          </button>
        </form>
        <button
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

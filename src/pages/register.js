import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { registerUSer } from '../redux/actions/userAction';
import router from 'next/router';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error('Mật khẩu không khớp nhau');
      return;
    }
    const signupData = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    };
    console.log(signupData);
    const res = await registerUSer(signupData);
    if (res) {
      toast.success('Registration Successful!');
      router.push('/login');
    } else {
      toast.error('The Email was registered. Please enter another Email.');
      return;
    }
    // Gửi signupData tới server hoặc xử lý dữ liệu ở đây
  };

  return (
    <div className="flex items-center justify-center h-screen px-5 lg:px-0">
      <div className="flex justify-center flex-1 max-w-screen-xl bg-white border shadow sm:rounded-lg">
        <div className="flex-1 hidden text-center bg-white md:flex">
          <div
            className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
            style={{
              backgroundImage: `url(https://www.shutterstock.com/image-photo/three-cosmetic-product-mockups-on-600nw-1970466164.jpg)`,
            }}
          ></div>
        </div>
        <div className="p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
          <div className="flex flex-col items-center ">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-blue-900 xl:text-4xl">
                Sign up
              </h1>
            </div>
            <div className="flex-1 w-full mt-8">
              <form onSubmit={handleSubmit} className="flex flex-col max-w-xs gap-4 mx-auto">
                <input
                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                <input
                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <div className="relative w-full">
                  <input
                    className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <button className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-center text-gray-600">
                  Already have an account?{" "}
                  <a href={process.env.PUBLIC_URL + "/login"}>
                    <span className="font-semibold text-blue-900">Login</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

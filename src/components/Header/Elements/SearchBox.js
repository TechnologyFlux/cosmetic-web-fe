import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";

import outsideClickHandle from "../../../common/ElementOutsideClick";
import { searchProduct } from "../../../redux/actions/homeAction";
import { useRouter } from "next/router";

export default function SearchBox({ showSearch, setShowSearch }) {
  const { register, handleSubmit, watch } = useForm();
  const wrapperRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  outsideClickHandle(wrapperRef, () => {
    setShowSearch(false);
    setShowSuggestions(false);
  });

  const searchValue = watch("search");

  useEffect(() => {
    if (searchValue) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchValue]);

  function onSubmit(data) {
    console.log(data);
  }

  const onChaneValue = async(e) => {

    console.log(e.target.value)
    const data = await searchProduct(e.target.value);
    setSuggestions(data)
  }

  return (
    <CSSTransition
      in={showSearch}
      unmountOnExit
      timeout={200}
      classNames="search-box"
    >
      <div ref={wrapperRef} className="relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center p-2 border rounded-md shadow-md w-64"
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            onChange={(e) => onChaneValue(e)}
            name="search"
            ref={register}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-2 p-2 focus:outline-none">
            <img
              src="/assets/images/header/search-icon.png"
              alt="Search icon"
              className="w-6 h-6"
            />
          </button>
        </form>
        {showSuggestions && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10 shadow-lg max-h-96 overflow-y-scroll">
            <ul className="list-none p-0 m-0">
              {suggestions.length ? (
                <>
                  {suggestions?.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                      onClick={() => {router.push(`/shop/product/${suggestion.id}`)}}
                    >
                      {suggestion.imageUrl && (
                        <img
                          src={suggestion.imageUrl}
                          alt="Suggestion"
                          className="w-12 h-12 object-cover mr-4"
                        />
                      )}
                      <span className="text-sm">{suggestion.title}</span>
                    </li>
                  ))}
                </>
              ) : (
                <li className="p-2 cursor-pointer hover:bg-gray-200 flex items-center">
                  <span className="text-sm">"Item not found!"</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}

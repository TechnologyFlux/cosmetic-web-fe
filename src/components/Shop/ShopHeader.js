import { useState, useEffect } from "react";
import Select from "../Control/Select";
import { shop } from "../../common/variables";
import { useDispatch, useSelector } from "react-redux";

import {getDataHomepage1} from "../../redux/actions/homeAction"
export default function ShopHeader({
  
  curentView,
  getCurrentView,
  getCurrentSort,
}) {
  const dispatch = useDispatch();
  const dataSlideOne = useSelector((pReducer) => pReducer?.homepage1Reducer?.productHomepage1
);
  console.log(dataSlideOne);
  useEffect(() => {
    dispatch(getDataHomepage1());
  }, []);
  const [view, setView] = useState(curentView ? curentView : shop.DEFAULT_VIEW);
  useEffect(() => {
    getCurrentView && getCurrentView(view);
  }, [view]);

  return (
    <div className="shop-header">
      <div className="shop-header__view">
        <div className="shop-header__view__icon">
          <a
            href={process.env.PUBLIC_URL + "#"}
            className={view === "grid" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setView("grid");
            }}
          >
            <i className="fas fa-th"></i>
          </a>
          <a
            href={process.env.PUBLIC_URL + "#"}
            className={view === "list" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setView("list");
            }}
          >
            <i className="fas fa-bars"></i>
          </a>
        </div>
        {view === "grid" && (
          <h5 className="shop-header__page">Shop Fullwidth 4 Columns</h5>
        )}
      </div>
      <Select options={shop.SORT_TYPES} getValue={getCurrentSort} />
    </div>
  );
}

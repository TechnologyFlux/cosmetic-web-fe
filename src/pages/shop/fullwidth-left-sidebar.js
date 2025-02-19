import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paginator from "react-hooks-paginator";

import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { getProductbyFilter } from "../../common/productSelect";
import LayoutFour from "../../components/Layout/LayoutFour";
import productData from "../../data/products.json";
import ShopProducts from "../../components/Shop/ShopProducts";
import ShopHeader from "../../components/Shop/ShopHeader";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import ShopSidebar from "../../components/Shop/ShopSidebar";
import { getAllProductWithFilter } from "../../redux/actions/productAction";

export default function () {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.shopReducers.filter);
  const dataProduct = useSelector((state) => state.productReducer?.productData?.displayProductDTOS);
  console.log(dataProduct)
  const pageLimit = 12;
  const [offset, setOffset] = useState(0);
  const [currentView, setCurrentView] = useState();
  const [currentSort, setCurrentSort] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(dataProduct);
  // useEffect(() => {
  //   let sortedProduct = getProductbyFilter(dataProduct, currentSort);
  //   setCurrentData(sortedProduct?.slice(offset, offset + pageLimit));
  //   dispatch(getAllProductWithFilter({titleProduct: "", categoryName: "", sortCode: currentSort}))
  // }, [offset, currentSort, filterData]);

  useEffect(() => {
    // let sortedProduct = getProductbyFilter(dataProduct, currentSort);
    // setCurrentData(sortedProduct?.slice(offset, offset + pageLimit));
    dispatch(getAllProductWithFilter({titleProduct: "", categoryName: "", sortCode: currentSort}))
  }, [offset, currentSort]);

  useEffect(() => {
    let sortedProduct = getProductbyFilter(
      dataProduct,
      currentSort,
      filterData.category,
      filterData.priceRange.from,
      filterData.priceRange.to,
      filterData.brand
    );
    setCurrentData(sortedProduct);
  }, [offset, currentSort, filterData]);

  useEffect(() => {
    setCurrentData(dataProduct);
  }, [dataProduct]);
  return (
    <LayoutFour title="Shop Fullwidth Left Sidebar" container="wide">
      <Breadcrumb title="Shop">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" current />
      </Breadcrumb>
      <div className="shop -five-col">
        <div className="container-full-half">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3 col-xl-2">
              <ShopSidebar />
            </div>
            <div className="col-12 col-md-8 col-lg-9 col-xl-10">
              <ShopHeader
                view={currentView}
                getCurrentSort={setCurrentSort}
                getCurrentView={(view) => setCurrentView(view)}
              />
              {!currentData || currentData.length === 0 ? (
                <h1>No product found</h1>
              ) : (
                <>
                  <ShopProducts
                    gridColClass="col-12 col-sm-6 col-lg-4 col-xl-3"
                    listColClass="col-12 col-xl-6"
                    view={currentView}
                    data={currentData.slice(offset, offset + pageLimit)}
                  />

                  <Paginator
                    pageContainerClass="paginator"
                    totalRecords={currentData.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}

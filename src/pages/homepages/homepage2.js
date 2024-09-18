import LayoutTwo from "../../components/Layout/LayoutTwo";
import SliderTwo from "../../components/Sections/Slider/SliderTwo";
import sliderData from "../../data/slider/sliderTwo.json";

import ProductTabOne from "../../components/Sections/ProductThumb/ProductTab/ProductTabOne";
import productTabOneData from "../../data/products.json";


import Benefits from "../../components/Other/Benefits";

import { shop } from "../../common/variables";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductWithFilter } from "../../redux/actions/productAction";

export default function homepage1() {
  console.log("productTabOneData", productTabOneData);
  const dispatch = useDispatch();
  const dataProduct = useSelector((pReducer) => pReducer?.productReducer?.productData);
  console.log(dataProduct);

  useEffect(() => {
    dispatch(getAllProductWithFilter({titleProduct: "", categoryName: "", sortCode: 1}))
  }, []);

  return (
    <LayoutTwo title="Homepage 2">
      <SliderTwo className="-style-2" data={sliderData} showDots />
      
      <ProductTabOne data={dataProduct?.displayProductDTOS} categories={shop.CATEGORISE} />
      
      {/* <BlogOne data={blogOneData.slice(0, 4)} /> */}
      
      <Benefits />
      
    </LayoutTwo>
  );
}

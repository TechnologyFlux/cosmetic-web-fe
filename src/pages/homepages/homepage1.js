import LayoutOne from "../../components/Layout/LayoutOne";
import SliderTwo from "../../components/Sections/Slider/SliderTwo";
import sliderData from "../../data/slider/sliderOne.json";
import IntroductionOne from "../../components/Sections/Introduction/IntroductionOne";
import introductionOneData from "../../data/introduction/introductionOne.json";
import IntroductionTwo from "../../components/Sections/Introduction/IntroductionTwo";
import introductionTwoData from "../../data/introduction/introductionTwo.json";
import ProductSlideOne from "../../components/Sections/ProductThumb/ProductSlide/ProductSlideOne";
import productSlideOneData from "../../data/products.json";

import testimonialOneData from "../../data/testimonial/data.json";
import TeamOne from "../../components/Sections/Team/TeamOne";
import teamOneData from "../../data/team/teamOne.json";
import CTAOne from "../../components/Sections/CallToAction/CTAOne";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getDataHomepage1} from "../../redux/actions/homeAction"

export default function homepage1() {
  const dispatch = useDispatch();
  const dataSlideOne = useSelector((pReducer) => pReducer?.homepage1Reducer?.productHomepage1
);
  console.log(dataSlideOne);
  useEffect(() => {
    dispatch(getDataHomepage1());
  }, []);
  return (
    <LayoutOne title="Homepage 1" data={sliderData} className="-style-1">
      
      <SliderTwo data={sliderData} className="-style-1" showDots />
      <IntroductionOne data={introductionOneData} />
      <IntroductionTwo data={introductionTwoData} />
      <ProductSlideOne data={dataSlideOne?.displayProductDTOS} />

    </LayoutOne>
  );
}

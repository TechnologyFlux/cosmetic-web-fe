import React from 'react';
import Slider from 'react-slick';
import Button from '../../Control/Button';
import { PrevArrow, NextArrow } from '../../Other/SliderArrow';

export default function IntroductionNine() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="introduction-nine">
      <div className="introduction-nine__logos">
        <div className="container">
          <Slider {...settings}>
            {Array.from(Array(7), (e, i) => {
              return (
                <div key={i} className="slide__item">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/introduction/IntroductionNine/${
                        i + 1
                      }.png`
                    }
                    alt="Brand item"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="container">
        <div className="introduction-nine__content">
          <h3 className="italic text-black" style={{ fontSize: '15px' }}>
            “Save The Best For You” – Slogan as well as mint's operating orientation. We work with the goal and orientation of bringing the best products to everyone. So maybe at Mint you can't find a variety of products like at a drugstore, because the "best" Mint has already "selected" for you :).
          </h3>
          <Button action="#" color="white" content="ALL NEW ITEMS" />
        </div>
      </div>
    </div>
  );
}

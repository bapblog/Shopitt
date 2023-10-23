import React, { FC } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getProductsList } from "../../../assets/data/data";
import { getRandomProducts } from "../../../utils/utility";
import { NextBtn, PreviousBtn } from "../Banner/SliderBanner";
import HeroSlideProduct from "./HeroSlideProduct";

type Props = {
  title: string;
};
export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 1,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const HeroProductSlider: FC<Props> = ({ title }) => {
  return (
    <section className="bg-white w-full shadow overflow-hidden">
      {/* <!-- header --> */}
      <div className="flex px-6 py-3 justify-between items-center">
        <h1 className="text-xl font-medium">{title}</h1>
        <Link
          to="/products"
          className="bg-[#00FAFF] shadow-yellow-200 shadow-sm text-xs font-medium text-gray-800 px-5 py-2.5 rounded-sm shadow-lg"
        >
          VIEW ALL
        </Link>
      </div>
      <hr />
      {/* <!-- header --> */}

      <Slider {...settings}>
        {getRandomProducts(getProductsList, 12).map((item, i) => (
          <HeroSlideProduct {...item} key={i} />
        ))}
      </Slider>
    </section>
  );
};

export default HeroProductSlider;

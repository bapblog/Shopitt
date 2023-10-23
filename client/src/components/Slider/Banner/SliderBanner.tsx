import React, { ReactElement, FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderBanner.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import gadgetSale from "../../../assets/images/Banners/gadget-sale.jpg";
import kitchenSale from "../../../assets/images/Banners/kitchen-sale.jpg";
import poco from "../../../assets/images/Banners/poco-m4-pro.webp";
import realme from "../../../assets/images/Banners/realme-9-pro.webp";
import fashionSale from "../../../assets/images/Banners/fashionsale.jpg";
import oppo from "../../../assets/images/Banners/oppo-reno7.webp";

type SlideBtnProps = {
  className?: string;
  onClick?: () => void;
};

export const PreviousBtn: FC<SlideBtnProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <MdOutlineArrowBackIosNew color="black" size={"1.8rem"} />;
    </div>
  );
};
export const NextBtn: FC<SlideBtnProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <MdOutlineArrowForwardIos color="black" size={"1.8rem"} />
    </div>
  );
};

const SliderBanner: React.FC = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn className="className" />,
    nextArrow: <NextBtn className="className" />,
  };
  const slides: string[] = [
    gadgetSale,
    kitchenSale,
    poco,
    fashionSale,
    realme,
    oppo,
  ];
  return (
    <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((item: string, ind: number): ReactElement => {
          return (
            <img
              draggable="false"
              className="h-44 sm:h-72 w-full object-cover"
              src={item}
              alt="banner"
              key={ind}
            />
          );
        })}
      </Slider>
    </section>
  );
};

export default SliderBanner;

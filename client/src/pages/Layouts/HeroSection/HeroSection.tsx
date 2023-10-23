import React from "react";
import SliderBanner from "../../../components/Slider/Banner/SliderBanner";
import HeroProductSlider from "../../../components/Slider/OfferProduct/HeroProductSlider";
import HeroCategories from "./HeroCategories";
import HeroFeatures from "./HeroFeatures";

type Props = {};

const HeroSection: React.FC = (props: Props) => {
  return (
    <>
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        {/*Hero Section - Banner */}
        <SliderBanner />
        {/* Main Categories*/}
        <HeroCategories />
        <HeroProductSlider title={"Discounts for You"} />
        <HeroFeatures />
        <HeroProductSlider title={"More To Explore"} />
        {/* <div className=" bg-white w-full py-4 shadow-sm shadow-yellow-200"></div> */}
      </main>
    </>
  );
};

export default HeroSection;

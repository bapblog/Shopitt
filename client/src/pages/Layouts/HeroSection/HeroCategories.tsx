import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getPrdCategory } from "../../../assets/data/data";
import { prdCatProps } from "../../../types/types";
type Props = {}
// Card for Hero Category Section 
const HeroCategoryCard:FC<prdCatProps> = ({ src, title, route }) => {
    return (
        <>
          <Link
            to={route}
            className="card relative flex flex-col flex-nowrap justify-center items-center"
          >
            <div>
              <img
                src={src}
                alt={title}
                className="relative w-full h-full object-cover  shadow-lg  shadow-yellow-200 rounded-xl hover:transition-opacity hover:opacity-70 "
              />
              <h1 className="absolute top-2/4 right-2/4">
                <strong className="text-2xl font-normal text-slate-800 italic">{title}</strong>
              </h1>
            </div>
          </Link>
        </>
      );
}

const HeroCategories: FC = (props: Props) => {
  return (
    <div className="cards-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2  w-full md:p-4 scale-90 -my-10  mx-auto">
      {getPrdCategory.map((item,ind) => {
        return (
            <HeroCategoryCard src={item.src} title={item.title} route={item.route}/>
        )
      })}
    </div>
  );
};

export default HeroCategories;

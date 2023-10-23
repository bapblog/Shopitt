import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { navCategories, navCategory } from "../../../assets/data/data";

type Props = {};

const Categories: FC<Props> = () => {
  return (
    <div className="categories flex flex-nowrap self-end gap-6 text-xl font-semibold font-sarif">
      {navCategory.map((el: navCategories, ind: number):ReactNode => {
        return (
          <Link to={`/${el.link}`} className="font-bold">
            <span className=" text-base text-gray-800 font-medium group-hover:text-primary-blue uppercase">{el.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;

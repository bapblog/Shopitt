import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Icon } from "../../../utils/utility";
import { IconProps } from "../../../types/types";
const IconBtn: IconProps[] = [
  {
    route: "account",
    src: <FiUser size={"1.5rem"} color={"black"} />,
    img: true,
  },
  {
    route: "wishlist",
    src: <AiFillHeart size={"1.5rem"} color={"black"} />,
    img: true,
  },
  {
    route: "cart",
    src: <HiOutlineShoppingBag size={"1.5rem"} color={"black"} />,
    img: true,
  },
];
const IconBtnBar: React.FC = () => {
  return (
    <div className="flex flex-nowrap justify-center items-center gap-6">
      {IconBtn.map((item: IconProps, ind: number) => {
        return <Icon route={item.route} src={item.src} img={item.img} />;
      })}
    </div>
  );
};

export default IconBtnBar;

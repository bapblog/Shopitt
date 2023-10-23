import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

// dummy json product prop
export type ProductsProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

const Product: FC<ProductsProps> = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // const { wishlistItems } = useSelector((state) => state.wishlist);

  // const itemInWishlist = wishlistItems.some((i) => i.product === _id);

  const addToWishlistHandler = () => {
    // if (itemInWishlist) {
    //     dispatch(removeFromWishlist(_id));
    //     enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    // } else {
    //     dispatch(addToWishlist(_id));
    //     enqueueSnackbar("Added To Wishlist", { variant: "success" });
    // }
    enqueueSnackbar("Added To Wishlist", { variant: "success" });
  };
  return (
    <div className="flex flex-col items-start gap-1.5 px-4 py-6 relative hover:shadow-xl hover:scale-105 rounded-lg">
      {/* <!-- image & product title --> */}
      <Link
        to={`/product/${id}`}
        className="flex flex-col items-center text-center group"
      >
        <div className="w-44 h-48">
          <img
            draggable="false"
            className="w-full h-full object-contain"
            src={images && images[0]}
            alt=""
          />
        </div>
        <h2 className="text-base mt-4 group-hover:text-[#44318D] text-left">
          {title.length > 85 ? `${title.substring(0, 85)}...` : title}
        </h2>
      </Link>
      {/* /////////////////////*/}

      {/* <!-- product description --> */}
      <div className="flex flex-row-reverse  justify-around gap-6 ">
        {/* <!-- rating badge --> */}
        <div className="text-base text-gray-500 font-medium flex gap-2 items-center">
          <span className={`text-sm px-1 py-0.1 ${Number(rating.toFixed(1)) < 3 ? 'bg-red-600' : Number(rating.toFixed(1)) < 4.5 ? 'bg-yellow-400': 'bg-green-600' }  rounded-sm text-black flex items-center gap-0.5 `}>
            {rating.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
          </span>
          {/* <span>({numOfReviews})</span> */}
        </div>
        {/* <!//////////////////////////////e --> */}

        {/* <!-- price container --> */}
        <div className="flex items-center gap-1.5 text-md font-bold">
          <span>₹{price.toLocaleString()}</span>
          {/* <span className="text-gray-500 line-through text-xs">₹{}</span> */}
          <span className="text-xs  text-green-600">
            {discountPercentage}%&nbsp;off
          </span>
        </div>
        {/* <!-- //////////////////////////// --> */}
      </div>
      {/* <!-- product description --> */}
      <h2 className="text-sm mt-4 group-hover:text-blue text-left">
        {description.length > 50
          ? `${description.substring(0, 50)}...`
          : description}
      </h2>
      {/* /////////////////////////////////////// */}
      <h2>
        <span className="text-base text-[#282C31]">
          free delivery
        </span>
      </h2>
      {/* /////////////////////////////          */}
      {/* <!-- wishlist  --> */}
      {/* <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} absolute top-6 right-6 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span> */}
      <span
        onClick={addToWishlistHandler}
        className={` text-black hover:text-red-500  absolute top-6 right-6 cursor-pointer`}
      >
        <FavoriteIcon sx={{ fontSize: "18px" }} />
      </span>
      {/* /////////////////////////////////////// */}
    </div>
  );
};

export default Product;

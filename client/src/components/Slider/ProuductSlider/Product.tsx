import React,{FC} from 'react'
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { ProductsProps } from '../../../pages/AllProducts/Product';
import { useAppDispatch } from '../../../redux/hooks';
import { useSnackbar } from 'notistack';


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
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const wishlistItems = false;
    const itemInWishlist = false;

    const addToWishlistHandler = () => {
        // if(itemInWishlist) {
        //     dispatch(removeFromWishlist(_id));
        //     enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        // } else {
        //     dispatch(addToWishlist(_id));
        //     enqueueSnackbar("Added To Wishlist", { variant: "success" });
        // }
        enqueueSnackbar("Added To Wishlist", { variant: "success" });

    }

    return (
        <div className="flex flex-col items-center gap-2 px-2 py-6 relative">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${id}`} className="flex flex-col items-center text-center group">
                <div className="w-36 h-36">
                    <img draggable="false" className="w-full h-full object-contain" src={images[0]} alt={title} />
                </div>
                <h2 className="text-sm mt-4 group-hover:text-primary-blue">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-center">
                {/* <!-- rating badge --> */}
                <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{rating.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                    {/* <span>({numOfReviews.toLocaleString()})</span> */}
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    {/* <span className="text-gray-500 line-through text-xs">₹{cuttedPrice.toLocaleString()}</span> */}
                    <span className="text-xs text-primary-green">{discountPercentage}%&nbsp;off</span>
                </div>
                {/* <!-- price container --> */}
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} absolute top-5 right-2 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "16px" }} /></span>
            {/* <!-- wishlist badge --> */}

        </div>
    );
}

export default Product
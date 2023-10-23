import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Metadata from '../Layouts/Header/Metadata';
import Loader from '../Layouts/Loader';
import { useGetProductQuery } from '../../redux/api/productApi';
import { getDeliveryDate } from '../../utils/utility';
import { setProduct } from '../../redux/Slice/productSlice';
import ProductSlider from '../../components/Slider/ProuductSlider/ProductSlider';
import './dotClass.css'
type Props = {}
interface CustomPagingProps {
    index: number;
    onClick: () => void;
}
  
  
const ProductPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();


  
  const proudctId = Number(params.id);
  const {data,isLoading,isError,isSuccess} = useGetProductQuery(proudctId);
  const {product} = useAppSelector((state) => state.product);
  


 const CustomPaging: React.FC<CustomPagingProps> = ({ index, onClick }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <div onClick={onClick} >
        <img src={product?.images[index]} alt={product?.title} className='w-full h-full object-cover' />
    </div>
  );
const settings = {
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  customPaging: (i: number) => <CustomPaging index={i} onClick={() => console.log('click customPaging')} />,
  dots: true,
  dotsClass: "slick-dots custom-dot",
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
  }

  const addToWishlistHandler = () => {
    
      enqueueSnackbar("Added To Wishlist", { variant: "success" });

  }

  const addToCartHandler = () => {
      enqueueSnackbar("Product Added To Cart", { variant: "success" });
  }

  const itemInCart = false;

  const gotoBag = () => {
      navigate('/cart');
  }

  useEffect(() => {
    if(isError){
      enqueueSnackbar(isError, { variant: "error" });
    }
    if(isSuccess){
      dispatch(setProduct(data))
    }
  },[data, dispatch, enqueueSnackbar, isError, isSuccess])
  


  return (
    <>
        {isLoading ? <Loader /> : (
            <>
                <Metadata title={`${product?.title}` || 'Product Title'  } />
                <main className="mt-12 sm:mt-0 relative">

                    {/* <!-- product image & description container --> */}
                    <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2">

                        {/* <!-- image wrapper --> */}
                        <div className="w-full sm:w-2/5 md:w-3/5 sm:sticky top-16 sm:h-screen">
                            {/* <!-- image box --> */}
                            <div className="flex flex-col gap-3 m-3">
                                <div className="w-full h-full pb-6 border relative">
                                    <Slider {...settings} className='flex-col gap-5'>
                                        {product?.images.map((item, i) => (
                                            <img draggable="false" className="w-full h-96 object-contain" src={item} alt={product?.title} key={i} />
                                        ))}
                                    </Slider>
                                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                        <span onClick={addToWishlistHandler} className={` text-gray-300 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- image box --> */}
                        </div>
                        {/* <!-- image wrapper --> */}
                        {/* Left SIde */}
                        {/* <!-- product desc wrapper --> */}
                        <div className="flex-1 py-2 px-3">

                            {/* <!-- whole product description --> */}
                            <div className="flex flex-col gap-2 mb-4">

                                <h2 className="text-2xl font-bold">{product?.title}</h2>
                                {/* <!-- rating badge --> */}
                                <div className="text-base text-gray-500 font-medium flex gap-2 items-center">
                                    <span className={`text-sm px-1 py-0.1 ${Number(product?.rating.toFixed(1)) < 3 ? 'bg-red-600' : Number(product?.rating.toFixed(1)) < 4.5 ? 'bg-yellow-400': 'bg-green-600' }  rounded-sm text-black flex items-center gap-0.5 `}>
                                            {product?.rating.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                </div>
                                {/* <!-- rating badge --> */}

                                {/* <!-- price desc --> */}
                                <span className="text-green-600 text-sm font-medium">Special Price</span>
                                <div className="flex items-baseline gap-2 text-3xl font-medium">
                                    <span className="text-gray-800">₹{product?.price?.toLocaleString()}</span>
                                    {/* <span className="text-base text-gray-500 line-through">₹{product.cuttedPrice?.toLocaleString()}</span> */}
                                    <span className="text-base text-green-800">{product?.discountPercentage}%&nbsp;off</span>
                                </div>
                                {(0 && product?.stock) <= 10 && (0 && product?.stock) > 0 && (
                                    <span className="text-red-500 text-sm font-medium">Hurry, Only {(0 && product?.stock)} left!</span>
                                )}
                                {/* <!-- price desc --> */}

                                {/* <!-- banks offers --> */}
                                <p className="text-md font-medium">Available offers</p>
                                {Array(3).fill("").map((el, i) => (
                                    <p className="text-sm flex items-center gap-1" key={i}>
                                        <span className="text-green-400"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                        <span className="font-medium ml-2">Bank Offer</span> 15% Instant discount on first HDFC Pay Later order of 500 and above <Link className="text--blue font-medium" to="/">T&C</Link>
                                    </p>
                                ))}
                                {/* /////////////////////////////////////// */}
                                {/* <!-- delivery details --> */}
                                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                    <p className="text-gray-500">Delivery</p>
                                    <span>Delivery by {getDeliveryDate()}</span>
                                </div>
                                {/* /////////////////////////////////////////// */}
                                {/* <!-- Add to Bag btn --> */}
                                <div className="w-full flex gap-3  sticky md:static top-0 ">
                                    {product && product?.stock > 0 && (
                                        <button onClick={itemInCart ? gotoBag : addToCartHandler} className="px-2 py-1 w-full md:w-1/2 flex items-center justify-between gap-2 text-white bg-black rounded-sm shadow font-bold hover:shadow-xl hover:bg-[#00FAFF] hover:text-black">
                                            {itemInCart ? "GO TO BAG" : "ADD TO BAG"}
                                            <div>
                                                <TrendingFlatIcon fontSize='large' />
                                                <ShoppingBagIcon />
                                            </div>
                                            
                                        </button>
                                    )}
                                </div>
                                {/* /////////////////////////////////////// */}

                                    {/* <!-- Services details --> */}
                                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Services</p>
                                        <ul className="flex flex-col gap-2">
                                            <li>
                                                {/* <p className="flex items-center gap-3"><span className="text--blue"><VerifiedUserIcon sx={{ fontSize: "18px" }} /></span> {product.warranty} Year</p> */}
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3"><span className="text--blue"><CachedIcon sx={{ fontSize: "18px" }} /></span> 7 Days Replacement Policy</p>
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3"><span className="text--blue"><CurrencyRupeeIcon sx={{ fontSize: "18px" }} /></span> Cash on Delivery available</p>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* ///////////////////////////////////// */}
                                {/* </div> */}

                                {/* <!-- Seller details --> */}
                                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                    <p className="text-gray-500">Seller</p>
                                    <Link className="font-medium text--blue ml-3" to="/">{product?.brand }</Link>
                                </div>
                                {/* /////////////////////////////////////////// */}

                                {/* <!-- Description details --> */}
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                    <p className="text-gray-500 font-medium">Description</p>
                                    <span>{product?.description}</span>
                                </div>
                                {/* /////////////////////// */}
                                {/* <!-- Border box --> */}
                                <div className="w-full mt-6 rounded-sm border flex flex-col">
                                    <h1 className="px-6 py-4 border-b text-2xl font-medium">Product Description</h1>
                                    <div className="p-6">
                                        <p className="text-sm">{product?.description}</p>
                                    </div>
                                </div>
                                {/* /////////////////////////////////// */}

                            </div>

                        </div>
                        {/* <!-- product Desc wrapper --> */}

                    </div>
                    {/* <!-- product image & description container --> */}

                    {/* Sliders */}
                    <div className="flex flex-col gap-3 mt-6">
                        <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />
                    </div>

                </main>
            </>
        )}
    </>
);
}

export default ProductPage
import React,{FC} from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useAppSelector } from '../../../redux/hooks';
import { getRandomProducts } from '../../../utils/utility';
import {settings} from '../OfferProduct/HeroProductSlider'
import Product from './Product';
type Props = {
    title: string;
    tagline: string;
}
;
const ProductSlider:FC<Props> = ({title,tagline}) => {

    const {products,loading} = useAppSelector((state) => state.product);
    console.log(products,loading)
    return (
        <section className="bg-white w-full shadow overflow-hidden border">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                <Link to="/products" className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg uppercase">view all</Link>
            </div>
            <hr />
            
            {loading ? null :
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {products && getRandomProducts(products, 12).map((product) => (
                        <Product {...product}  />
                    ))}
                </Slider>
            }
        </section>
    );
}

export default ProductSlider
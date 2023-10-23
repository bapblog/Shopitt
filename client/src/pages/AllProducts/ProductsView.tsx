import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetCategoriesProductQuery,
  useGetProductPerPageQuery,
} from "../../redux/api/productApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../Layouts/Loader";
import Product, { ProductsProps } from "./Product";
import { Pagination } from "@mui/material";
type Props = {};

const ProductsView = (props: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { name } = useParams();
//   console.log(name);

  const location = useLocation();

  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );

  // pagination
  const [skip, setSkip] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductsProps[]>();
  // To get Product Per Page - Implementing Pagination
  const { data, isLoading, isError } = useGetProductPerPageQuery(
    12 * (currentPage - 1),
    { skip }
  );
  // Products by categories
  const { data: categoryProduct } = useGetCategoriesProductQuery(category);
  // Getting data from ProductSlice
  const { resultPerPage, productsCount} = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!(category === "") && categoryProduct?.products) {
      setProducts(categoryProduct?.products);
    }
    if (name) {
      console.log(name);
      setCategory(name);
    }
  }, [category, categoryProduct?.products, name]);
  useEffect(() => {
    // assigning products
    if (data && data?.products) {
      console.log(data.products);
      setProducts(data?.products);
    }
    // dispatch(setAllProducts(data?.products))
    if (isError) {
      enqueueSnackbar(isError, { variant: "error" });
    }
  }, [data, dispatch, enqueueSnackbar, isError, currentPage]);
  return (
    <div className="flex-1">
      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
          <img
            draggable="false"
            className="w-1/2 h-44 object-contain"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
            alt="Search Not Found"
          />
          <h1 className="text-2xl font-medium text-gray-900">
            Sorry, no results found!
          </h1>
          <p className="text-xl text-center text-primary-grey">
            Please check the spelling or try searching for something else
          </p>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
            {products?.map((product) => (
              <Product {...product} key={product.id} />
            ))}
          </div>
          {productsCount > resultPerPage && (
            <Pagination
              count={Number(((productsCount + 6) / resultPerPage).toFixed())}
              page={currentPage}
              onChange={(e, val: number) => {
                setCurrentPage(val);
                setSkip(false);
              }}
              color="primary"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsView;

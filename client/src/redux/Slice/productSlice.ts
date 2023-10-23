import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { productSliceProp } from '../../types/types';
import { ProductsProps } from '../../pages/AllProducts/Product';

export interface ProductState {
  value: number;
  products: ProductsProps[] | null;
  product: ProductsProps | null;
  productsCount: number;
  filteredProductsCount: number;
  resultPerPage: number;
  loading: boolean;
}

const initialState: ProductState = {
  value: 0,
  products: null,
  product: null,
  productsCount: 0,
  filteredProductsCount: 0,
  resultPerPage: 12,
  loading: true,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state,action: PayloadAction<ProductsProps>) => {
        state.product = action.payload;
        state.loading = false;
    },
    setAllProducts: (state,action: PayloadAction<ProductsProps[]>) => {
        state.products = action.payload;
        state.loading = false;
        state.productsCount = state.products?.length;
    }
  },
})
// Action creators are generated for each case reducer function
export const { setProduct,setAllProducts } = productSlice.actions

export default productSlice.reducer
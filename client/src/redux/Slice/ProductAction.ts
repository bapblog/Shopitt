import { Dispatch } from 'redux';

interface GetProductsParams {
    keyword?: string;
    category?: string;
    price?: [number, number];
    ratings?: number;
    currentPage?: number;
}

// interface AllProductsSuccessAction {
//     type: string;
//     payload: any;
// }

// interface AllProductsFailAction {
//     type: string;
//     payload: any;
// }

export const getProducts = (params: GetProductsParams) => async (dispatch: Dispatch) => {
    console.log('getProducts');
}

export const clearErrors = () => (dispatch: Dispatch) => {
    // dispatch({ type: CLEAR_ERRORS });
    console.log('clearErrors');
    
}
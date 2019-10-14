import { PRODUCT_LIST_REQUEST } from './types';

export const productlistAction = (params) => {
    return {
        type:PRODUCT_LIST_REQUEST,
        params
    };
}
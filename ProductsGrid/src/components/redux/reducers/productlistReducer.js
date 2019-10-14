import {  PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED } from '../actions/types'
const INITIAL_STATE = {}

export default (state =  INITIAL_STATE ,action) => {
    switch (action.type) {

      case PRODUCT_LIST_SUCCESS:
          return { productlistSuccess: true, data:action.payload };
    
    
        case PRODUCT_LIST_FAILED:
          return { productlistFailed: true, error:action.payload };
    
        default:
          return state;
      };
    }
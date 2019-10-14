import { combineReducers } from 'redux'
import productlistReducer from './productlistReducer';
export default combineReducers({
    Products: productlistReducer
})
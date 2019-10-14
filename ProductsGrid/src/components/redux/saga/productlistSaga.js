import { put,call,takeEvery,take} from 'redux-saga/effects'
import{ PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAILED } from "../actions/types"
import Api from '../Api'


export function* ProductlistAsync({params}){
    try{
        const response = yield call(Api.getproductList, params)
        console.log(response)
        yield put({ type: PRODUCT_LIST_SUCCESS, payload: response })
        

    }
    catch(e){
     console.log(e)
      yield put({type: PRODUCT_LIST_FAILED, payload: e})
    }
  }

export function* productlistSaga() {
  yield takeEvery(PRODUCT_LIST_REQUEST, ProductlistAsync )
}

export default productlistSaga;
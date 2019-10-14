import { put, call, takeEvery, take, all } from 'redux-saga/effects'
import productlistSaga from './productlistSaga'
export default function* rootSaga() {
    yield all ([
        productlistSaga()
    ])
}
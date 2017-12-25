import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION,
  SWAP_CURRENCY,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';
//export const getLatestRate = currency => fetch(`http://api.fixer.io/latest?base=${currency}`);
export const getLatestRate = (currency, crypto) => fetch(`https://api.coinmarketcap.com/v1/ticker/${crypto}/?convert=${currency}`);

const fetchLatestConversionRates = function* (action) {
  try {
    var crypto = yield select(state => state.currencies.baseCurrency);
    var currency = yield select(state => state.currencies.quoteCurrency);

    const response = yield call(getLatestRate, currency, crypto);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (error) {
    yield put({ type: CONVERSION_ERROR, error: error.message });
  }
};

const rootSaga = function* () {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_QUOTE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
};

export default rootSaga;
import {
  CHANGE_CURRENCY_AMOUNT,
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';

const initialState = {
  baseCurrency: 'Ripple',
  quoteCurrency: 'USD',
  amount: 1,
  conversions: {},
  error: null,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_AMOUNT:
      return { ...state, amount: action.amount || 0 };
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency,
      };
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency,
      };
    case GET_INITIAL_CONVERSION:
      return { ...state  };
    case CONVERSION_RESULT:
      return {
        ...state,
        baseCurrency: state.baseCurrency,
        conversions: {
          ...state.conversions,
            ...action.result[0],
        },
      };
    case CONVERSION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
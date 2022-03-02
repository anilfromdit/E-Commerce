import {
  ALL_OFFERS_REQUEST,
  ALL_OFFERS_FAIL,
  ALL_OFFERS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/offerConstants";

export const offerReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_OFFERS_REQUEST:
      return {
        offerLoading: true,
        offers: [],
      };
    case ALL_OFFERS_SUCCESS:
      return {
        offerLoading: false,
        offers: action.payload.offers,
      };
    case ALL_OFFERS_FAIL:
      return {
        offerLoading: false,
        offerError: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        offerError: null,
      };
    default:
      return state;
  }
};

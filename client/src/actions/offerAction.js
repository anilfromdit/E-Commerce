import axios from "axios";
import { ALL_OFFERS_REQUEST, ALL_OFFERS_FAIL, ALL_OFFERS_SUCCESS,CLEAR_ERRORS } from "../constants/offerConstants"

export const getOffer = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_OFFERS_REQUEST
        });
          
        const {data} = await axios.get(`/api/v1/offers`);

        dispatch({
            type:ALL_OFFERS_SUCCESS,
            payload:data
        });

    }
    catch (error) {
        dispatch({
            type: ALL_OFFERS_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const clearErrors = () => async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
    });
}
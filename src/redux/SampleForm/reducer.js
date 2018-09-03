import {
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
} from "./actionType";

const initialState = {
  formData: {},
};

export const sampleform = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT_SUCCESS: 
      return {
        ...state,
        formData: action.data,
        success: true
      };
    case FORM_SUBMIT_FAILED:
      return {
        ...state,
        formData: action.data,
        success: false,
        error: true,
      };
    default:
      return state;
  }
};

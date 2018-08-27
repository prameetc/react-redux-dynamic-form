import {
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
} from "./actionType";

const initialState = {
  formData: {},
};

// Sample Reducers. Beyond the scope of the task. Can be used to store submitted values in the state.
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

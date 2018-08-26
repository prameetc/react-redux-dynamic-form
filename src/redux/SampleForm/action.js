import {
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
} from "./actionType";
import {
  withRouter
} from 'react-router-dom'

export const formSubmitSuccess = data => {
  return {
    type: FORM_SUBMIT_SUCCESS,
    data
  };
};

export const formSubmitFailed = data => {
  return {
    type: FORM_SUBMIT_FAILED,
    data
  };
};

export const formSubmitUser = (email, password) => {
  return (dispatch, getState) => {
    try {

   };

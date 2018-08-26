import {FORM_SUBMIT_SUCCESS, FORM_SUBMIT_FAILED} from './actionType';
import axios from 'axios';

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

export const getFormValues = () => {
  try {
    
    // This could be the GET request to get the form fields from API

    // Sample API GET request using axios. Can be replaced with actual GET call.
    axios
      .get('https://jsonplaceholder.typicode.com/posts') // Sample URL
      .then(function (response) {
        console.log('GET Response', response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  } catch (error) {

  }
}

export const formSubmit = values => {
  try {
   // Sample POST request of our form values to a dummy API using axios.
    
    axios
      .post('https://jsonplaceholder.typicode.com/posts', values)
      .then(response => {
        console.log('POST response', response);
      })
      .catch(error => {
        console.log(error);
      });
    
  } catch (error) {
    console.log('error', error);
  }
};

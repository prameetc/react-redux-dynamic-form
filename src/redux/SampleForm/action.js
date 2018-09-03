import {FORM_SUBMIT_SUCCESS, FORM_SUBMIT_FAILED} from './actionType';
import axios from 'axios';

// Success Action
export const formSubmitSuccess = data => {
  return {
    type: FORM_SUBMIT_SUCCESS, // Calls Success Reducer.
    data
  };
};

// Failure Action
export const formSubmitFailed = data => {
  return {
    type: FORM_SUBMIT_FAILED, // Calls Failure Reducer.
    data
  };
};


export const getFormValues = () => {
  try {
    
    // Sample API GET request using axios. Can be replaced with actual GET call.
    axios
      .get('https://jsonplaceholder.typicode.com/posts') // Dummy URL
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
    
   // I prefer debounce/throttle in the form component itself, rather than using it in the axios call. That is why I chose the former. 
    
    axios
      .post('https://jsonplaceholder.typicode.com/posts', values) // Dummy URL
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

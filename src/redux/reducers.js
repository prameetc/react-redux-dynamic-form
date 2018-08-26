import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { sampleform } from "./SampleForm/reducer";

const rootReducer = combineReducers({
  form: reduxFormReducer,
  sampleform
});

export default rootReducer;

import { configureStore } from '@reduxjs/toolkit';
import  fetchReducer  from './../Features/Fetch';

export default configureStore({
  reducer: {
    News : fetchReducer
  },
});
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import messageSliceReducer from './MessageSlice';
const store=configureStore({reducer:{auth:authReducer,message:messageSliceReducer}});
export default store;
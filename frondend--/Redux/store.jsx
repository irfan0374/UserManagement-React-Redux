import {persistReducer,persistStore}from 'redux-persist';
import userReducer from "../Redux/userSlice";
import storage from 'redux-persist/lib/storage';
import {configureStore}from '@reduxjs/toolkit';


const persistconfig={
    key:"root",
    storage,
};
const persisted=persistReducer(persistconfig,userReducer);
 const Store=configureStore({
    reducer:{
        user:persisted
    }
 });

const persistor=persistStore(Store);

export{Store,persistor};

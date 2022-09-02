import {configureStore,combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import userDataReducer from "./slice/user";
import userLoginReducer from "./slice/loginSlice";
import userPortfolioReducer from "./slice/portfolioSlice";
import userinvestmentReducer from "./slice/investmentsSlice";
import { rootSaga } from "./Saga/index";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    userData:userDataReducer,
        loginUser:userLoginReducer,
        investment:userinvestmentReducer,
        portfolio:userPortfolioReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

export const storee = configureStore({
    reducer: persistedReducer,
    // reducer :{ 
    //     userData:userDataReducer,
    //     loginUser:userLoginReducer,
    //     investment:userinvestmentReducer,
    //     portfolio:userPortfolioReducer
    //  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(sagaMiddleware),
 })

 sagaMiddleware.run(rootSaga)
export const persistor = persistStore(storee);
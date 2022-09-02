import { takeEvery, call, put } from "redux-saga/effects";
import { userLoginAction } from "../slice/loginSlice";
import * as api from "../apis/loginApi";

export function* loginUser({ payload }) {
    try {
      console.log("addNewUser..",payload)
      const response = yield call(api.loginUser,payload);
      console.log("response called",response.success);
      if (response.success) {
        console.log("success",response);
        yield put(userLoginAction.fetchSuccess({ data: response}));
      }else{
        console.log("success",response);
        yield put(userLoginAction.fetchSuccess({ data: response}));
      } 
    } catch (error) {
      console.log("error",error);
      yield put(userLoginAction.fetchFailure({ error }));
    }
    
  }

  export function* getUserData({ payload }) {
    try {
      console.log("get USer Data..",payload)
      const response = yield call(api.getUsersData,payload);
      console.log("response called",response);
      if (response.success) {
        yield put(userLoginAction.fetchUserSuccess({ data: response}));
      }
    } catch (error) {
      yield put(userLoginAction.fetchUserFailure({ error }));
    }
  }

export default function* loginUserSaga() {
    yield takeEvery(userLoginAction.loggedINUser, loginUser);
    yield takeEvery(userLoginAction.logInUserData, getUserData);
}
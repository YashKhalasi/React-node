import { takeEvery, call, put } from "redux-saga/effects";
import { userDataAction } from "../slice/user";
import * as api from "../apis/accountHolderApi";

export function* getUserData({ payload }) {
  try {
    console.log("get USer Data..",payload)
    const response = yield call(api.getUsers,payload);
    console.log("response called",response);
    if (response.success) {
      yield put(userDataAction.fetchUserData({ data: response}));
    }
  } catch (error) {
    yield put(userDataAction.fetchFailure({ error }));
  }
}

export function* addNewUser({ payload }) {
    try {
      console.log("addNewUser..",payload)
      const response = yield call(api.addnewUser,payload);
      console.log("response called",response.success);
      if (response.success) {
        console.log("response called",response);
        yield put(userDataAction.addUserSuccess({ data: response}));
      }else{
        console.log("response called",response);
        yield put(userDataAction.addUserfailure({ data: response}));
      }
    } catch (error) {
      yield put(userDataAction.addUserfailure({ error }));
    }
  }

  export function* editNewUser({ payload }) {
    try {
      console.log("new user..",payload)
      const response = yield call(api.editUserData,payload);
      console.log("edited response called",response);
      if (response.success) {
        yield put(userDataAction.fetchSuccess({ data: response}));
      }
    } catch (error) {
      yield put(userDataAction.fetchFailure({ error }));
    }
  }

  export function* deletetNewUser({ payload }) {
    try {
      console.log("delkete user..",payload)
      const response = yield call(api.deleteUser,payload);
      console.log("edited response called",response);
      if (response.success) {
        yield put(userDataAction.fetchSuccess({ data: response}));
      }
    } catch (error) {
      yield put(userDataAction.fetchFailure({ error }));
    }
  }

  export default function* usersDataSaga() {
    yield takeEvery(userDataAction.getUser, getUserData);
    yield takeEvery(userDataAction.addUser, addNewUser);
    yield takeEvery(userDataAction.editUser, editNewUser);
    yield takeEvery(userDataAction.deletetUser, deletetNewUser);
}
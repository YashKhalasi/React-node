import { takeEvery, call, put } from "redux-saga/effects";
import { userInvestmentAction } from "../slice/investmentsSlice";
import * as api from "../apis/investmentApi";

export function* userInvestment({ payload }) {
    try {
      console.log("userInvestment..",payload)
      const response = yield call(api.investmentUser,payload);
      console.log("response called",response.success);
      if (response.success) {
        console.log("investment success",response);
        yield put(userInvestmentAction.fetchSuccess({ data: response}));
      }
    } catch (error) {
      console.log("investment error",error);
      yield put(userInvestmentAction.fetchFailure({ error }));
    }
  }

export default function* investmentUserSaga() {
    yield takeEvery(userInvestmentAction.getInvestments, userInvestment);
}
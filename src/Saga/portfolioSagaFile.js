import { takeEvery, call, put } from "redux-saga/effects";
import { userPortfolioAction } from "../slice/portfolioSlice";
import * as api from "../apis/portfolioApi";

export function* userPortfolio({ payload }) {
    try {
      console.log("userPortfolio..",payload)
      const response = yield call(api.PortfolioUser,payload);
      console.log("response called",response.success);
      if (response.success) {
        console.log("Portfolio success",response);
        yield put(userPortfolioAction.fetchSuccess({ data: response}));
      }
    } catch (error) {
      console.log("Portfolio error",error);
      yield put(userPortfolioAction.fetchFailure({ error }));
    }
  }

export default function* PortfolioUserSaga() {
    yield takeEvery(userPortfolioAction.setPortfolio, userPortfolio);
}
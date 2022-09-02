import { all } from "redux-saga/effects";
// import  usersSaga  from "../WishList/userSagaFile";
import usersDataSaga  from "./userSagaFile"
import loginUserSaga from "./LoginSagaFile"
import invetmentUserSaga from "./InvestmentSagaFile"
import PortfolioUserSaga from "./portfolioSagaFile"

export function* rootSaga() {
    yield all([
        // usersSaga(),
        usersDataSaga(),
        loginUserSaga(),
        invetmentUserSaga(),
        PortfolioUserSaga()
    ])
}
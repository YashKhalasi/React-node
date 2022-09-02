import { createSlice } from "@reduxjs/toolkit";

const intialInvestmentState ={
    investmentList:{},

}

const userInvestmentSlice = createSlice({
    name: "investments",
    initialState: intialInvestmentState,
    reducers: {  
        getInvestments(state,action){
            console.log("get Investments..",action.payload);
        },
        fetchSuccess(state,action) {
            let successData = action.payload.data
            state.investmentList = successData;
            // state.loginToken = successData.token;
            // state.userLogin = successData.success;
            console.log(state.investmentList,"==success intialUserLoginState==",successData)
        },
        fetchFailure(state,action) {
            console.log(state,"==failed==",action);
        }
      },
})

export const userInvestmentAction = userInvestmentSlice.actions;

export default userInvestmentSlice.reducer;
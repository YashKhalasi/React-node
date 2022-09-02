import { createSlice } from "@reduxjs/toolkit";

const intialPortfolioState ={
    portfolioData:{},

}

const userPortfolioSlice = createSlice({
    name: "Portfolio",
    initialState: intialPortfolioState,
    reducers: {  
        setPortfolio(state,action){
            console.log("set Portfolio..",action.payload);
        },
        removePortfolioData(state,action){
            state.portfolioData = '';
            console.log("remove Portfolio..",action.payload);
        },
        fetchSuccess(state,action) {
            let successData = action.payload.data
            state.portfolioData = successData;
            // state.loginToken = successData.token;
            // state.userLogin = successData.success;
            console.log(state.portfolioData,"==success POrtfolioState==",successData)
        },
        fetchFailure(state,action) {
            console.log(state,"==failed==",action);
        }
      },
})

export const userPortfolioAction = userPortfolioSlice.actions;

export default userPortfolioSlice.reducer;
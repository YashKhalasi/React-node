import { createSlice } from "@reduxjs/toolkit";

const intialUserLoginState ={
    userLoginData:{},
    userLogin:false,
    loginToken:null,
    loginUserDetails:[]
}

const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: intialUserLoginState,
    reducers: {  
        loggedINUser(state,action){
            console.log("user loggedIN..",action.payload);
        },
        fetchSuccess(state,action) {
            let successData = action.payload.data
            state.userLoginData = successData;
            state.loginToken = successData.token;
            state.userLogin = successData.success;
            localStorage.setItem('token',successData.token );
            localStorage.setItem('userLogin',true);
            console.log(state.userLoginData,"==success intialUserLoginState==",successData)
        },
        fetchFailure(state,action) {
            console.log(state,"==failed==",action);
        },
        logInUserData(state,action){
            console.log("user loggedout..",action.payload);
        },
        fetchUserSuccess(state,action) {
            let successData = action.payload.data;
            localStorage.setItem('loginUserDetails',JSON.stringify(successData) );
            state.loginUserDetails = successData;
            console.log(state.loginUserDetails,"==success userDataList==",successData)
        },
        fetchUserFailure(state,action) {
            console.log(state,"==failed==",action);
        },
        loggedOutUser(state,action){
            console.log("user loggedout..",action.payload);
            state.userLoginData = {};
            state.loginToken = null;
            state.userLogin = false;
            localStorage.setItem('token',null );
            localStorage.setItem('userLogin',false);
        },
      },
})

export const userLoginAction = userLoginSlice.actions;

export default userLoginSlice.reducer;
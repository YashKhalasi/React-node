import { createSlice } from "@reduxjs/toolkit";
import { isExpired, decodeToken } from "react-jwt";

const intialUserLoginState ={
    userLoginData:{},
    userRole:null,
    userLogin:false,
    loginToken:null,
    loginUserDetails:[],
    
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

           if(successData.success){
            const myDecodedToken = decodeToken(successData.token);
            const userRole = myDecodedToken.result.holder_Role
            
            console.log("Decode token..",userRole);

            let list =(userRole.split(","));
            let userRoles = [];
            if(list.includes("111")) userRoles.push("Partner");
            if(list.includes("122")) userRoles.push("Advisor");
            if(list.includes("133")) userRoles.push("Investor");
            state.userRole = userRoles;
            console.log(userRole.split(","),"split the role list...",list,"UserRoles...",userRoles);
           }            
            

            localStorage.setItem('token',successData.token );
            localStorage.setItem('userLogin',successData.success);
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
        setUserRoles(state,action) {
            console.log(state,"==user Roles==",action);
            state.userRole = action.payload.userRole;
        },
      },
})

export const userLoginAction = userLoginSlice.actions;

export default userLoginSlice.reducer;
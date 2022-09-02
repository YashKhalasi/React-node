import { createSlice } from "@reduxjs/toolkit";
// import {useHistory} from"react-router-dom";


const intialUserState ={
    userDataList:{},
    userDataCreate: [],
    usersAllData:[],
    dataCalled:false,
    isActive:'',
}

const userDataSlice = createSlice({
    name: "userDataList",
    initialState: intialUserState,
    reducers: {
        getUser(state,action){
            console.log("Get user Data..",action);
        },
        fetchUserData(state,action){
            let successData = action.payload.data
            state.usersAllData = successData;
            console.log(state.userDataCreate,"==success userDataList==",action.payload)
        },
        addUser(state,action){
            
            console.log("user added",action.payload);
            // state.userDataList.push(action.payload.userDataList);
        },
        addUserSuccess(state,action){
            state.userDataList=action.payload;
            console.log(state.userDataList,"==addUserSuccess userDataList==",action.payload)
        },
        addUserfailure(state,action){
            state.userDataList=action.payload;
            console.log(state.userDataList,"==addUserfailure userDataList==",action.payload)
        },
        editUser(state,action){
            console.log("user edited..",action.payload);
        },
        deletetUser(state,action){
            console.log("user deleted..",action.payload);
        },
        fetchSuccess(state,action) {
            let successData = action.payload.data
            state.userDataCreate = successData;
            console.log(state.userDataCreate,"==success userDataList==",successData)
        },
        fetchFailure(state,action) {
            console.log(state,"==failed==",action);
        },
        removeDataFromStore(state,action){
            console.log("==Remove Data from store==",action);
            state.userDataList=undefined;

        }
    },
})

export const userDataAction = userDataSlice.actions;

export default userDataSlice.reducer;
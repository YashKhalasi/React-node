import axios from "axios";
// import {VerifyToken} from "../commonComponent/getToken"

export const loginToken = ()=> {
    console.log("Token===",localStorage.getItem('token'));
}

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

const dltconfig = {headers: {
  "x-access-token": `Bearer ${localStorage.getItem('token')}`
}}

//get data
export const getUsers = async (data) => {
  // const token = LoginToken();
  loginToken();
  console.log(config,"token===Get payload", data);
  return await getRequest(data);
  // return "called";
};

export const getRequest= (data) => axios.get("/holders",config)
  .then(function (response) {
    console.log("in getRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in getRequest",error);
  });

// post data
export const addnewUser = async (data) => {
    console.log("payload", data.userDataList);
    return await postRequest(data.userDataList);
    // return "called";
};

export const postRequest= (data) => axios.post("/holders",data,config)
  .then(function (response) {
    console.log("in postRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in postRequest",error);
  });

// Edit data

export const editUserData = async (data) => {
    console.log("payload", data.userDataList);
    return await putRequest(data.userDataList);
    // return "called";
};

export const putRequest= (data) => axios.put("/holders",data,config)
  .then(function (response) {
    console.log("in putRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in putRequest",error);
  });

/// delete user data

export const deleteUser = async (data) => {
  loginToken();
  console.log(dltconfig,"Delete payload", data);
  return await dltRequest(data,dltconfig);
  // return "called";
};

export const dltRequest = async (data,dataConfig) => axios.delete("/holders",{dataConfig,data}
)
.then(function (response) {
  console.log(dataConfig,"in delete data...",response.data);

  return response.data;
})
.catch(function (error) {
  console.log("in delete data",error);
});

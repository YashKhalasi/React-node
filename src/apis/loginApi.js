import axios from "axios";

export const loginToken = ()=> {
  console.log("Token===",localStorage.getItem('token'));
}

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// post data
export const loginUser = async (data) => {
    console.log("login payload", data);
    return await postRequest(data.userLogin);
};

export const postRequest= (data) => axios.post("/login",data)
  .then(function (response) {
    console.log("in login postRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in login postRequest",error);
  });

  export const getUsersData = async (data) => {
    // const token = LoginToken();
    console.log("getUsersData token",localStorage.getItem('token'));
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    
    console.log("token===Get payload", config);
    return await getRequest(config);
    // return "called";
  };

  export const getRequest= (dataConfig) => axios.get("/holders/loginUser",dataConfig)
  .then(function (response) {
    console.log("in getRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in getRequest",error);
  });
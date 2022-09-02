import axios from "axios";

// post data
export const investmentUser = async (data) => {
    console.log("Investment payload", data);
    return await getRequest(data.userLogin);
};

export const getRequest= (data) => axios.get("/holders/oneToMany",data)
  .then(function (response) {
    console.log("in investment gettRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in investment gettRequest",error);
  });
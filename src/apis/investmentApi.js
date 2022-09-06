import axios from "axios";

// post data
export const investmentUser = async (data) => {
  console.log("Token===",localStorage.getItem('token'));
  const aa =  {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  console.log(aa,"Investment payload", data.data);
  let passingData = data.data === undefined ? {} : data.data;
    return await getRequest(passingData,aa);
};

export const getRequest= (data,tokenVal) => axios.post("/holders/oneToMany",data.data,tokenVal)
  .then(function (response) {
    console.log("in investment gettRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in investment gettRequest",error);
  });
import axios from "axios";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// post data
export const PortfolioUser = async (data) => {
    console.log("Portfolio payload", data);
    console.log("Portfolio token", config);
    return await postRequest(data.portfolioData);
};

export const postRequest= (data) => axios.post("/holders/investments",data,config)
  .then(function (response) {
    console.log("in Portfolio gettRequest...",response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log("in Portfolio gettRequest",error);
  });
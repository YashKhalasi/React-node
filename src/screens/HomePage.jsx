import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  let userDetail = localStorage.getItem('loginUserDetails');
  const userData = JSON.parse(userDetail);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);
  const loginStoreData = useSelector(
    (state) => state.loginUser.loginUserDetails
  );

  useEffect(() => {
    if(userData !== null){
        // setTimeout( ()=>{
            console.log(JSON.parse(userDetail),"userData is...", loginStoreData);
            let isSuccess = userData.success;
            if (isSuccess) {
            //   setUserDetails(loginStoreData.data);
              setUserDetails(userData.data);
            }
        // }
    //    ,2000);
    }
    
  }, []);

  console.log("userDetails is...", userDetails);
  return (
    <Container>
      <h1 className="m-3">Welcome to Dashboard</h1>
      <hr />
      <div class="card" style={{ width: "18rem;" }}>
        <div class="card-body">
          <h3 class="card-title"><b>Name: </b>{userDetails.holder_name}</h3>
          <h3 class="card-title"><b>Email id: </b>{userDetails.holder_email}</h3>
          <h3 class="card-title"><b>Account Number: </b>{userDetails.holder_accno}</h3>
          <h3 class="card-title"><b>Total Portfolio: </b>₹ {userDetails.holder_portfolio}</h3>

          {/* <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
        </div>
      </div>
      <div className="m-3">
        <Button variant="primary" type="submit" onClick={()=>history.push('/users')}>
          Get All Investros Data
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;

        <Button variant="primary" type="submit" onClick={()=>history.push('/addPortfolio')}>
         To Invest in Schemes
        </Button>
      </div>

      <div>
        
      </div>

    </Container>
  );
};

export default Homepage;

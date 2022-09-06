import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import  {userLoginAction}  from "../slice/loginSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  let userDetail = localStorage.getItem('loginUserDetails');
  const userData = JSON.parse(userDetail);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const loginStoreData = useSelector(
    (state) => state.loginUser
  );

  useEffect(() => {
    if(userData !== null){
        // setTimeout( ()=>{
            console.log(JSON.parse(userDetail),"userData is...", loginStoreData.userRole);
            let isSuccess = userData.success;
            if (isSuccess) {
              let data =JSON.parse(userDetail);
              let userRole = data.data.holder_Role;
              let list =( userRole.split(","));
              let userRoles = [];
              if(list.includes("111")) userRoles.push("Partner");
              if(list.includes("122")) userRoles.push("Advisor");
              if(list.includes("133")) userRoles.push("Investor");
              console.log(userRole.split(","),"split the role list...",list,"UserRoles...",userRoles);
              // dispatch(
              //   userLoginAction.setUserRoles({
              //     userRole: userRoles,
              //   })
              // );
            //   setUserDetails(loginStoreData.data);
              setUserDetails(userData.data);
              setUserRoles(loginStoreData.userRole);
              
            }
        // }
    //    ,2000);
    }
    
  }, []);

  console.log("userDetails is...", userDetails);
  
  const userRole_Investor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Investor'):null;
  const userRole_Partner =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Partner'):null;
  const userRole_Advisor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Advisor'):null;
  console.log("userRole_Investor=>",userRole_Investor,"=userRole_Partner=>",userRole_Partner,"=userRole_Advisor=>",userRole_Advisor);

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
          <h3 class="card-title"><b>Roles: </b>{userRoles.map((i,k)=>i)+' '}</h3>

          {/* <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
        </div>
      </div>
      <div className="m-3">
        {userRole_Partner || userRole_Advisor?
        <Button variant="primary" type="submit" onClick={()=>history.push('/users')}>
          Get All Investros Data
        </Button> 
        :null}&nbsp;&nbsp;&nbsp;&nbsp;

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

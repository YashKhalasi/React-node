import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDataAction } from "./slice/user";
import { userInvestmentAction } from "./slice/investmentsSlice";
import { userPortfolioAction } from "./slice/portfolioSlice";
import  {userLoginAction}  from "./slice/loginSlice";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let loginUser = localStorage.getItem('userLogin');
  const [userLoggIn,setUserLoggIn] = useState(true);

  const logout = () => {
    setUserLoggIn(false);
    dispatch(
      userLoginAction.loggedOutUser({})
    );
    localStorage.setItem("token", null);
    localStorage.setItem("userLogin", false);
    localStorage.setItem('loginUserDetails',null );
    history.push("/login");
    console.log("logout user");
  };

  const goToUSerList = (e) => {
    // console.log("goToUSerList",history);
    dispatch(userDataAction.getUser({}));
    dispatch(userPortfolioAction.removePortfolioData({}));
    history.push("/users");
  };

  const goToportfolio = (e) => {
    // console.log("goToUSerList",history);
    dispatch(userPortfolioAction.removePortfolioData({}));

    history.push("/addPortfolio");
  };

  const goToInvestments = (e) => {
    // console.log("goToUSerList",history);
    dispatch(userInvestmentAction.getInvestments({}));
    dispatch(userPortfolioAction.removePortfolioData({}));

    history.push("/investment");
  };

  // if(localStorage.getItem('userLogin')==='true'){
  //   setUserLoggIn(true)
  // }

  useEffect(()=>{
    console.log(userLoggIn,"Navbar useEffect..",loginUser);
    if(loginUser === 'true'){
      setUserLoggIn(true)
    }else{
      setUserLoggIn(false)
    }
  },[loginUser,userLoggIn])
  console.log(userLoggIn,"Navbar ..",localStorage.getItem('userLogin'));
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => history.push("/homepage")}><b className="p-2 text-dark" >Dashboard</b></button>
        {/* {localStorage.getItem("userLogin") !== "false"? ( */}
        {userLoggIn ? (
          <>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => goToUSerList(e)}
                    // onClick={() => history.push("/users")}
                  >
                    View Register Users
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => goToportfolio(e)}
                    // onClick={() => history.push("/users")}
                  >
                    Add Protfilo
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => goToInvestments(e)}
                    // onClick={() => history.push("/users")}
                  >
                    Investment Report
                  </button>
                </li>

              </ul>
            </div>

            <div className="d-flex flex-row-reverse px-5">
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};
export default NavBar;

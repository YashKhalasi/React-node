import React from 'react'
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom'
import HomePage from './screens/HomePage'
import LoginUser from './screens/LoginUser'
import Signup from './screens/SignUp'
import ShowUserList from './screens/ShowUserList'
import AddPortfolio from './screens/AddPortfolio'
import UserInvestments from './screens/UserInvestments'
import NavBar from './Navbar';
import NotFoundPage from './screens/NotFoundPage';
import Restricted from './screens/Restricted';
import { useSelector } from "react-redux";

const App = () => {
  const storeData = useSelector(state => state.loginUser);
  // if(!storeData.userLogin){
  //   localStorage.setItem('userLogin',false);
  // }

  const loginStoreData = useSelector((state) => state.loginUser);
  const userRole_Investor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Investor'):null;
  const userRole_Partner =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Partner'):null;
  const userRole_Advisor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Advisor'):null;

  console.log("App userRole_Investor=>",userRole_Investor,"=userRole_Partner=>",userRole_Partner,"=userRole_Advisor=>",userRole_Advisor);


  console.log("user Logged in",storeData.userLogin);

  console.log("user logged in token==>>",localStorage.getItem('token'))

  const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props=> 
      // console.log("Routing user logged in",rest.path)
      // const routingVal = {...rest};
      localStorage.getItem('token') !== "null"?
      userRole_Investor && !userRole_Partner && !userRole_Advisor && rest.path === "/users" ?<Redirect to={"/restricted"} />:
        <Component {...props} /> 
      : <Redirect to={"/login"} />
    } />
 }

//  console.log("Navbar ..",localStorage.getItem('userLogin'));
  return (
    <>
       
    <Router>
      {localStorage.getItem('userLogin')!=="false"?<NavBar/>:null}
      <Switch>
   
      {/* <Route  path='*' component={NavBar} /> */}
      <Route exact path='/login' component={LoginUser} />
      <Route exact path='/restricted' component={Restricted} />

      <ProtectedRoute exact path='/' component={LoginUser} />
        <Route exact path='/Signup' component={Signup} />
        <ProtectedRoute exact path='/homepage' component={HomePage} />
        <ProtectedRoute exact path='/users' component={ShowUserList} />
        <ProtectedRoute exact path='/addPortfolio' component={AddPortfolio} />
        <ProtectedRoute exact path='/investment' component={UserInvestments} />

        <Route path="*" component={NotFoundPage} />

        {/* <Route exact path='/products' component={ShowProducts} />
        <Route exact path='/product/edit/:id' component={EditProduct} />
        <Route exact path='/product/:id' component={ProductDetail} /> */}
      </Switch>
    </Router>
    </>
    
  )
}

export default App

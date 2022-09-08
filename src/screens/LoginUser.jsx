
import React, { useState,useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import  {userLoginAction}  from "../slice/loginSlice";
import { userDataAction } from "../slice/user";

const LoginUser = ({ history }) => {

    const dispatch = useDispatch();
    const storeData = useSelector(state => state.userData.userDataList);
    const loginStoreData = useSelector(state => state.loginUser.userLoginData);

    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState();
    const [userDetails, setUserData] = useState();
    const [loggedIn,setLoggedIn] = useState(false);

    const SignupEvent=()=>{
        console.log('Signup event fired');
        dispatch(
            userDataAction.removeDataFromStore({ })
          );
        history.push('/Signup')
    }

    const addProductHandler = async (e) => {

        e.preventDefault();
        let data={loginId,password  }
        console.log('login details...',data)

        dispatch(
            userLoginAction.loggedINUser({
                userLogin: data,
            })
          );

    //    let userData = await axios.post('/login', data)
    //    console.log('data receivedLine   ', userData.data);
    //    let isSuccess = userData.data.success;

    //    setUserData(userData.data);
    //    setLoggedIn(isSuccess);

    //    if(loggedIn){
    //        history.push('/homepage');

    //    }
       console.log('userData is...', userDetails);
    
    }

    useEffect(()=>{
        console.log('userData is...', loginStoreData);
        let isSuccess = loginStoreData.success;
        if(isSuccess){
        setLoggedIn(isSuccess);
        setUserData(loginStoreData)
        }else{
            setLoggedIn(false);
        }
    },[loginStoreData]);

    if(loggedIn){
        dispatch(
            userLoginAction.logInUserData({ })
          );
          
          setTimeout( history.push('/homepage'),5000);
    }

    console.log('location data...',storeData);
    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Login from Here</h1>
                <hr />

                <Form onSubmit={addProductHandler} >


                    <Form.Group className="mb-3" controlId="loginId">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                            required={true}
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            type="number"
                          />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                             />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="warning"  onClick={SignupEvent} >
                        Signup
                    </Button>
                </Form>

            {loginStoreData !== undefined ? <p className='text-danger'>{loginStoreData.message}</p> :null}
            {loginStoreData !== undefined ? <p className='text-danger'>{loginStoreData.data}</p> :null}

            {storeData !== undefined && Object.keys(storeData).length >0? 
                <p className='text-success mt-3'>{!loginStoreData?.data?storeData.data.message:null}</p> 
                : null}
            </Container>
        </>
    )
}

export default LoginUser

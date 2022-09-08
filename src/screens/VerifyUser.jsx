 import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {  Button } from 'react-bootstrap'
//  import { useParams } from 'react-router-dom';
 
 export default function VerifyUser(props) {
    // const { userName } = useParams();

    const [dataLoded,setDataLoded]=useState(false);
    const [msg,setMsg]=useState('');

    const [resentdataLoded,setResentDataLoded]=useState(false);
    const [resentMsg,setResentMsg]=useState('Loading..');

    const queryParams = ((props.location.search).slice(1)).split('&&');
    const accCode = queryParams[0];
    const tokenString = queryParams[1];
    let inputData = {accCode,tokenString}
    console.log("tokenString==>",tokenString,"==AccCode==>",accCode,'==Verifying user...',queryParams);

    const getProductsData = async () => {
        if(tokenString && accCode){
            const { data } = await axios.put('/verifyUser',inputData)
            console.log(inputData,"Login users..",data)
            setDataLoded(data.success);
            setMsg(data.message)
        }
  }

    useEffect(() => {
        getProductsData();
        
      }, []);

      const resendEmail= async ()=>{
        console.log("Received email from server",inputData)
        if(tokenString && accCode){
            const { data } = await axios.post('/verifyUser',inputData)
            console.log(inputData,"Login users..",data)
            setResentDataLoded(data.success);
            setResentMsg(data.message)
        }
      }

   return (
           <div className="not-found">
               <div className="container">
                   <div className="not-found-pg-content pt-5 pb-4">
                    { !tokenString || !accCode ? <h3>There is something wrong with url please verify again or resend mail .</h3>:
                       dataLoded? 
                       <>
                        {/* <h1>User has been verified please log in  </h1> */}
                        <h1>{msg}  </h1>
                        
                        <Button variant="success">
                            <a href={'/'} className="back-to-home"><span className='text-white'>Login</span></a> <br/>
                        </Button>

                        <p>If you didn't get the mail then Please click here to resend the mail.
                            <Button variant="warning" onClick={resendEmail}>Resend </Button>
                        </p>
                       
                       {resentdataLoded?<p className="text-success">{resentMsg}</p>:null}

                       </>:
                       <>
                        <h1>Token has been expired.please Register again.</h1>
                        
                       </>
                    }
                    
                   </div>
               </div>
           </div>

   );
 }
 
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import  {userPortfolioAction}  from "../slice/portfolioSlice";



const AddPortfolio = ({ history }) => {
    const dispatch = useDispatch();
    const storeData = useSelector(state => state.portfolio.portfolioData);
    console.log("location",history)
    const [schName, setSchName] = useState('')
    const [invested, setInvested] = useState('')
    const [msg, setMsg] = useState('')


    const addSignupHandler = async (e) => {

        e.preventDefault();


            let data = {
                "SchName":schName,
                "invested":invested,
            }
            console.log('p[ortfolio] details...',data);

            dispatch(
                userPortfolioAction.setPortfolio({
                    portfolioData: data,
                })
              );
             setSchName('');
            setInvested('');
    }

    useEffect(() =>{
        console.log("Portfolio store store Data: " , storeData);
        if(storeData!== undefined && storeData.success){
            setMsg('Scheme added to your portfolio successfully and you can check in Investment Report section.To add new Scheme PLease enter again ');
        }else{
            setMsg('');
        }

        console.log("Portfolio Msg " , msg);
    },[storeData,msg]);

    // useEffect(() =>{ 
    //     console.log("Portfolio Msg " , msg);
    //     setMsg('');
    //   },[msg])

    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Add New Schemes </h1>
                <hr />
                

                <Form onSubmit={addSignupHandler} >

                <Form.Group className="mb-3" controlId="userName">
                        <Form.Label>Scheme Name</Form.Label>
                        <Form.Control
                            value={schName}
                            required={true}
                            onChange={(e) => setSchName(e.target.value)}
                            type="text"
                          />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="portfolio">
                        <Form.Label>Invetment Amount</Form.Label>
                        <Form.Control
                            required={true}
                            value={invested}
                            onChange={(e) => setInvested(e.target.value)}
                            type="number"
                          />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p className="text-success">{msg.length>0?msg:null}</p>
            </Container>
        </>
    )
}

export default AddPortfolio;

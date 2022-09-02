import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap'
import Table from '../commonComponent/Table';
import { useDispatch,useSelector } from "react-redux";
import  {userDataAction}  from "../slice/user";


const ShowUserList = ({history}) => {

    const dispatch = useDispatch();
    const storeData = useSelector(state => state.userData.usersAllData);
    const dispatchStoreData = useSelector(state => state.userData.userDataCreate);

    const [products, setProducts] = useState([]);
    const [toggleData,setToggleData] = useState(false);
    // const getProductsData = async () => {
    //     const { data } = await axios.get('/holders')
    //     console.log("Login users..",data)
    //     setProducts(data);
    //     setToggleData(!toggleData)

    // }
    //for getting data..
    useEffect(() => {
        
        const getProductsData = async () => {
            // dispatch(
            //     userDataAction.getUser({  })
            //   );
            
            const tableData =  storeData;
        console.log("Products data loaded..",tableData);
        if(tableData.success){
            setProducts(tableData.data);
            setToggleData(true)
        }
            
              
        //     const { data } = await axios.get('/holders')
        //     console.log("Login users..",data.data)
        //     setProducts(data.data);    
        //     setToggleData(true)

        }
        getProductsData();

    }, [storeData,toggleData])

    //for toggle data...
    useEffect(() =>{
        dispatch(
                userDataAction.getUser({  })
              );
        console.log("Table toggleData: " , dispatchStoreData);
    },[dispatchStoreData])
    const tableTitle=["Index","Name","Email ID","Account Number","Total Portfolio","",""];

    return (
        <>
           <Container  className="justify-content-center p-2">
               <h1 className='text-center'>Show All Users</h1>
               <hr />
                {/* {toggleData?'called':'not called'} */}
               <Row>
                    <Col >
                    {toggleData?
                        <Table tableData={products} tableTitle={tableTitle} apiCall={setToggleData}/>
                        :<Table tableData={products} tableTitle={tableTitle} apiCall={setToggleData}/>
                    }
                    </Col>
                       
               </Row>


           </Container>

           
        </>
    )
}

export default ShowUserList

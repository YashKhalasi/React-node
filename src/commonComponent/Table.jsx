
import React, { useState } from "react";
import axios from 'axios';
import {  Button } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import  {userDataAction}  from "../slice/user";

const Table = (props) => {

  const dispatch = useDispatch();
  const storeData = useSelector(state => state.userData);
  const loginStoreData = useSelector( (state) => state.loginUser );
  const userRole_Advisor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Advisor'):null;
  console.log("Table userRole_Advisor=>",userRole_Advisor);

  const [deletUserData,setDeleteUserData]= useState([]);
  const [editUser,setEditUser]=useState(false);
  const [userIndex,setUserIndex]=useState();
  const [userName, setUserName] = useState('')
    const [emailID, setEmailID] = useState('')
    const [portfolio, setPortfolio] = useState('')

  console.log("TableofList..", props.tableTitle.map);

  const editUserData=(data,index)=>{
    setEditUser(!editUser);
    setDeleteUserData([]);
    setUserIndex(index);
    console.log(index,"Edit Users Data", data);
    // props.apiCall(false);
  }

  const updateUserData=(data,index)=>{
    const editData ={holder_accno:data.holder_accno};
    if(userName!== data.holder_name)
        editData.holder_name=userName;
    
    if(emailID!== data.holder_email)
        editData.holder_email=emailID;

    if(portfolio!== data.holder_portfolio)
        editData.holder_portfolio=portfolio;

    console.log(editData,"yaSH data object...",Object.keys(editData).length)
    Object.keys(editData).forEach(key => {
      if (editData[key] === '') {
        delete editData[key];
      }
        });
      
    console.log(Object.keys(editData).length,"yaSH Updated User Datafff==>>",editData);
    setEditUser(!editUser);
    setDeleteUserData([]);
    setUserIndex(index);

    const updateUsersData = async () => {

      dispatch(
        userDataAction.editUser({
          userDataList: editData,
        })
      );

      console.log("EditProduct storeData ", storeData);
      setUserName('');
      setEmailID('');
      setPortfolio('');
      props.apiCall(false);
  }
 
  if(Object.keys(editData).length > 1){
    updateUsersData();
  }
  
    console.log(index,"Edit Users Data", data);
    // props.apiCall(false);
  }

  const deleteUser =(data)=>{
    console.log(data.holder_Role,"Delete User  Data", data.holder_accno);

    dispatch(
      userDataAction.deletetUser({
        data:{holder_accno:data.holder_accno,holder_Role:data.holder_Role}
      })
    );

  //   const deteletUserData = async () => {
  //     const { data } = await axios.delete('/holders',{data:{holder_accno}});
  //     console.log("Login users..",data)
  //     setDeleteUserData(data);
  // }
  // deteletUserData();
  props.apiCall(false);
  }
const tableData =  storeData.usersAllData.data;
  console.log("EditProduct storeData ", tableData);

  let msgClr = ''
  if(deletUserData.success){
    msgClr = 'text-success mt-3'
  }else{
    msgClr ='text-danger mt-3'
  }
  console.log(msgClr,"EditProduct Userscripts Data", deletUserData);
  return (
    <>
      {props!==undefined  && (
        <table class="table table-primary table-striped">
          <thead>
            <tr>
              { props.tableTitle.map((list, index) =>
                  <th key={index} scope="col">{list}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {props.tableData.map((list, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  {editUser && userIndex === index+1?
                  <>
                    <td><input defaultValue={list.holder_name} onChange={(e) => setUserName(e.target.value)}/></td>
                    <td><input defaultValue={list.holder_email } onChange={(e) => setEmailID(e.target.value)}/></td>
                    <td>{list.holder_accno} </td>
                    <td><input defaultValue={list.holder_portfolio} onChange={(e) => setPortfolio(e.target.value)}/></td>
                    <td><Button variant="primary" onClick={()=>updateUserData(list, index+1)}>Update User</Button></td>
                    </>:<>
                    {/* <th scope="row">{index + 1}</th> */}
                    <td>{list.holder_name}</td>
                    <td>{list.holder_email }</td>
                    <td>{list.holder_accno}</td>
                    <td>{list.holder_portfolio}</td>
                    {userRole_Advisor?
                    <td><Button variant="primary" onClick={()=>editUserData(list, index+1)}>Edit User</Button></td>:null}
                  </>
                  }

                  <td><Button variant="danger" onClick={()=>deleteUser(list)}>Delete User</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        
      )}
      {deletUserData!==undefined?<p className={msgClr}>{deletUserData.message}</p>:null}
    </>
  );
};
export default Table;

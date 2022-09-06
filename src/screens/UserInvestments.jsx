import React, { useEffect, useState } from 'react'
import Cards from "../commonComponent/card"
import {useSelector } from "react-redux";
// import  {userLoginAction}  from "../slice/loginSlice";


const UserInvestments = (props) => {
    const [invetorsList,setInvestorsList] = useState([]);
    const storeData = useSelector(state => state.investment);
    const loginStoreData = useSelector( (state) => state.loginUser );

    const userRole_Investor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Investor'):null;
    const userRole_Partner =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Partner'):null;
    const userRole_Advisor =( loginStoreData.userRole)!== null?( loginStoreData.userRole).includes('Advisor'):null;

    console.log("UserInvestments userRole_Investor=>",userRole_Investor,"=userRole_Partner=>",userRole_Partner,"=userRole_Advisor=>",userRole_Advisor);

    useEffect(() =>{
        console.log("Table toggleData: " , storeData);
        if(storeData.investmentList !== undefined && Object.keys(storeData.investmentList).length > 0){
            let invList = storeData.investmentList.data.investment
            console.log("Inv lists..",invList);
            let investorsList=[];
            // if(!userRole_Partner ||!userRole_Advisor){
            //     // investorsList = (storeData.investmentList.data).map((list, index)=>(list.investment).length > 0?list:'')
            //     setInvestorsList(invList);
            // }else{
                investorsList = (storeData.investmentList.data).map((list, index)=>(list.investment).length > 0?list:'')
            console.log("List: " ,investorsList );
            const filtered = investorsList.filter(Boolean);
            console.log("filtered List: " ,filtered );
            setInvestorsList(filtered);
            }
            
        // }
    },[storeData])
console.log("Table toggleData: " ,invetorsList)
const tableTitle=["Index","Schemes","Total Investment","Total Portfolio","Profit"];
    return(<>
        <div class="card" >
            {invetorsList.length>0?invetorsList.map((i,k)=><Cards tableTitle={tableTitle} invetorsData={i} investData={i.investment} key={i}/>):
                <h1 className="m-5">No investments mapped with any Investors.</h1>}

  {/* <Cards /> */}
</div>
</>
    )
}
export default UserInvestments;
import React, { useEffect, useState } from 'react'
import Cards from "../commonComponent/card"
import {useSelector } from "react-redux";
// import  {userLoginAction}  from "../slice/loginSlice";


const UserInvestments = (props) => {
    const [invetorsList,setInvestorsList] = useState([]);
    const storeData = useSelector(state => state.investment);

    useEffect(() =>{
        console.log("Table toggleData: " , storeData);
        if(storeData.investmentList !== undefined && Object.keys(storeData.investmentList).length > 0){
            let investorsList = (storeData.investmentList.data).map((list, index)=>(list.investment).length > 0?list:'')
            console.log("List: " ,investorsList );
            const filtered = investorsList.filter(Boolean);
            console.log("filtered List: " ,filtered );
            setInvestorsList(filtered);
        }
    },[storeData])
console.log("Table toggleData: " ,invetorsList)
const tableTitle=["Index","Schemes","Total Investment","Total Portfolio","Profit"];
    return(<>
        <div class="card" >
            {invetorsList.length>0?invetorsList.map((i,k)=><Cards tableTitle={tableTitle} invetorsData={i} investData={i.investment} key={i}/>):''}

  {/* <Cards /> */}
</div>
</>
    )
}
export default UserInvestments;
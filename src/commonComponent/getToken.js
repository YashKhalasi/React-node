
import { useSelector } from "react-redux";

export const VerifyToken = ()=> {
    // const GetToken=()=>{
        const loginStoreData = useSelector(state => state.loginUser.loginToken);
    console.log("Token===",loginStoreData);
    return loginStoreData;
    // }
    
}

export const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};


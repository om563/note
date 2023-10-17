import { Navigate } from "react-router-dom"


export default function ProtuctedRoute(props){

    if(localStorage.getItem("token")){
        return props.children

    }
    else{
        return <Navigate to={'/signin'}></Navigate>
    }
    
}
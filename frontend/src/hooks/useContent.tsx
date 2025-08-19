import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useContent() {
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();
     function refresh() {
         axios.get("http://localhost:3000/api/v1/user/content",{
            headers:{
              Authorization: localStorage.getItem('token')
            }
         })
         .then(response=>{
            if(response.data.contents){
                setContents(response.data.contents);
            } else {
                navigate('/signin');
            }
         })
         .catch( err => {
            console.log(err.message);
         })

        }

    useEffect( () => {
        refresh();

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return ()=>{
            clearInterval(interval)
        };
    },[])

    return {contents, refresh};
}
import React, { useState } from "react";
import {FormBottomWarning } from "../components/formBottomWarning";
import { FormHeader } from "../components/formHeader";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

export function SignIn({setIsLogin}: {setIsLogin: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="w-screen h-screen flex justify-center items-center ">
        <div className="singup text-center flex flex-col items-center w-80 gap-4 shadow-lg border rounded-3xl p-10">
            <FormHeader heading="Sign in" />
            <Input onChange={(e) => setUserName(e.target.value)} label="Username" placeholder="johndoe11" name="username" />
            <Input onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="John@123" name="password" />

            <Button variant="primary" size="md" onClick={async () => {
                try {
                    if(userName !== "" && password !== ""){
                        const response = await axios.post("http://localhost:3000/api/v1/auth/signin", {
                            userName,
                            password
                        });
    
                        if (response.status === 200) {
                            localStorage.setItem('token', `Bearer ${response.data.token}`);
                            setIsLogin(true);
                            navigate("/dashboard");
                        } else {
                            alert(response.data.message);
                        }
                    } else {
                        alert("input box is empty");
                    }

                } catch (err) {
                    console.log(err);
                }

            }} text="Signin" />

            <FormBottomWarning message={"Don't have an account?"} buttonText={"signup"} to={"/signup"} />
        </div>
           </div>
}


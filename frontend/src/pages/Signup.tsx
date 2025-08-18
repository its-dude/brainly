import React, { useState } from "react";
import Button from "../components/Button";
import { FormBottomWarning } from "../components/formBottomWarning";
import { FormHeader } from "../components/formHeader";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="w-screen h-screen flex justify-center items-center ">
        <div className="singup text-center flex flex-col items-center gap-4 shadow-lg border rounded-3xl p-10 w-80">
            <FormHeader heading="Sign up" />
            <Input onChange={(e) => setFirstName(e.target.value)} label="First Name" placeholder="John" name="firstName" />
            <Input onChange={(e) => setLastName(e.target.value)} label="Last Name" placeholder="Doe" name="firstName" />
            <Input onChange={(e) => setUserName(e.target.value)} label="Username" placeholder="johndoe11" name="username" />
            <Input onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="John@123" name="password" />
            <Button variant="primary" text="Signup" size="md" onClick={async () => {
                try {
                    if (firstName && lastName && userName && password) {
                        const response = await axios.post("http://localhost:3000/api/v1/auth/signup", {
                            firstName,
                            lastName,
                            userName,
                            password
                        })
                        localStorage.setItem('token', `Bearer ${response.data.token}`)
                        setIsLogin(true);
                        navigate('/dashboard');

                    } else {
                        alert("input box is empty")
                    }

                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        console.error("API Error:", err.response?.data || err.message);
                        alert(err.response?.data?.message || "Signup failed");
                    } else {
                        console.error("Unexpected Error:", err);
                    }
                }

            }} />
            <FormBottomWarning message="Already have an account?" buttonText={"signin"} to={"/signin"} />
        </div>
    </div>
}
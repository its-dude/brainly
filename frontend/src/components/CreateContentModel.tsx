import { CrossIcon } from "../icons/crossIcon";
import Button from "./Button";
import axios from "axios"
import { useState } from "react";
import { Input } from "./Input";

type contentType = "youtube" | "twitter";

export function CreateContentModel({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState<contentType>("youtube");
    return (
        (open &&
            <div className="content w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-75">
                <div className="w-full h-full opacity-100 flex justify-center items-center ">
                    <span className="opacity-100 bg-white text-black p-4 border rounded-xl  ">
                        <div className="flex justify-end">
                            <div onClick={onClose} >
                                <CrossIcon />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-4">
                            <Input onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" name="title" />
                            <Input onChange={(e) => { setLink(e.target.value) }} placeholder="Link" name="Link" />
                            <div className="">
                                <div>Type: </div>
                                <div className="flex gap-2 mt-2 mb-2">
                                    <Button text="YouTube" size="md" variant={type === "youtube" ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType("youtube")
                                        }} />
                                    <Button text="Twitter" size="md" variant={type === "twitter" ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType("twitter")
                                        }} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button variant="primary" size="md" text="Submit" onClick={() => {
                                try {
                                    if (title === "" && link === "") {
                                        alert("field can't be empty");
                                    } else {
                                        const token = localStorage.getItem('token');
                                        if (!token) {
                                            alert("please login")
                                        } else {
                                            axios.post("http://localhost:3000/api/v1/user/content", {
                                                title,
                                                link,
                                                type
                                            }, {
                                                headers: {
                                                    Authorization: localStorage.getItem('token')
                                                }
                                            })
                                                .then((response) => { onClose() })
                                        }
                                    }

                                } catch (err) {
                                    alert("request failed, try again");
                                    onClose();
                                }
                            }} />
                        </div>
                    </span>
                </div>
            </div>
        )
    );
}



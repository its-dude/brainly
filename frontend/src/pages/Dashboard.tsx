import Button from "../components/Button";
import Card from "../components/Card";
import { SideBar } from "../components/SideBar";
import { Share } from "../icons/share";
import { PlusIcon } from "../icons/plus";
import { CreateContentModel } from "../components/CreateContentModel";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";
import axios from "axios";


export function Dashboard({ isLogin }: { isLogin: boolean }) {

    const [openModal, setOpenModel] = useState(false);
    const {contents, refresh} = useContent();

    useEffect(()=> {
        refresh();
    }, [openModal]);

    function handleDelete(contentId: string) {
        axios.delete(`http://localhost:3000/api/v1/user/content/${contentId}`,{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        } )
        .then((response) => {
            alert(response.data.message);
            refresh();
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    return <div className="bg-gray-200 w-screen h-screen overflow-x-hidden">
        {isLogin === false ? (
            <>
                <CreateContentModel open={openModal} onClose={() => { setOpenModel(false) }} />
                <div className="flex bg-gray-200">
                    <SideBar />
                    <div className="flex flex-col flex-[6] p-2 ">

                        <div className="flex justify-between  m-6">
                            <div className="text-3xl font-semibold">All Notes</div>
                            <div className="flex gap-2 mx-2">
                                <Button variant="primary" size="md" text="Add Content" startIcon={<PlusIcon />} onClick={() => { setOpenModel(true) }} />
                                <Button variant="secondary" size="md" text="Share Brain" startIcon={<Share />} onClick={()=>{
                                    console.log(localStorage.getItem("token"))
                                    axios.post("http://localhost:3000/api/v1/user/share", {}, {
                                        headers:{
                                        Authorization: localStorage.getItem("token")
                                        }
                                    })
                                    .then( async response => {
                                        if(response.data.link){
                                          await navigator.clipboard.writeText(`http://localhost:3000/api/v1/user/share/${response.data.link}`);
                                            alert(`link copied to clipboard`);
                                        }else{
                                            alert("sharable link got deleted");
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err.message)
                                    })
                                } } />
                            </div>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                           { contents.map(({title, type, link, _id}) => <Card
                            key = {_id}
                            title={title} 
                            type={type} 
                            link={link}
                            contentId={_id}
                            onDelete={handleDelete}
                            />      
                          )}
                        </div>

                    </div>
                </div>
            </>) : (
            <div className="flex items-center justify-center w-full h-full ">
                <h2 className="bg-gray-100 font-bold text-3xl p-6 text-rose-700 border rounded-md shadow">
                Oops! you are not logined
                </h2>
            </div>
        )}
    </div>
}


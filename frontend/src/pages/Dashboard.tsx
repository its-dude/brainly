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

    return <div className="relative bg-gray-100 w-screen min-h-screen">
       
        <CreateContentModel open={false} onClose={()=>{handleDelete}}/>
    
        <SideBar/>
        <div className="absolute top-0 left-72 right-0 w-[calc(100% - 18rem)] h-full p-4 bg-gray-200 overflow-x-hidden">
            <div className="flex justify-end gap-4  fixed top-6 right-4 left-72">
                <Button variant="primary" size="md" text="Add content" startIcon={<PlusIcon/>} />
                <Button variant="secondary" size="md" text="Share content" startIcon={<Share/>} />
            </div>
            {/* contents */}
            <div className="flex flex-wrap gap-4 mt-12">
                {contents.map((content)=><Card key={content._id} title={content.title} type={content.type} link={content.link} contentId={content._id} onDelete={handleDelete} />  )}
            </div>
        </div>
    </div>
}


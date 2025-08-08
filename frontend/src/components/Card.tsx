import { Share } from "../icons/share";
import { YoutubeIcon } from "../icons/youtube";

export interface CardInterface{
    type: "youtube"| "twitter",
    title: string,
    link: string
}

export default function Card({ title, type, link }: CardInterface) {
    return <div>
    <div className="bg-white border rounded-md p-4 max-w-72 min-h-48 m-2 flex flex-col items-center">
       
        <div className="flex justify-between w-full ">
            <div className="flex gap-2 font-semibold">
                <div className="text-gray-500">
                   {type == "youtube" && <YoutubeIcon/>}
                </div>
                {title}
            </div>
            <div className="flex gap-2 text-gray-500">
                <Share />
                <Share />
            </div>
        </div>

        <div className="p-4 ">
            {type == "youtube" && <iframe className="w-full" src={link}
                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        </div>

        <div className="p-4">
            {type == "twitter" && <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>}
        </div>

    </div>
    </div>

}


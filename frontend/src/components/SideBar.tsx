import { Logo } from "../icons/logo"
import { YoutubeIcon } from "../icons/youtube"
import { TwitterIcon } from "../icons/twitter"
import { DocsIcon } from "../icons/docs"

export function SideBar() {
    const iconNameStyle = "cursor-pointer hover:text-gray-800";

    return <div className="flex flex-col w-72  p-2 h-screen border bg-gray-100 fixed left-0 top-0">

        <div className="flex gap-2 items-center text-3xl mb-8">
            <div className="text-purple-800 ">
                <Logo />
            </div>
            Brainly
        </div>

        <div className="flex gap-2 items-center ml-4 mb-4 text-gray-600">
            <YoutubeIcon />
            <div className={iconNameStyle}>YouTube</div>
        </div>

        <div className="flex gap-2 items-center ml-4 mb-4 text-gray-600">
            <TwitterIcon />
            <div className={iconNameStyle}>Twitter</div>
        </div>

        <div className="flex gap-2 items-center ml-4 mb-4 text-gray-600">
         <DocsIcon/>
         <div className={iconNameStyle}>Documents</div>
        </div>

    </div>
}
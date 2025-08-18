import { Link } from "react-router-dom"

export function FormBottomWarning({message, buttonText, to}: {message:string, buttonText: string, to: string}) {
    return <div className="font-xl ">
            {message}
            <Link className="underline cursor-pointer pl-1 text-blue-500 hover:text-blue-800" to={to}>
             {buttonText}
            </Link>
    </div>
}
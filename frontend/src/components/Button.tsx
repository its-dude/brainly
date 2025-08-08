import type { ReactElement } from "react"

export interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg" ,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    text: string
};

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
}

const sizeStyles = {
    "sm": "px-2 py-1",
    "md": "px-4 py-2",
    "lg": "px-6 py-4"
}

const defaultStyle = "flex gap-2 p-2 border rounded-md font-normal"

export default function Button(props: ButtonProps) {
    return <button className={` ${defaultStyle} ${variantStyles[props.variant]} ${sizeStyles[props.size]} `}>
            <p>{props.startIcon}</p>
            <p>{props.text}</p>
            </button>
}

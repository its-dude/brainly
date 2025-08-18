interface Inputprops {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    placeholder: string;
    name: string
}

export function Input({ onChange, placeholder, name, label}: Inputprops) {
    return <div className="flex flex-col w-full ">
           {label && <label className="text-start p-1 font-semibold text-md" htmlFor={name}>{label}</label>}
           <input type="text" name={name} placeholder={placeholder} onChange={onChange}
            className="w-full border-b-2 border-l-2 shadow  p-2 rounded outline-none"/>
    </div>
}
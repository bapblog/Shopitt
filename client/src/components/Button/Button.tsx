import React, { FC,MouseEvent} from "react";

type ButtonProps = {
    text: string,
    color: string,
    btnType?: "button" | "submit" | "reset",
    onclick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
const Button: FC<ButtonProps> = ({text="View All",color="#00FAFF",btnType,onclick}) => {
    return (
        <button onClick={onclick} type={btnType} className={`flex flex-row w-full justify-center items-center bg-blue-400 bg-[${color}] py-2 rounded-md`}>
            <h1 className="font-bold text-gray-700 text-lg">{text}</h1>
        </button>
    )
}

export default Button;
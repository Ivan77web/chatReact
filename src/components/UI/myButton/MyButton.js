import React from "react";
import cl from "./MyButton.module.css"

export default function MyButton({name, ...props}){

    return(
        <button className={cl.myBtn} {...props}>
            {name}
        </button>
    )
}
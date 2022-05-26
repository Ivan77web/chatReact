import React from "react";
import cl from "./MyInput.module.css"

export default function MyInput({value, onChange}){


    return(
        <input 
            className={cl.input} 
            value = {value}
            onChange = {onChange}
        />
    )
}
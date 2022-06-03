import React from "react";
import cl from "./MyInput.module.css"

export default function MyInput({placeholder, value, onChange, sendMessage, height}){
    const enterSendMessage = (e) => {
        if(e.code == "Enter" && sendMessage){
            sendMessage();
        }
    }

    return(
        <input 
            placeholder = {placeholder}
            style={{height: height}}
            className={cl.input} 
            value = {value}
            onChange = {onChange}
            onKeyPress = {enterSendMessage}
        />
    )
}
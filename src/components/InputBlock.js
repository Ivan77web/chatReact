import React from "react";
import { Button } from "@mui/material";
import cl from "./styles/InputBlock.module.css"
import MyInput from "./UI/MyInput/MyInput";

export default function InputBlock({value, setValue, sendMessage, chatIdOne, chatIdTwo}){
    return(
        <div className = {cl.inputBlock}>
            <div className={cl.input}>
                <MyInput
                    placeholder = "Введите сообщение"
                    value = {value}
                    onChange = {(e) => setValue(e.target.value)}
                    sendMessage={sendMessage}
                    height = "55px"
                />
            </div>
    
            <Button
                style={{width: "15%", marginLeft: "10px", border: "1px solid gray", marginRight: "10px"}}
                onClick={sendMessage}
            >
                Отправить
            </Button>
        </div>
    )
}
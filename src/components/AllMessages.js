import React, {useEffect, useState} from "react";
import cl from "./styles/AllMessages.module.css"
import OneMessage from "./OneMessage";

export default function AllMessages({chatIdOne, chatIdTwo, messages, user}){
    const classes = (chatIdOne == null && chatIdTwo == null) ? cl.allMessages + " " + cl.notScroll : cl.allMessages;

    useEffect(()=>{
        if(chatIdOne != null && chatIdTwo != null){
            const allMessages = document.querySelector(`.${cl.allMessages}`)
            allMessages.scrollTo(0,allMessages.scrollHeight)
        }
    },[messages])

    return(
        <div className={classes}>
            {
                (chatIdOne == null && chatIdTwo == null) 
                ?
                <div className={cl.helpText}>Выберите собеседника</div> 
                : 
                messages.map( message =>
                    <div className={cl.oneMessage} style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                        <OneMessage
                            message = {message}
                            user = {user}
                        />
                    </div>
                )   
            }
        </div>
    )

}
import React, { useContext } from "react";
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';
import cl from "./styles/AllMessages.module.css"
import { Avatar } from "@mui/material";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';



export default function OneMessage({chatIdOne, chatIdTwo, messages, user}){
    return(
        <div>
            {
                (chatIdOne == null && chatIdTwo == null) 
                ?
                <div className={cl.helpText}>Выберите собеседника</div> 
                : 
                messages.map( message =>
                    <div className={cl.oneMessage} style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                        <div className={cl.avatarAndName} style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                            <Avatar className={cl.oneMessageAvatar} src={message.photoURL} />
                            <div className={cl.userName}>{message.displayName}</div>
                        </div>
    
                        <div className={cl.oneMessageText} style={{background: user.uid === message.uid ? "rgb(149, 241, 149)" : "white", marginLeft: user.uid === message.uid ? 'auto' : '70px'}}> 
                            {message.text}
                        </div>
                    </div>
                )   
            }
        </div>
    )

}
import React from "react";
import { Avatar } from "@mui/material";
import cl from './styles/OneMessage.module.css'

export default function OneMessage({message, user}){
    const isMyMessage = user.uid === message.uid;
    
    return(
        <div className={cl.OneMessage}>
            {
                (isMyMessage)
                ?
                    <div className={cl.avatarAndName} style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                        <div className={cl.userName}>{message.displayName}</div>
                        <Avatar className={cl.oneMessageAvatar} src={message.photoURL} />
                    </div>
                :
                    <div className={cl.avatarAndName} style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                        <Avatar className={cl.oneMessageAvatar} src={message.photoURL} />
                        <div className={cl.userName}>{message.displayName}</div>
                    </div>
            }
            
            <div className={ (isMyMessage) ? cl.oneMyMessageText : cl.oneUsersMessageText}> 
                {message.text}
            </div>
        </div>
    )
}
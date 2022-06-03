import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import OneUserInTable from "./OneUserInTable";
import { Context } from "..";
import cl from "./styles/SearchUsers.module.css"

export default function SearchUsers({windowOpen, setChatIdOne, setChatIdTwo, resultSearch, user}){
    const {auth, firestore} = useContext(Context);
    const [chats] = useCollectionData(
        firestore.collection('chats')
    )  
    
    const clickCompanion = (id) => {
        setChatIdOne(`chatID-${auth._delegate.lastNotifiedUid}-${id}`);
        setChatIdTwo(`chatID-${id}-${auth._delegate.lastNotifiedUid}`);
        sendChat(id)
    }

    const sendChat = async (id) => {
        let flag = true;

        for(let i = 0; i < chats.length; i++){
            if(chats[i].text == `chatID-${auth._delegate.lastNotifiedUid}-${id}`){
                flag = false;
            }else if(chats[i].text == `chatID-${id}-${auth._delegate.lastNotifiedUid}`){
                flag = false;
            }
        }

        if(flag){
            firestore.collection('chats').add({
                text: `chatID-${auth._delegate.lastNotifiedUid}-${id}`,
            })
        }
    }

    return(
        <div className={cl.usersInTable}>
            {resultSearch.map( (oneUser) => {
                return(
                    <OneUserInTable
                        key = {oneUser.id} 
                        clickCompanion={clickCompanion} 
                        user={oneUser}  
                        windowOpen={windowOpen}
                        onlineUser = {user}
                    />
                )
            })}
        </div>
    )
}
import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';
import cl from "./styles/OurUsers.module.css"
import OneUserInTable from "./OneUserInTable";

export default function OurUsers({setChatIdOne, setChatIdTwo}){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [windowOpen, setWindowOpen] = useState(true)
    const [chats] = useCollectionData(
        firestore.collection('chats')
    )  

    const allUsers = useCollectionData(
        firestore.collection('users')
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

    useEffect(()=>{
        if(allUsers[0]){
            setLoading(false);
        }
    }, [allUsers])

    const resize = () => {
        let window;

        if(document.querySelector(`.${cl.ourUsersOpen}`)){
            window = document.querySelector(`.${cl.ourUsersOpen}`);
            setWindowOpen(false);
        } else if (document.querySelector(`.${cl.ourUsersClose}`)){
            window = document.querySelector(`.${cl.ourUsersClose}`);
            setWindowOpen(true);
        }

        window.classList.toggle(`${cl.ourUsersClose}`);
        window.classList.toggle(`${cl.ourUsersOpen}`);
    }

    useEffect(()=>{
        console.log(windowOpen);
    }, [windowOpen])

    if(!loading){
        return(    
            <div className={cl.ourUsersOpen}>

                {windowOpen ? <h3 className={cl.intro}>Ваши собеседники</h3> : <div/>}

                {allUsers[0].map( (user) => {
                    return(
                        <OneUserInTable key = {user.id} clickCompanion={clickCompanion} user={user} windowOpen={windowOpen}/>
                    )
                })}

                <div onClick={()=> resize()} className={cl.pointer}/>
            </div>  
        )
    }
}
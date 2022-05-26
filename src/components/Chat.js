import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from "./UI/loader/Loader";
import firebase from 'firebase/compat/app';
import OurUsers from "./OurUsers";
import cl from "./styles/Chat.module.css"
import AllMessages from "./AllMessages";
import InputBlock from "./InputBlock";

export default function Chat(){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [chatIdOne, setChatIdOne] = useState(null);
    const [chatIdTwo, setChatIdTwo] = useState(null);
    const [inputChat, setInputChat] = useState(auth._delegate.lastNotifiedUid);
    const [chats] = useCollectionData(
        firestore.collection('chats')
    )

    useEffect(()=>{
        if(chats){
            for(let i = 0; i < chats.length; i++){
                if(chats[i].text == chatIdOne){
                    setInputChat(chatIdOne);
                } else if(chats[i].text == chatIdTwo){
                    setInputChat(chatIdTwo);
                }
            }
        }
    }, [chats, chatIdOne, chatIdTwo])

    const [messages, loading] = useCollectionData(
        firestore.collection(inputChat).orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection(inputChat).add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
    }

    if(loading){
        return(
          <Loader/>
        )
    }

    return(
        <div className={cl.chat}>
            <div className={cl.ourUsers}>
                <OurUsers setChatIdOne={setChatIdOne} setChatIdTwo={setChatIdTwo}/>
            </div>

            <div className={cl.chatBlock} id="chatBlock">
                <div className={cl.allMessages}>
                    <AllMessages
                        chatIdOne = {chatIdOne}
                        chatIdTwo = {chatIdTwo}
                        messages = {messages}
                        user = {user}
                    />
                </div>

                <div className={cl.input}>
                    <InputBlock
                        value = {value}
                        setValue = {setValue}
                        sendMessage = {sendMessage}
                        chatIdOne = {chatIdOne}
                        chatIdTwo = {chatIdTwo}
                    />
                </div>

            </div>
        </div>
    )
}
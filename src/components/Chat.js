import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from "./UI/loader/Loader";
import firebase from 'firebase/compat/app';
import OurUsers from "./OurUsers";

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

    if(chatIdOne == null || chatIdTwo == null){
        return(
            <div>
                <OurUsers setChatIdOne={setChatIdOne} setChatIdTwo={setChatIdTwo}/>
                <h1>
                    Выберите собеседника...
                </h1>
            </div>
        )
    }

    return(
        <Container>
            {/* <TestChatId setChatId={setChatId}/> */}
            <OurUsers setChatIdOne={setChatIdOne} setChatIdTwo={setChatIdTwo}/>
            <Grid 
                container
                justify={"center"}            
                style={{height: window.innerHeight - 50, marginTop: "20px"}}
            >
                <div className="allMessages">
                    {messages.map( message =>
                        <div className="oneMessage" style={{marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                            <Grid container style={{width: "fit-content", marginLeft: user.uid === message.uid ? "auto" : '0'}}>
                                <Avatar className="oneMessageAvatar" src={message.url} />
                                <div style={{marginTop: 10}}>{message.displayName}</div>
                            </Grid>

                            <div className="oneMessageText" style={{background: user.uid === message.uid ? "rgb(149, 241, 149)" : "white"}}> 
                                {message.text}
                            </div>
                        </div>
                    )}
                </div>

                <Grid
                        container
                        style={{width: '100%', display: 'flex', marginTop: "10px", height: '56px'}}
                    >
                        <TextField 
                            variant={"outlined"} 
                            style={{width: "80%"}} 
                            value = {value}
                            onChange = {(e) => setValue(e.target.value)}
                        />
                        <Button
                            style={{width: "15%", marginLeft: "5%", border: "1px solid gray"}}
                            onClick={sendMessage}
                        >
                            Отправить
                        </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
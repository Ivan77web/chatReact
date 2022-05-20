import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function OurUsers({setChatIdOne, setChatIdTwo}){

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [chats] = useCollectionData(
        firestore.collection('chats')
    )
    

    const allUsers = useCollectionData(
        firestore.collection('users')
    )

    const clickCompanion = (e) => {
        if(e.target.classList.contains("userId")){  // РЕШИТЬ ЭТУ ПРОБЛЕМУ !!!!!!!!!!!
            const elem = e.target
            setChatIdOne(`chatID-${auth._delegate.lastNotifiedUid}-${elem.innerHTML}`);
            setChatIdTwo(`chatID-${elem.innerHTML}-${auth._delegate.lastNotifiedUid}`);
            sendChat(e.target)
        }
    }

    const sendChat = async (elem) => {

        let flag = true;

        for(let i = 0; i < chats.length; i++){
            if(chats[i].text == `chatID-${auth._delegate.lastNotifiedUid}-${elem.innerHTML}`){
                flag = false;
            }else if(chats[i].text == `chatID-${elem.innerHTML}-${auth._delegate.lastNotifiedUid}`){
                flag = false;
            }
        }

        if(flag){
            firestore.collection('chats').add({
                text: `chatID-${auth._delegate.lastNotifiedUid}-${elem.innerHTML}`,
            })
        }
    }

    useEffect(()=>{
        if(allUsers[0]){
            setLoading(false);
        }
    }, [allUsers])

    if(!loading){
        return(
            <div style={{position: "fixed", border: "2px solid black", marginLeft: "200px", width: "500px", background: "white", color: "black"}}>
                {allUsers[0].map( (user) => {
                    return(
                        <div className="oneUser" key = {user.id} onClick={(e) => clickCompanion(e)} style={{display: "flex"}}>
                            <div className="userName">
                                {user.name}
                            </div> 
                            
                            -

                            <div className="userId">
                                {user.id}
                            </div>
                        </div>
                    )
                })}
            </div>       
        )
    }
}
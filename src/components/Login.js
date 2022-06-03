import React, {useContext} from "react";
import { Container } from "@mui/material";
import { Button, Grid, Box } from "@mui/material";
import { Context } from "..";
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import cl from "./styles/Login.module.css"
import MyButton from "./UI/myButton/MyButton";

export default function Login(){
    const {auth, firestore} = useContext(Context);
    const allUsers = useCollectionData(
        firestore.collection('users')
    )

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        addUsers(user);
    }

    const addUsers = async (user) => {
        let flag = 1;

        for(let i = 0; i < allUsers[0].length; i++){
            if(allUsers[0][i].id == user.uid){
                flag = 0;
            }
        }

        if(flag){
            firestore.collection('users').add({
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL
            })
        }
    }

    return(
        <div className={cl.login}>
            <p>
                Для продолжения требуется авторизация. <br/>Это не займет много времени.
            </p>

            <div className={cl.button}>
                <MyButton onClick={login} name="Войти с помощью Google"/>
            </div>
        </div>
    )
}
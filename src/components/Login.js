import { Container } from "@mui/material";
import { Button, Grid, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';


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
            })
        }
    }

    return(
        <Container>
            <Grid   
                container 
                style={{height: window.innerHeight - 50}} 
                alignItems={"center"} 
                justifyContent={"center"}
            >
                <Grid
                    style={{width: 400, background: "lightgray"}}
                    container
                    alignItems="center"
                    direction="column"
                >
                    <Box p={5}>
                        <Button onClick={login} variant="outlined">Войти с помощью Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
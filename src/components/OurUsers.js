import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "..";
import { useAuthState } from 'react-firebase-hooks/auth';
import cl from "./styles/OurUsers.module.css"
import {Transition} from "react-transition-group";
import './styles/OurUsersAnimation.css'
import MyInput from "./UI/MyInput/MyInput";
import SearchUsers from "./SearchUsers";

export default function OurUsers({setChatIdOne, setChatIdTwo}){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [windowOpen, setWindowOpen] = useState(true)
    const [valueSearch, setValueSearch] = useState("");
    const [resultSearch, setResultSearch] = useState();
    const allUsers = useCollectionData(
        firestore.collection('users')
    )

    useEffect(()=>{
        if(allUsers[0] != undefined){
            setResultSearch(allUsers[0].filter(oneUser => 
                (oneUser.name.toLowerCase().includes(valueSearch.toLowerCase()))
                || 
                (oneUser.name == user.displayName && ("избранное").includes(valueSearch.toLowerCase()))))
        }
    },[allUsers, valueSearch])

    useEffect(()=>{
        if(allUsers[0]){
            setLoading(false);
        }
    }, [allUsers])

    const resize = () => {
        setWindowOpen(!windowOpen);
    }

    if(!loading){
        return( 
            <Transition
                in = {windowOpen}
                timeout = {1000}
            >
                {
                    state => 
                        <div className={cl.ourUsers + " " + state}>
                            {
                                (windowOpen)
                                ?
                                <div className={cl.input}>
                                    <MyInput
                                        value = {valueSearch}
                                        onChange = {(e) => setValueSearch(e.target.value)}
                                        height = "30px"
                                        placeholder = "Поиск собеседника"
                                    />
                                </div>
                                :
                                <div/>
                            }

                            <SearchUsers
                                user = {user}
                                windowOpen={windowOpen}
                                setChatIdOne = {setChatIdOne}
                                setChatIdTwo = {setChatIdTwo}
                                allUsers = {allUsers}
                                resultSearch = {resultSearch}
                            />

                            <div onClick={()=> resize()} className={cl.pointer}/>
                        </div>  
                }
            </Transition> 
        )
    }
}
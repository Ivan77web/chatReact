import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import cl from "./styles/Navbar.module.css";
import MyButton from "./UI/myButton/MyButton";
import { Avatar } from "@mui/material";

export default function Navbar(){
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return(
        <div className={cl.navbar}>
            {user ?
                <div className={cl.navbarWithUser}>
                    <div className={cl.iconUser}>
                        <Avatar className={cl.userAvatar} src={user.photoURL}/>
                        <div className={cl.userName}>{user.displayName}</div>
                    </div>
                    <div className={cl.button}>
                        <MyButton onClick={ () => auth.signOut() } name="Выйти"/>
                    </div>
                </div>       
            :
                <Link to={LOGIN_ROUTE}> 
                    <div className={cl.button}>
                        <MyButton name="Логин"/> 
                    </div>
                </Link>  
            }
        </div>

    )
}
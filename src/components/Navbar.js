import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import cl from "./styles/Navbar.module.css";
import MyButton from "./UI/myButton/MyButton";

export default function Navbar(){

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return(
        <div className={cl.navbar}>
            {user ?
                <div className={cl.button}>
                    <MyButton onClick={ () => auth.signOut() } name="Выйти"/>
                </div>
                        
            :

                // На данный момент эта кнопка ничего не делает!!!

                <Link to={LOGIN_ROUTE}> 
                    <div className={cl.button}>
                        <MyButton name="Логин"/> 
                    </div>
                </Link>  
            }
        </div>

    )
}
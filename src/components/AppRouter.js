import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import Chat from "./Chat";
import Login from "./Login";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";

export default function AppRouter(){
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? 
        (
            <Routes>
                {privateRoutes.map( (path, Component)=>{
                    <Route key={path} path={path} element={Component}/>
                })}
                <Route path="*" element={<Chat/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map( (path, Component)=>{
                    <Route key={path} path={path} element={Component}/>
                })}
                <Route path="*" element={<Login/>}/>
            </Routes>
        )
}
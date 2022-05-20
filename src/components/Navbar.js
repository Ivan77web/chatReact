import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";

export default function Navbar(){

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return(
        <AppBar color="secondary" position="static">
            <Toolbar variant="dense">
                <Grid container justify="flex-end">
                    {user ?
                        <div style={{display: "flex"}}>
                            <Button onClick={ () => auth.signOut() } variant="outlined">Выйти</Button>
                        </div>
                        
                        :
                        <Link to={LOGIN_ROUTE}>
                            <Button variant="outlined">Логин</Button>
                        </Link>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
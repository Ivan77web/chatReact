import React from "react";
import "./styles/OneUserInTable.css"
import { Avatar } from "@mui/material";
import {Transition} from "react-transition-group";

export default function OneUserInTable({user, clickCompanion, windowOpen, onlineUser}){
    return(
        <Transition
            in = {windowOpen}
            timeout = {1000}
        >
            {
                (state) =>
                    <div className={`oneUser`} onClick={ () => clickCompanion(user.id)}>
                        <div>
                            <Avatar className={`oneUserAvatar`} src={user.photo} />
                        </div>
                        <div className={`nameAndId ${state}`}>
                            <div className='userName'>
                                {
                                    onlineUser.displayName == user.name
                                    ?
                                    "Избранное"
                                    :
                                    user.name
                                }
                            </div> 
                            <div className='userId'>
                                id: {user.id}
                            </div>
                        </div>
                    </div>
            }
        </Transition>
    )
}
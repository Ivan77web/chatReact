import React, { useState } from "react";
import "./styles/OneUserInTable.css"
import { Avatar } from "@mui/material";

export default function OneUserInTable({user, clickCompanion, windowOpen}){
    return(
        <div className="oneUser" onClick={ () => clickCompanion(user.id)}>
            <div>
                <Avatar className="oneUserAvatar" src={user.photo} />
            </div>

            {
                windowOpen
                ?
                    <div>
                        <div className="userName">
                            {user.name}
                        </div> 
                        <div className="userId">
                            id: {user.id}
                        </div>
                    </div>
                :
                <div/>
            }

        </div>
    )
}
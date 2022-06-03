import React, { useEffect } from "react";
import cl from './styles/ChatBlock.module.css'
import AllMessages from "./AllMessages";
import InputBlock from "./InputBlock";

export default function ChatBlock({chatIdOne, chatIdTwo, messages, user, value, setValue, sendMessage}){
    return(
        <div className={cl.chatBlock} id="chatBlock">
            <div className={cl.allMessages}>
                <AllMessages
                    chatIdOne = {chatIdOne}
                    chatIdTwo = {chatIdTwo}
                    messages = {messages}
                    user = {user}
                />
            </div>

            {
                (chatIdOne != null && chatIdTwo != null)
                ?
                    <div className={cl.input}>
                        <InputBlock
                            value = {value}
                            setValue = {setValue}
                            sendMessage = {sendMessage}
                            chatIdOne = {chatIdOne}
                            chatIdTwo = {chatIdTwo}
                        />
                    </div>
                :
                    <div/>
            }
        </div>
    )
}
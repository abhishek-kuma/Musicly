'use client';
import { createContext, useContext, useState } from "react";
const globalContext = createContext({});
interface Props {
    children: React.ReactNode
}

export const GlobalContextProvider = ({ children }: Props) => {
    const [status, setStatus] = useState<boolean>(false);
    const [name, setName] = useState<string>("Abhishek");
    const [userid, setUserid] = useState<string>("");
    const [songindex, setSongindex] = useState<number>(0);
    const [avatarUrl, setavatarUrl] = useState<string>("");
    const [chatboxOpen, setchatboxOpen] = useState<boolean>(false);

    const globalProps = {        
        status, // status: indicates whether the user is logged in or not        
        setStatus, // setStatus: sets the status of the user        
        name, // name: the name of the user        
        setName, // setName: sets the name of the user        
        userid, // userid: the id of the user        
        setUserid, // setUserid: sets the user id of the user        
        songindex, // songindex: the index of the current song        
        setSongindex, // setSongindex: sets the index of the current song        
        avatarUrl, // avatarUrl: the URL of the user's avatar        
        setavatarUrl, // setavatarUrl: sets the URL of the user's avatar        
        chatboxOpen, // chatboxOpen: indicates whether the chatbox is open or not        
        setchatboxOpen // setchatboxOpen: sets the state of the chatbox    
    } 

    return (
        <globalContext.Provider value={globalProps}>
            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(globalContext);

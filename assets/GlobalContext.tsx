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
        status,
        setStatus,
        name,
        setName,
        userid,
        setUserid,
        songindex,
        setSongindex,
        avatarUrl,
        setavatarUrl,
        chatboxOpen,
        setchatboxOpen
    }
    return (
        <globalContext.Provider value={globalProps}>
            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(globalContext);

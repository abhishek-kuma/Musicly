'use client';
import { createContext, useContext, useState } from "react";
const globalContext = createContext({});
interface Props {
    children: React.ReactNode
}

export const GlobalContextProvider = ({ children }: Props) => {
    const [status, setStatus] = useState<boolean>(false);
    const [name , setName] = useState<string>("");
    const [userid , setUserid] = useState<string>("");
    const [songindex , setSongindex] = useState<number>(0);

    return (
        <globalContext.Provider value={{ status , setStatus,name , setName ,userid,setUserid,songindex,setSongindex}}>
            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(globalContext);

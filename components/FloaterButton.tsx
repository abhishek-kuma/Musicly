'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import ChatBox from './ChatBox';
import { useGlobalContextProvider } from '@/assets/GlobalContext';

interface chatboxInterface {
    chatboxOpen: boolean;
    setchatboxOpen: Function;
}
import { BsChatSquareQuoteFill } from "react-icons/bs";
const FloaterButton = () => {

    const { chatboxOpen, setchatboxOpen } = useGlobalContextProvider() as chatboxInterface

    return (
        <div className='fixed bottom-40 right-10'>
            {!chatboxOpen && <Button className='rounded-full' onClick={() => {
                (setchatboxOpen(true))
            }}>
                <BsChatSquareQuoteFill className='h-5 w-5' />
            </Button>}
            {chatboxOpen && <ChatBox />}
        </div>
    )
}

export default FloaterButton

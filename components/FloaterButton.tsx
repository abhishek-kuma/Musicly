'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import ChatBox from './ChatBox';

import { BsChatSquareQuoteFill } from "react-icons/bs";
const FloaterButton = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className='fixed bottom-40 right-10'>
            <Button className='rounded-full' onClick={()=>{setOpen(!open)}}>
                <BsChatSquareQuoteFill className='h-5 w-5' />
            </Button>
            {open && <ChatBox />}
        </div>
    )
}

export default FloaterButton

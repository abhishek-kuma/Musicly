'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { GiMusicSpell } from "react-icons/gi";
import Link from 'next/link';
import { useGlobalContextProvider } from '@/assets/GlobalContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
interface LoginInterface {
    status: boolean;
    setStatus: Function;
    avatarUrl: string;
    setavatarUrl: Function;
    name: string;
    setName: Function;
    userid: string;
    setUserid: Function;
}

import authService from '@/appwrite/config';
import { TbMusicShare } from "react-icons/tb";

const Navbar = () => {

    const { status, setStatus, avatarUrl, setavatarUrl, name, setName, userid, setUserid } = useGlobalContextProvider() as LoginInterface;
    const { push } = useRouter();

    async function handleLogOut() {
        try {
            await authService.logout();
            setavatarUrl("");
            setStatus(false);
            toast.success('Logged Out Successfully ✅');
            push('/signin');
        } catch (error) {
            toast.error('Error in Logging Out ❌');
        }
    }

    return (
        <nav className="p-2 mt-2">
            <div className="flex justify-around">
                <Link href='/' className="container flex gap-2">
                    <div className='text-3xl'>
                        <GiMusicSpell />
                    </div>
                    <div className="font-bold text-xl">
                        Musicly
                    </div>
                </Link>

                <div className="flex justify-items-center gap-3">
                    {!status && <Button className="">
                        <Link href='/signin'>Sign In</Link>
                    </Button>}
                    {!status && <Button className="">
                        <Link href='/signup'>Sign Up</Link>
                    </Button>}
                    {status && <Button className="" onClick={handleLogOut}>
                        Log Out
                    </Button>}
                    {status && <Button className="">
                        <Link href='/postsong' className='flex gap-2'>
                            Add Song
                            <TbMusicShare className='w-5 h-5' />
                        </Link>
                    </Button>}
                    {
                        status && <Avatar>
                            <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    }
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}
export default Navbar

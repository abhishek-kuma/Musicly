'use client'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { GiMusicSpell } from "react-icons/gi";
import Link from 'next/link';
import { useGlobalContextProvider } from '@/assets/GlobalContext';
import { useRouter } from 'next/navigation';
interface LoginInterface{
    status:boolean;
    setStatus:Function;
}

const Navbar = () => {

    const {status,setStatus} = useGlobalContextProvider() as LoginInterface;
    const { push } = useRouter();
    async function handleLogOut() {
        await setStatus(false);
        push('/signin');
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

                <div className="flex justify-items-center gap-2">
                    {!status && <Button className="">
                        <Link href='/signin'>Sign In</Link>
                    </Button>}
                    {!status && <Button className="">
                        <Link href='/signup'>Sign Up</Link>
                    </Button>}
                    {status && <Button className="" onClick={handleLogOut}>
                        Log Out
                    </Button>}

                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}
export default Navbar

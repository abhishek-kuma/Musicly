'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMail } from "react-icons/io5";
import authService from "@/appwrite/config"
import { useState } from "react"
import { toast } from "sonner"

import { useGlobalContextProvider } from "@/assets/GlobalContext"
import { useRouter } from "next/navigation"
import { FaGoogle } from "react-icons/fa6";

export interface ContextType {
  status: boolean;
  setStatus: Function;
  avatarUrl: string;
  setavatarUrl: Function;
  name: string;
  setName: Function;
  userid: string;
  setUserid: Function;
}

export default function SignInAccount() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setStatus, setavatarUrl, setUserid } = useGlobalContextProvider() as ContextType;


  const { push } = useRouter();

  async function handleLoginEmail() {
    try {
      const userinfo = await authService.signinEmail({ email, password });
      const avatarinfo = await authService.getAvatar();
      setavatarUrl(avatarinfo);
      console.log(userinfo)
      toast.success("Sign In success ✅");
      setStatus(true);
      setUserid(userinfo.$id);
      push('/');
    } catch (error) {
      toast.error("Error in Sign In 🚫")
      console.error(error)
    }
  }
  async function handleLoginOauth(e: any) {
    try {
      e.preventDefault();
      const userinfo = await authService.continueOauth();
      if (userinfo) {
        setStatus(true);  // Sets the status of the user to true which means user is logged in
        push('/');  // redirect to the home page
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden mx-3 px-1">
      <div className="w-full m-auto lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full m-2" onClick={handleLoginEmail}>
              <IoMail className="mr-2 h-4 w-4" /> Sign In with Email
            </Button>
            <Button className="w-full" onClick={handleLoginOauth}><FaGoogle className="mr-2 h-4 w-4" />Continue with Google</Button>
            <p className="mt-2 text-xs text-center text-gray-700 dark:text-white">
              {" "} Don&apos;t have an account?{" "}
              <span className=" text-blue-600 hover:underline"><Link href="/signup">Sign Up</Link></span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
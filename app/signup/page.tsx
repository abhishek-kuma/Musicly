'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMail } from "react-icons/io5"
import { useState } from "react"
import Link from "next/link"
import authService from "@/appwrite/config" //appwrite config file 
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { useGlobalContextProvider } from "@/assets/GlobalContext"

export interface ContextType {
  status: boolean
  setStatus: Function
}


export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const { status, setStatus } = useGlobalContextProvider() as ContextType;

  const { push } = useRouter();

  async function handleSignUp() {
    try {
      const userAccount = await authService.signup({ email, password, name });
      toast.success('Sign Up success ✅');
      setStatus(true);
      await authService.createUserDocument({userid:userAccount.$id,username:name,email:email});
      push('/');
    } catch (error) {
      toast.error('Error in Sign Up 🚫');
      console.error(error);
    }
  }
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden mx-3 px-1">
      <div className="w-full m-auto lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />

            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <span className=" text-blue-600 hover:underline text-sm">
              Forget password ?
            </span>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSignUp}>
              <IoMail className="mr-2 h-4 w-4" /> Sign Up with Email
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700 dark:text-white">
              {" "}
              Already have an account?{" "}
              <span className=" text-blue-600 hover:underline">
                <Link href="/signin">Sign In</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
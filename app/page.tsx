'use client'
import FloaterButton from "@/components/FloaterButton";
import MusicList from "@/components/MusicList";
import Player from "@/components/Player";
import { useEffect } from "react";
import authService from "@/appwrite/config";
import { useGlobalContextProvider } from "@/assets/GlobalContext";
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
export default function Home() {

  const { setStatus, setName, setUserid } = useGlobalContextProvider() as LoginInterface;

  useEffect(() => {
    const getisLoggedin = async () => {
      try {
        const userinfo = await authService.getCurrentUser();
        console.log(userinfo)
        if (userinfo) {
          setStatus(true);
          setUserid(userinfo.$id);
          setName(userinfo.name);
          console.log(userinfo);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getisLoggedin();
  });

  return (
    <div className="">
      <MusicList />
      <FloaterButton />
      <div className="fixed bottom-0 left-0 right-0">
        <Player />
      </div>
    </div>
  )
}

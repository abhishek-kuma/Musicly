import ChatBox from "@/components/ChatBox";
import FloaterButton from "@/components/FloaterButton";
import MusicList from "@/components/MusicList";
import MusicPlayer from "@/components/MusicPlayer";
import Player from "@/components/Player";


export default function Home() {
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

'use client'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import { MdQueueMusic } from "react-icons/md";
import musicTracks from '@/assets/musiclist';
const Player = () => {
    const [trackIndex, settrackIndex] = useState(0);

    const handleClickPrevious = () => {
        settrackIndex((currentTrack) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        );
    };
    const handleClickNext = () => {
        settrackIndex((currentTrack) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        );
    };


    console.log(musicTracks[trackIndex].src);
    // const MusicTitle = (
    //     <div className="text-sm flex">
    //         <MdQueueMusic className='w-5 h-5' />
    //         <div className='mx-1'></div>
    //         <p>Sample Header</p>
    //     </div>
    // )
    return (
        <div className='md-2 mx-10 px-10 mx-10'>
            <AudioPlayer
                className='rhap_theme-color: #868686;'
                autoPlay
                src={musicTracks[trackIndex].src}
                onPlay={e => console.log("onPlay")}
                showDownloadProgress={true}
                header={`Now playing: ${musicTracks[trackIndex].name}`}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                onEnded={handleClickNext}
                showSkipControls={true}
                showJumpControls={false}
                

            // other props here
            />
        </div>
    )
}

export default Player

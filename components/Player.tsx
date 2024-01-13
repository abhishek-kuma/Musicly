'use client'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import musicTracks from '@/assets/musiclist';
import { useGlobalContextProvider } from '@/assets/GlobalContext';

interface MusicProps {
    songindex: number;
    setSongindex: Function;
}
const Player = () => {
    const { songindex, setSongindex } = useGlobalContextProvider() as MusicProps;

    const handleClickPrevious = () => {
        setSongindex((currentTrack: number) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        );
    };
    const handleClickNext = () => {
        setSongindex((currentTrack: number) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        );
    };
    console.log(musicTracks[songindex].src);
    return (
        <div className=''>
            <AudioPlayer
                className='rhap_theme-color: #868686;'
                autoPlay
                src={musicTracks[songindex].src}
                onPlay={e => console.log("onPlay")}
                showDownloadProgress={true}
                header={`Now playing: ${musicTracks[songindex].name}`}
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

'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import musicTracks from '@/assets/musiclist'
import { useGlobalContextProvider } from '@/assets/GlobalContext';
interface MusicProps {
  songindex: number;
  setSongindex: Function;
}

const MusicList = () => {
  const { songindex, setSongindex } = useGlobalContextProvider() as MusicProps;

  function handleSongChange(index: string) {
    const num = parseInt(index);
    setSongindex(num - 1);
  }
  return (
    <div className='m-2 p-2 max-h-96 overflow-y-auto scrollbar-hide'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className="">Song</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {musicTracks.map((track) => (
            <TableRow key={track.ID} onClick={() => { handleSongChange(track.ID) }} className='hover:cursor-pointer'>
              <TableCell className="font-medium">{track.name}</TableCell>
              <TableCell>{track.artist}</TableCell>
              <TableCell>{track.album}</TableCell>
              <TableCell className="text-right">{track.duration || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default MusicList

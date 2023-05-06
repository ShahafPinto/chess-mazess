import { observer } from "mobx-react";
import {preferencesViewModel} from '../../../services/preferencesViewModel'
import playlist from '@/views/App/musicAssets';
import useSound from 'use-sound';
import { FC, useEffect, useRef, useState } from "react";

export const Music: FC = observer(({}) => {
    const {soundMode, toggleSoundMode} = preferencesViewModel;
    let {currentSong, audio} = preferencesViewModel;
    
    // useEffect(()=>{
    //     if(soundMode){
    //         audio.play()
    //     }
    // },[])
    const handleclick = ()=>{
        console.log(soundMode)
        if(soundMode){
            audio = new Audio(playlist[currentSong]);
            audio.addEventListener('ended', () => {
                playNext(playlist.length);
            });
            let playPromise = audio.play();
    
            if (playPromise !== undefined) {
                playPromise.then(function () {}).catch(function (error:Error) {
                console.log('the song is not available', error)
                return
            });
          }
          currentSong += 1;
        } else {
          currentSong = 0;
          playNext(length);
        }
      };
    
    
    const playNext = (length: number) => {
        if (currentSong < length) {
          audio = new Audio(playlist[currentSong]);
          audio.addEventListener('ended', () => {
            playNext(length);
          });
          let playPromise = audio.play();
    
          if (playPromise !== undefined) {
            playPromise.then(function () {}).catch(function (error) {
              error = 'the song is not available'
              console.log(error)
              return
            });
          }
          currentSong += 1;
        } else {
          currentSong = 0;
          playNext(length);
        }
      };
    
    return (
      <button onClick={handleclick}>play music</button>
    );
  });


    
    
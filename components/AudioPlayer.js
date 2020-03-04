import React, {useState} from 'react'
import {mediaURL} from "../constants/UrlConst";
import {Audio} from "expo-av";


const useAudioPlayer = ()=>{

    const [soundObject, setSoundObject] = useState(new Audio.Sound());
    const [playing,setPlaying] = useState(false);

    const startPausePlay = async (file) => {
        try {
            // Checking if now playing music, if yes stop that
            if (playing) {
                await soundObject.pauseAsync();
                setPlaying(!playing);
            } else {
                // Checking if item already loaded, if yes just play, else load music before play
                if (soundObject._loaded) {
                    await soundObject.playAsync();
                } else {
                    const path = {
                        uri: mediaURL + file.filename,
                    };
                    await soundObject.loadAsync(path);
                    await soundObject.playAsync();
                    console.log('hello');
                }
                setPlaying(!playing);
            }
        }catch (e) {
            console.log('startPlay ' ,e);
        }
    };

  return{
      startPausePlay,
      playing
  }
};

export default useAudioPlayer;
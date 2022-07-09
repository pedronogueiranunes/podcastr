import Image from "next/image";
import Slider from "rc-slider";
import { useRef, useEffect } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from "./styles.module.scss";
import { useState } from "react";


export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        isLooping, 
        isShuffling, 
        togglePlay,
        toggleLoop,
        toggleShuffle,
        playNext,
        playPrevious,
        setPlayingState,
        hasNext,
        hasPrevious 
    } = usePlayer()

    const [progress, setProgress] = useState(0)

    const episode = episodeList[currentEpisodeIndex]
    
    useEffect(() => {
        
        if (!audioRef.current) {
            return;
        } 

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }


    }, [isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener("timeupdate", event => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt=""/>
                <strong>tocando agora</strong>
            </header>

            { episode ? (
                
                <div className={styles.currentEpisode}>

                    <Image 
                    width={592} 
                    height={592} 
                    src={episode.thumbnail}
                    objectFit="cover"
                    />

                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>


                </div>

            ) : (

                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>

            ) }

            <footer className="empty">
                <div className={styles.progress}>

                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (

                            <Slider
                            trackStyle={{backgroundColor: "#04d361"}}
                            railStyle={{backgroundColor: "#9f75ff"}}
                            handleStyle={{borderColor: "#9f75ff"}}
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                            />

                        ): (
                            <div className={styles.emptySlider}></div>
                        )}
                        
                    </div>
                    <span>{convertDurationToTimeString(episode ? episode.duration : 0)}</span>
               
                </div>

                { episode && (
                    <audio
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    loop={isLooping}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    onLoadedMetadata={setupProgressListener}
                    />
                ) }
                
                <div className={styles.buttons}>
                    <button 
                    type="button" 
                    disabled={!episode || episodeList.length == 1}
                    onClick={toggleShuffle} 
                    className={isShuffling ? styles.isActive : ""}
                    >
                        <img src="/shuffle.svg" alt="embaralhar"></img>
                    </button>
                    <button 
                    type="button" 
                    disabled={!episode || !hasPrevious} 
                    onClick={playPrevious} >
                        <img src="/play-previous.svg" alt="Tocar anterior"></img>
                    </button>
                    <button 
                    type="button" 
                    className={styles.playButton} 
                    disabled={!episode}
                    onClick={togglePlay}
                    >
                        
                        { isPlaying ?     
                            <img src="/pause.svg" alt="Pausar"></img>
                        :
                            <img src="/play.svg" alt="Tocar"></img>
                        }
                        
                    </button>
                    <button 
                    type="button" 
                    disabled={!episode || !hasNext } 
                    onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima"></img>
                    </button>
                    <button 
                    type="button" 
                    onClick={toggleLoop} 
                    className={isLooping ? styles.isActive : ""}
                    disabled={!episode}
                    >
                        <img src="/repeat.svg" alt="Repetir"></img>
                    </button>
                </div>
            </footer>
        </div>
    )
}
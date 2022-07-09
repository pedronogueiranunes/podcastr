import Image from "next/image";
import Slider from "rc-slider";
import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";


export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        playNext,
        playPrevious,
        setPlayingState 
    } = useContext(PlayerContext)

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

    const episode = episodeList[currentEpisodeIndex]

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
                    <span>00:00</span>

                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                            trackStyle={{backgroundColor: "#04d361"}}
                            railStyle={{backgroundColor: "#9f75ff"}}
                            handleStyle={{borderColor: "#9f75ff"}}
                            />
                        ): (
                            <div className={styles.emptySlider}></div>
                        )}
                        
                    </div>

                    <span>00:00</span>
                </div>

                { episode && (
                    <audio
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    />
                ) }
                
                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="embaralhar"></img>
                    </button>
                    <button type="button" disabled={!episode} onClick={playPrevious} >
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
                    <button type="button" disabled={!episode} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima"></img>
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir"></img>
                    </button>
                </div>
            </footer>
        </div>
    )
}
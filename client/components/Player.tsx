import { Grid, IconButton } from '@material-ui/core'
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import style from '../styles/player.module.scss'
import { ITrack } from '../types/track'
import TrackProgrees from './TrackProgrees'

let audio

const Player = () => {
  const track: ITrack = {
    _id: 'dfjdfjd1',
    name: 'fgfgf',
    artist: 'dkfjdkfjd',
    text: 'dkdfjdkfjdf',
    listens: 5,
    audio: 'dfdfd',
    picture: '',
    comments: [{ _id: 'string', username: 'string', text: 'string' }],
  }
  const { active, pause, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )

  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => setDuration(Math.ceil(audio.duration))
      audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime))
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target.value / 100
    setVolume(+e.target.value)
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value
    setCurrentTime(+e.target.value)
  }

  if (!active) return null

  return (
    <div className={style.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: '0 20px' }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgrees
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgrees left={volume} right={100} onChange={changeVolume} />
    </div>
  )
}

export default Player

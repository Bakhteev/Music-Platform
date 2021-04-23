import { Button, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/track'

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)

  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComments = async () => {
    try {
      const responce = await axios.post(
        'http://localhost:5000/tracks/comment',
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      )
      setTrack({ ...track, comments: [...track.comments, responce.data] })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <MainLayout
      title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
      keywords={'Музыка, артисты, ' + track.name + ', ' + track.artist}
    >
      <Button
        variant={'outlined'}
        style={{ fontSize: 32 }}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img
          src={'http://localhost:5000/' + track.picture}
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h2>Название трека - {track.name}</h2>
          <h2>Исполнитель - {track.artist}</h2>
          <h2>Прослушиваний - {track.listens}</h2>
        </div>
      </Grid>
      <h2>Слова в треке</h2>
      <p>{track.text}</p>
      <h2>Комментарии</h2>
      <Grid container>
        <TextField label="Ваше имя" fullWidth {...username} />
        <TextField label="Комментарий" fullWidth multiline rows={4} {...text} />
        <Button onClick={addComments}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const responce = await axios.get('http://localhost:5000/tracks/' + params.id)
  return {
    props: { serverTrack: responce.data },
  }
}

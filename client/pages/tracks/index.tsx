import { Box, Button, Card, Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import TrackList from '../../components/TrackList'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/track'

const Index = () => {
  const router = useRouter()
  const tracks: ITrack[] = [
    {
      _id: 'dfjdfjd1',
      name: 'fgfgf',
      artist: 'dkfjdkfjd',
      text: 'dkdfjdkfjdf',
      listens: 5,
      audio: 'dfdfd',
      picture: '',
      comments: [{ _id: 'string', username: 'string', text: 'string' }],
    },
    {
      _id: 'dfjdfjd2',
      name: 'fgfgf',
      artist: 'dkfjdkfjd',
      text: 'dkdfjdkfjdf',
      listens: 5,
      audio: 'dfdfd',
      picture: '',
      comments: [{ _id: 'string', username: 'string', text: 'string' }],
    },
  ]

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index

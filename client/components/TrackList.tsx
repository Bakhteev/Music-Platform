import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { ITrack } from '../types/track'
import TrackItem from './TrackItem'

interface ITrackListProps {
  tracks: ITrack[]
}

const TrackList: React.FC<ITrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  )
}

export default TrackList

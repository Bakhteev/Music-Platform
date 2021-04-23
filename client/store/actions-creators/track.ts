import axios from 'axios'
import { Dispatch } from 'redux'
import { TrackAction, TrackActionTypes } from '../../types/track'

export const fetchTraks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const responce = await axios.get('http://localhost:5000/tracks')
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: responce.data })
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при закгрузке треков',
      })
    }
  }
}

export const searchTraks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const responce = await axios.get(
        'http://localhost:5000/tracks/search?query=' + query
      )
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: responce.data })
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при закгрузке треков',
      })
    }
  }
}

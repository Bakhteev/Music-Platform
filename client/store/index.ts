import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { reducer, RootState } from './reducers'

const makeStore: MakeStore<RootState> = (context: Context) =>
  createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

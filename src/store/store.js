import React from "react"
import { render } from "react-dom"
import {
  configureStore,
  createSlice,
  combineReducers,
  getDefaultMiddleware,
  isPlain,
} from "@reduxjs/toolkit"
import { blockSize } from "../components/utils"
import * as faceapi from 'face-api.js';


const dbInitalState = {
  width: 300,
  height: 300,
  centerBlocks: [
    // {x: blockSize/2, y:blockSize/2, colour: 'red'},
    // {x:(blockSize*2)-blockSize/2, y:blockSize/2, colour: 'blue'}
  ],
  wall:[

  ],
  counter: 0,
  timer: 1000*30
}

const getColour = (gender, expressions) => {

    if(expressions.happy>0.5){
        if(gender === 'male'){
            return 'red'
        }else{
            return 'yellow'
        }
    }else{
        if(gender === 'female'){
            return 'blue'
        }else{
            return 'green'
        }
    }

}

const gameSlice = createSlice({
  name: "game",
  initialState: dbInitalState,
  reducers: {
      start: (state, action) => ({
        ...state, wall: [], counter: 0, timer: 1000*30, blocksLine: null
      }),

      startLine: (state, action) => {
        // action.payload
        // console.log('action.payload', action.payload)
        if(action.payload.length === 0){
            return { ...state, resultMessage: 'No result sorry' }
        }
        let array =[]
        let lastIndex = 0
        for (let i = 0; i < 5; i++) {
            console.log('action.payload[i]', action.payload[i])

            if(action.payload[i]){
                array.push(action.payload[i])
                lastIndex = i
            }else{
                array.push({gender:action.payload[lastIndex].gender, expressions:action.payload[lastIndex].expressions })
            }
        }
        const blocks = array.map((a, i)=>{
            const x = (i*blockSize)+blockSize, y=0
            const colour = getColour(a.gender, a.expressions)
            return {x, y, colour}
        })
        console.log("blocks", blocks)
        return { ...state, blocksLine: blocks.slice(0,5), resultMessage: null }
      },
      clearBlocksLine: (state, action) => ({ ...state, blocksLine: null, resultMessage: null }),
      moveBlocksDown: (state, action) => {
        const blocks = state.blocksLine.map(a=>{
            return {...a, y: a.y+30}
        })
        return { ...state, blocksLine: blocks }
      },

      
    //   dbReady: (state, action) => ({ ...state, ready: action.payload }),
    setDimensions: (state, action) => ({
      ...state,
      width: action.payload.width,
      height: action.payload.height,
    }),
    firstCenterBlock: (state, action) => {
      const blocks = [
        {
          x: state.width / 2 - blockSize / 2,
          y: state.height / 2,
          colour: "red",
          rotation: 0
        },
        {
          x: state.width / 2 + blockSize / 2,
          y: state.height / 2,
          colour: "blue",
          rotation: 0
        },
      ]
      return { ...state, centerBlocks: blocks }
    },
    addBlock: (state, action) => {
      const blocks = [
        ...state.centerBlocks,
        { x: action.payload.x, y: action.payload.y, x: action.payload.colour, rotation: 0 },
      ]
      console.log("blocks", blocks)
      return { ...state, centerBlocks: blocks }
    },
    buildWall: (state, action) => {
        console.log('build wall')
        const wall = [...state.wall, state.blocksLine.map(a=>{
          return {...a, y: state.height-(state.wall.length*blockSize)-blockSize/2}
        })]
        return { ...state, wall }
      },
    setRocket: (state, action) => {
        return { ...state, rocket: {x: action.payload.x, y: action.payload.y, colour: action.payload.colour, rotation:0} }
      },
      setLoading: (state, action) => {
        return { ...state, loading: action.payload }
      },
  },
})

export const moveLineDown = () => async (dispatch, getState) => {
    if(getState().game.blocksLine){
    const {wall, blocksLine, height} = getState().game
    let blocks 
      if(blocksLine[0].y>height-(wall.length*blockSize)-blockSize){
        dispatch(gameSlice.actions.buildWall())
        dispatch(gameSlice.actions.clearBlocksLine())

      }else{
        dispatch(gameSlice.actions.moveBlocksDown())
      }
    }
    // console.log('getState().blocksLine', getState())
  }


  export const end = () => async (dispatch, getState) => {
    if(getState().game.wall){
    const {wall, blocksLine, height} = getState().game
      dispatch(gameSlice.actions.start())
    }
    // console.log('getState().blocksLine', getState())
  }

// export const startRocket = ({x,y,colour}) => async dispatch => {
//     dispatch(gameSlice.actions.setRocket({x,y,colour}))
// }


const createStore = () =>
  configureStore({
    reducer: { game: gameSlice.reducer },
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          isSerializable: value => {
            // check if firebase timestamp
            // const a =  value instanceOf Date;
            // const firebaseLoad = import("firebase")
            if (
            //   isBrowser &&
              value &&
              (value instanceof faceapi.FaceExpressions)
            ) {
              //|| value instanceof firebase.UserInfo
              return true
            } else {
              return isPlain(value)
            }
            // value.nanoseconds?true:isPlain(value)
          },
        },
      }),
    ],
    // middleware: [...getDefaultMiddleware(), thunk]
  })

export default createStore

export const { addBlock, setDimensions, firstCenterBlock, setRocket, setLoading, startLine, start} = gameSlice.actions

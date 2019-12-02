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
import * as faceapi from "face-api.js"
import countBy from "lodash/countBy"
import flatten from "lodash/flatten"

const dbInitalState = {
  width: 300,
  height: 300,
  centerBlocks: [
    // {x: blockSize/2, y:blockSize/2, colour: 'red'},
    // {x:(blockSize*2)-blockSize/2, y:blockSize/2, colour: 'blue'}
  ],
  wall: [],
  counter: 0,
  timer: 1000 * 30,
  endScreen: null,
}

const getColour = (gender, expressions) => {
  if (expressions.happy > 0.5) {
    if (gender === "male") {
      return "red"
    } else {
      return "yellow"
    }
  } else {
    if (gender === "female") {
      return "blue"
    } else {
      return "green"
    }
  }
}

const gameSlice = createSlice({
  name: "game",
  initialState: dbInitalState,
  reducers: {
    start: (state, action) => ({
      ...state,
      wall: [],
      counter: 0,
      timer: 1000 * 30,
      blocksLine: null,
    }),
    clearResultsMessage: (state, action) => ({
      ...state,
      resultMessage: null,
      raw: null,
    }),
    startLine: (state, action) => {
      // return { ...state, resultMessage: null, raw: null }

      // action.payload
      // console.log('action.payload', action.payload)
      if (action.payload.length === 0) {
        // clearResult()
        return { ...state, resultMessage: "No results sorry", raw: null }
      }
      let array = []
      let lastIndex = 0
      for (let i = 0; i < 5; i++) {
        if (action.payload[i]) {
          array.push(action.payload[i])
          lastIndex = i
        } else {
          array.push({
            gender: action.payload[lastIndex].gender,
            expressions: action.payload[lastIndex].expressions,
          })
        }
      }
      const blocks = array.map((a, i) => {
        const x = i * blockSize + blockSize / 2 + 5,
          y = 0
        const colour = getColour(a.gender, a.expressions)
        return { x, y, colour }
      })
      return {
        ...state,
        blocksLine: blocks.slice(0, 5),
        resultMessage: null,
        raw: action.payload,
      }
    },
    clearBlocksLine: (state, action) => ({
      ...state,
      blocksLine: null,
      resultMessage: null,
    }),
    moveBlocksDown: (state, action) => {
      const blocks = state.blocksLine.map(a => {
        return { ...a, y: a.y + 40 }
      })
      return { ...state, blocksLine: blocks }
    },

    showEnd: (state, action) => {
      const all = flatten(state.wall)
      const colours = countBy(all, "colour")
      console.log("colours", colours)
      // const count = state.
      // const all = flatten(state.wall)
      // console.log('greenCount', greenCount)
      return {
        ...state,
        endScreen: {
          ...colours,
        },
      }
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
          rotation: 0,
        },
        {
          x: state.width / 2 + blockSize / 2,
          y: state.height / 2,
          colour: "blue",
          rotation: 0,
        },
      ]
      return { ...state, centerBlocks: blocks }
    },
    addBlock: (state, action) => {
      const blocks = [
        ...state.centerBlocks,
        {
          x: action.payload.x,
          y: action.payload.y,
          x: action.payload.colour,
          rotation: 0,
        },
      ]
      console.log("blocks", blocks)
      return { ...state, centerBlocks: blocks }
    },
    buildWall: (state, action) => {
      console.log("build wall")
      const wall = [
        ...state.wall,
        state.blocksLine.map(a => {
          return {
            ...a,
            y:
              state.height -
              blockSize -
              state.wall.length * blockSize -
              blockSize / 2 -
              5,
          }
        }),
      ]
      return { ...state, wall }
    },
    setRocket: (state, action) => {
      return {
        ...state,
        rocket: {
          x: action.payload.x,
          y: action.payload.y,
          colour: action.payload.colour,
          rotation: 0,
        },
      }
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload }
    },
  },
})

export const moveLineDown = () => async (dispatch, getState) => {
  if (getState().game.blocksLine) {
    const { wall, blocksLine, height } = getState().game
    let blocks
    if (
      blocksLine[0].y >
      height - blockSize - wall.length * blockSize - blockSize - 5
    ) {
      dispatch(gameSlice.actions.buildWall())
      dispatch(gameSlice.actions.clearBlocksLine())
    } else {
      dispatch(gameSlice.actions.moveBlocksDown())
    }
  }
  // console.log('getState().blocksLine', getState())
}

export const end = () => async (dispatch, getState) => {
  if (getState().game.wall) {
    const { wall, blocksLine, height } = getState().game
    // dispatch(gameSlice.actions.start())
    dispatch(gameSlice.actions.showEnd())
  }
  // console.log('getState().blocksLine', getState())
}

export const clearResult = () => async (dispatch, getState) => {
  dispatch(gameSlice.actions.clearResultsMessage())
  // setTimeout(()=>    dispatch(gameSlice.actions.clearResultsMessage()), 1000

  // )
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
              value instanceof faceapi.FaceExpressions
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

export const {
  addBlock,
  setDimensions,
  firstCenterBlock,
  setRocket,
  setLoading,
  startLine,
  start,
  clearResultsMessage,
} = gameSlice.actions

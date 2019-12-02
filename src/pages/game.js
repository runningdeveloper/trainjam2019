import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
// import {useIn}
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Block from "../components/block"
import { useInterval, blockSize } from "../components/utils"
import { useSelector, useDispatch } from "react-redux"
import {
  addBlock,
  setDimensions,
  firstCenterBlock,
  setRocket,
  start,
  startLine,
  moveLineDown,
  setLoading,
  end,
  clearResultsMessage
} from "../store/store"
import roundTo from 'round-to'
import FaceThing from "../components/faceThing"
import SimpleBlock from "../components/simpleBlock"
const GamePage = () => {
  // const [w, setW] = useState(300)
  const [currentRotation, setCurrentRotation] = useState(0)

  // const [startX, setStartX] = useState(3)
  // const [startY, setStartY] = useState(1)

  // const [rocket, setRocket] = useState(200000)

  const {
    centerBlocks,
    width,
    height,
    rocket,
    loading,
    blocksLine,
    resultMessage,
    wall,
    raw,
    endScreen
  } = useSelector(state => state.game)
  const dispatch = useDispatch()

  useInterval(() => {
    // setStartY(startY+1)
    // console.log('rocket.y', rocket.y)
    // dispatch(setRocket({x: width/2, y: rocket.y-10, colour: 'green'}))
    if (blocksLine && blocksLine.length > 0) {
      dispatch(moveLineDown())
    }
  }, 200)

  useInterval(() => {
    // dispatch(setRocket({x: width/2, y: rocket.y-10, colour: 'green'}))
    // setCurrentRotation(currentRotation+5)
  }, 500)

  useEffect(() => {
    // setW(window.innerWidth)
    // setH(window.innerHeight)
    dispatch(
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight < 400 ? window.innerHeight : 600,
      })
    )
    // setStartX(window.innerWidth/2)
    // setStartY(window.innerHeight)

    dispatch(firstCenterBlock())
  }, [])

  useEffect(() => {
    if (wall && wall.length === 6) {
      dispatch(end())
    }
  }, [wall])

  // useEffect(()=>{
  //   setInterval(() => {
  //     setStartY(startY+1)
  //   }, 200);
  //   // if(startY === h){
  //   //   setStartY(0)
  //   // }
  // }, [startY])

  const doKeyDown = event => {
    // if(event.code === "Space"){
    //   console.log('space hit', startY)
    //   const newVal = startY-1
    //   console.log('new val', newVal)
    //   setStartY(newVal)
    // }
    // console.log('keydown', event.code)
  }

  // useEffect(() => {
  //   window.addEventListener('keydown', doKeyDown)
  //   return () => window.removeEventListener('keydown', doKeyDown)
  // }, [startY])

  return (
    <Layout>
      {/* {console.log('current centerBlocks', centerBlocks)} */}

      <SEO title="Game" />
      <>
        {(loading || resultMessage) && (
          <div
            class="nes-container is-rounded"
            style={{
              zIndex: 10000,
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {loading && <h2>{loading}</h2>}
            {resultMessage && <div><h2>{resultMessage}</h2>     <button
              type="button"
              class="nes-btn is-primary"
              onClick={() => dispatch(clearResultsMessage())}
            >
              Ok
            </button></div>}
          </div>
        )}
                {endScreen && (
          <div
            class="nes-container is-rounded"
            style={{
              zIndex: 10000,
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
              <h3>Done, does your wall look cool? Is it colourful?</h3>
              <p>Yellow Blocks: {endScreen.yellow?endScreen.yellow<6?`Only ${endScreen.yellow}`:endScreen.yellow:'Wow none bad!!'}</p>
              <p>Red Blocks: {endScreen.red?endScreen.red<6?`Only ${endScreen.red}`:endScreen.red:'Wow none bad!!'}</p>
              <p>Blue Blocks: {endScreen.blue?endScreen.blue<6?`Only ${endScreen.blue}`:endScreen.blue:'Wow none bad!!'}</p>
              <p>Green Blocks: {endScreen.green?endScreen.green<6?`Only ${endScreen.green}`:endScreen.green:'Wow none bad!!'}</p>
              <button
              type="button"
              class="nes-btn is-success"
              onClick={() => dispatch(start())}
            >
              Try another
            </button>

          </div>
        )}
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          {/* <h1>!</h1> */}

          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              class="nes-btn is-success"
              onClick={() => dispatch(start())}
            >
              Restart
            </button>{" "}
            <Link to={"/"} class="nes-btn is-warning">
              Help
            </Link>{" "}
            <button
              type="button"
              class="nes-btn is-normal"
              onClick={() => {
                if (!blocksLine) {
                  const temp = [
                    { gender: "male", age: 10, expressions: { happy: 0.6111 } },
                  ]
                  dispatch(startLine(temp))
                }
              }}
            >
              test
            </button>
            {/* , width: `${20+(blockSize*5)}px`, height: `${(height-blockSize)}px`, marginLeft: `${blockSize-blockSize/2 -10}px` */}
            <div
              class="nes-container"
              style={{
                position: "absolute",
                width: `${20 + blockSize * 5}px`,
                height: `${height - blockSize}px`,
                marginTop: "10px",
              }}
            >
              {blocksLine &&
                blocksLine.map(a => (
                  <Block
                    key={`${a.x + a.y}`}
                    x={a.x}
                    y={a.y}
                    colour={a.colour}
                    rotation={0}
                  />
                ))}
              {wall &&
                wall.map(b =>
                  b.map(a => (
                    <Block
                      key={`${a.x + a.y}`}
                      x={a.x}
                      y={a.y}
                      colour={a.colour}
                      rotation={0}
                    />
                  ))
                )}
            </div>
                  {raw && <p style={{marginTop: `${height-20}px`}}>Found People: {raw.length} <br/>{raw.map((a, i)=><span key={i} >{a.gender}, happy:{roundTo(a.expressions.happy,3)}</span>)}</p>}

          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              Happy + Female =
              <span style={{ marginLeft: "20px" }}>
                <SimpleBlock colour="yellow" />
              </span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              Happy + Male =
              <span style={{ marginLeft: "20px" }}>
                {" "}
                <SimpleBlock colour="red" />
              </span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              Sad + Female ={" "}
              <span style={{ marginLeft: "20px" }}>
                <SimpleBlock colour="blue" />
              </span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              Sad + Male ={" "}
              <span style={{ marginLeft: "20px" }}>
                <SimpleBlock colour="green" />
              </span>
            </p>
            <FaceThing
              results={a => {
                const temp = []
                a.forEach(a => {
                  temp.push({
                    gender: a.gender,
                    age: a.age,
                    expressions: a.expressions,
                  })
                  // dispatch(startLine({array:[
                  //   {gender: a.gender, }
                  // ]}))
                })
                if (!blocksLine) {
                  dispatch(startLine(temp))
                  dispatch(setLoading(null))
                } else {
                  dispatch(setLoading("Wait for the wall to be built"))
                }
                console.log("inside the thing", a)
              }}
            />
          </div>

        </section>
      </>
    </Layout>
  )
}

export default GamePage

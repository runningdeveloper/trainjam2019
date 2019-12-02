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
  end
} from "../store/store"
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
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    )
    // setStartX(window.innerWidth/2)
    // setStartY(window.innerHeight)

    dispatch(firstCenterBlock())

    // dispatch(setRocket({x: width/2, y: height+blockSize+1, colour: 'green'}))

    // dispatch(setRocket({x: width/2, y: height-blockSize, colour: 'green'}))

    // dispatch(setRocket({x: width/2, y: (height/2)+100, colour: 'green'}))

    // dispatch(setRocket({x: 0, y: 20, colour: 'green'}))
  }, [])

  useEffect(() => {
    if(wall && wall.length === 6){
        dispatch(end())
    }
  },[wall])

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
      {/* <h1>!</h1> */}
      {loading && <h2>{loading}</h2>}
      {resultMessage && <h2>{resultMessage}</h2>}
      <button
        style={{ marginTop: "10px" }}
        type="button"
        class="nes-btn is-primary"
        onClick={() => dispatch(start())}
      >
        Restart
      </button>
      <button
        style={{ marginTop: "10px" }}
        type="button"
        class="nes-btn is-primary"
        onClick={() => {
          if(!blocksLine){
          const temp = [
            { gender: "male", age: 10, expressions: [{ happy: 0.6 }] },
          ]
          dispatch(startLine(temp))
        }
        }}
      >
        test
      </button>

        <div>
      <p style={{display:'flex', alignItems:'center'}}>Happy + Female = <SimpleBlock colour='yellow'/></p>
      <p style={{display:'flex', alignItems:'center'}}>Happy + Male = <SimpleBlock colour='red'/></p>
      <p style={{display:'flex', alignItems:'center'}}>Sad + Female = <SimpleBlock colour='blue'/></p>
      <p style={{display:'flex', alignItems:'center'}}>Sad + Male = <SimpleBlock colour='green'/></p>
      </div>

{/* 
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
    } */}


      {/* {rocket && <Block x={rocket.x} y={rocket.y} colour={rocket.colour}/>}
    <div style={{position: 'absolute', transformOrigin:`${width/2}px ${(height/2)-blockSize/2}px`, transform: `rotate(${currentRotation}deg)`}}>
    {centerBlocks.map((a)=> <Block key={`${a.x+a.y}`} x={a.x} y={a.y} colour={a.colour} rotation={0}/>)}
    </div> */}

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

      {console.log("wall", wall)}
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
          if(!blocksLine){
          dispatch(startLine(temp))
          dispatch(setLoading(null))

          }else{
            dispatch(setLoading('Wait for the wall to be built'))
          }
          console.log("inside the thing", a)
        }}
      />

      {/* r gender, g age, b expression */}

      {/* <Block x={startX} y={startY} colour='red'/>
    <Block x={50} y={90} colour='green'/>
    <Block x={0} y={0} colour='orange'/>
    <Block x={0} y={0} colour='blue'/>

    <Block x={w-40} y={h-40} colour='blue'/> */}
      {/* <button onClick={()=>setStartY(startY+1)}>click</button> */}
    </Layout>
  )
}

export default GamePage

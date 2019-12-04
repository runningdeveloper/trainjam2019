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
} from "../store/store"
import FaceThing from "../components/faceThing"
import SimpleBlock from "../components/simpleBlock"
import { navigate } from "@reach/router"
const IndexPage = () => {
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

  // useEffect(() => {
  //   window.addEventListener('keydown', doKeyDown)
  //   return () => window.removeEventListener('keydown', doKeyDown)
  // }, [startY])

  return (
    <Layout>
      {/* {console.log('current centerBlocks', centerBlocks)} */}

      <SEO title="Home" />

      <div style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SimpleBlock colour="red" />
          <SimpleBlock colour="green" />
          <SimpleBlock colour="blue" />
        </div>
        {/* <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>

      Hi <i class="nes-icon trophy is-large"></i>
      </div> */}
        <div style={{ marginTop: "20px" }} class="nes-container is-rounded">
          <p>Hi, lets make a colourful wall</p>
        </div>
        <div style={{ marginTop: "20px" }} class="nes-container is-rounded">
          <p>
            With machine learning in the browser. You want the wall to be cool,
            which means it should be random and colourful. Get some people with
            different qualities to help make up 6 rows of bricks to make your
            wall. I'll ask for webcam permission, the video is not stored or
            sent anywhere I’m not a scary
            <br />
            <span class="nes-badge">
              {" "}
              <span class="is-warning">government</span>
            </span>
            <br />
            or big tech{" "}
            <span class="nes-badge">
              {" "}
              <span class="is-warning">company</span>
            </span>
          </p>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={"/game/"} class="nes-btn is-primary">
            Game
          </Link>
        </div>
        <section class="message-list" style={{ marginTop: "60px" }}>
          <section class="message -left">
            <div class="nes-balloon from-left">
              <p>Sorry about graphics, simplicity and etc..</p>
            </div>
          </section>
        </section>
        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/geoff4l"
          >
            <i class="nes-icon twitter is-large"></i>
          </a>{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/runningdeveloper/trainjam2019"
          >
            <i class="nes-octocat animate is-large"></i>
          </a>
        </section>
      </div>

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

export default IndexPage

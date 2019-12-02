import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { blockSize } from "./utils"


const Block = ({ x, y, colour, rotation }) => (
  <div
  style={{
      backgroundColor: colour,
      width: `${blockSize}px`,
      height: `${blockSize}px`,
      position: 'absolute',
      top: y-blockSize/2,
      left: x-blockSize/2,
      transform: `rotate(${rotation}deg)`
  }}
  >
<span style={{lineHeight: `${blockSize}px`, fontSize: `${blockSize-blockSize/3}px`, flexDirection: 'row', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>{colour?colour.charAt(0):""}</span>
    </div>
)


export default Block

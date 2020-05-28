import React from 'react'
import WheelOfFortune from '../../interactives/wheel-of-fortune'

function ReactComponent (props) {
  switch (props.name) {
    case 'wheelOfFortune':
      return <WheelOfFortune />

    default:
      return <p className>Missing React Component</p>
  }
}

export default ReactComponent
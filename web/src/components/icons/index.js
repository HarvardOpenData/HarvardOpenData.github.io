import React from 'react'
import HamburgerIcon from './hamburger'
import DownArrow from './down-arrow'

function Icon(props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    case 'downArrow':
      return <DownArrow />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon

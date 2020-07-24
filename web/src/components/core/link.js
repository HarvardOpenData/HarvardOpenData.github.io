/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const defaultSx = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'none'
  }
}

const highlightedSx = {
  color: 'primary',
  fontWeight: 'bold',
  textDecoration: 'none',
  ':hover': {
    color: 'deep'
  }
}

export default props => {
  const sx = props.variant === 'highlighted' ? highlightedSx : defaultSx
  if (props.to && props.to[0] === '/'){
    return (<Link {...props} sx={sx} />)
  }
  return (<a {...props} sx={sx} />)
}

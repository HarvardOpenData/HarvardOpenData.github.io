/** @jsx jsx */
import { jsx } from 'theme-ui'
import WheelOfFortune from '../../interactives/wheel-of-fortune'

function EmbeddedComponent(component) {
  let props = {}
  component.props.forEach(pair => {
    props[pair.name] = pair.value
  })
  switch (component.name) {
    case 'WheelOfFortune':
      return <WheelOfFortune {...props} />

    default:
      return <p>Missing React Component (check whether you named it correctly!)</p>
  }
}

export default EmbeddedComponent

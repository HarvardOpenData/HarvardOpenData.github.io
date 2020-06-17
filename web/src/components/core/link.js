/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
export default props =>
  <Link
    {...props}
    activeClassName='active'
    sx={{
      color: 'inherit',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&.active': {
        color: 'primary',
      },
      ':hover': {
        textDecoration: 'underline'
      }
    }}
  />
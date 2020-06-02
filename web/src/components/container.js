/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Container = ({ children }) => {
  return (
    <Styled.root
      sx={{
        maxWidth: '960px',
        paddingLeft: ['1.5em', '2em'],
        paddingRight: ['1.5em', '2em'],
        margin: '0 auto'
      }}
    >
      {children}
    </Styled.root>
  )
}

export default Container

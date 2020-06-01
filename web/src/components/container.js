/** @jsx jsx */
import { jsx  } from 'theme-ui'

const Container = ({ children }) => {
  return (
    <div
      sx={{
        maxWidth: [9],
        paddingLeft: ['1.5em', '2em'],
        paddingRight: ['1.5em', '2em'],
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
}

export default Container

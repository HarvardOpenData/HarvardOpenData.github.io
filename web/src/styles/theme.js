export default {
  breakpoints: ['720px', '960px', '1300px', '1400px'],
  colors: {
    text: '#252121',
    heading: '#252121',
    monospace: '#252121',
    background: 'white',
    primary: '#C63F47',
    secondary: '#A81A1A',
    muted: '#BBABAB',
    light: '#F9F9F9'
  },
  fonts: {
    body: 'Atlas Grotesk Web Regular, Akkurat, system-ui, sans-serif',
    bold: 'Atlas Grotesk Web Bold, Akkurat-Bold, system-ui, sans-serif',
    heading: 'Atlas Grotesk Web Bold, Akkurat-Bold, system-ui, sans-serif',
    monospace: 'Akkurat-Mono, Menlo, monospace'
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  fontSizes: [12, 14, 16, 19, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 750,
    bold: 700
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512, 640, 896, 1024],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512, 640, 896, 1024],
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      color: 'text',
      textDecoration: 'none'
    },
    caption: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      marginTop: [1.5, 2.5],
      fontSize: [1, 2]
    },
    small: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: [1],
      fontSize: [1]
    }
  },
  image: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: '50%'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      backgroundColor: 'background'
    },
    p: {
      fontSize: [2, 3, 3, 3]
    },
    h1: {
      variant: 'text.heading',
      fontSize: [5, 6, 7]
    },
    h2: {
      variant: 'text.heading',
      fontSize: [4, 5, 6]
    },
    h3: {
      variant: 'text.heading',
      fontSize: [3, 4],
      marginTop: '0.5em'
    },
    h4: {
      variant: 'text.heading',
      fontSize: [2, 3],
      marginTop: '0.5em'
    },
    a: {
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none'
    }
  }
}

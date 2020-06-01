export default {
  colors: {
    text: "#333",
    background: "#ffffff",
    primary: "#639",
    secondary: "#ff6347",
  },
  fonts: {
    body: "Akkurat, system-ui, sans-serif",
    heading: "Akkurat, system-ui, sans-serif",
    monospace: "Akkurat-Mono, Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [
    12, 14, 16, 18, 24, 32, 48, 64, 72,
  ],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    caption: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      marginTop: [1.5, 2.5],
      fontSize: [1, 2],
    },
  },
  image: {
    padding: 0,
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  link: {
    textDecoration: 'none',
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    p: {
      fontSize: [2, 3],
    },
    h1: {
      variant: 'text.heading',
      fontSize: [5, 6, 7],
    },
    h2: {
      variant: 'text.heading',
      fontSize: [4, 5],
    },
  },
}
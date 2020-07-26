export default {
  breakpoints: ["640px", "1280px"],
  colors: {
    text: "#111111",
    primary: "#C63F3F",
    yellow: "#F4B436",
    blue: "#83BFCC",
    navy: "#455574",
    grey: "#E2DDDB",
    dark: "#251616",
    deep: "#760000",
    medium: "#E28073",
    pink: "#F1D3CF",
    muted: "#F6F6F6",
    container: "#F6F6F6",
    charcoal: "#2F2F2F",
    heading: "#111111",
    background: "white",
  },
  fonts: {
    body: "Post Grotesk Light, system-ui, sans-serif",
    strong: "Post Grotesk, system-ui, sans-serif",
    small: "Post Grotesk Light, system-ui, sans-serif",
    heading: "Post Grotesk, system-ui, sans-serif",
    quote: "Post Grotesk Medium, system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 228, 256, 512, 640, 1024, 1280],
  sizes: [0, 4, 8, 16, 32, 64, 128, 228, 256, 512, 640, 1024, 1280],
  fontSizes: [12, 15, 19, 22, 32, 45, 60],
  fontWeights: {
    body: 400,
    heading: 700,
  },
  text: {
    default: {
      color: "#111111",
      fontSize: 3,
      letterSpacing: "0.015em",
      lineHeight: 1.2,
    },
    caps: {
      textTransform: "uppercase",
      fontFamily: "monospace",
      letterSpacing: "0.05em",
      fontWeight: "bold",
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      letterSpacing: "0.015em",
      lineHeight: 0.95,
    },
    strong: {
      fontFamily: "bold",
    },
    small: {
      fontSize: 1,
    },
    quote: {
      fontFamily: "quote",
      fontSize: 2,
      lineHeight: "155%",
      letterSpacing: "0.015em",
    },
  },
  image: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: "50%",
    },
  },
  cards: {
    list: {
      borderRadius: 2,
      backgroundColor: "light",
      padding: 2,
      "&:hover": {
        bg: "muted",
      },
    },
  },
  buttons: {
    primary: {
      color: "background",
      backgroundColor: "primary",
    },
    tag: {
      padding: 2,
      margin: 2,
      variant: "text.small",
      color: "background",
      backgroundColor: "monospace",
      font: "body",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      color: "text",
      letterSpacing: "0.015em",
      backgroundColor: "background",
    },
    h1: {
      variant: "text.heading",
      fontSize: 6,
    },
    h2: {
      variant: "text.heading",
      fontSize: 5,
    },
    h3: {
      variant: "text.heading",
      fontSize: 4,
    },
    h4: {
      variant: "text.heading",
      fontSize: 3,
    },
    p: {
      fontSize: 2,
      lineHeight: 1.55,
      bold: {
        fontFamily: "Post Grotesk",
      },
    },
  },
  buttons: {
    default: {
      color: "#FFFFFF",
      p: 0,
      bg: "primary",
      "&:hover": {
        bg: "deep",
      },
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
      "&:active": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
    },
    deep: {
      color: "background",
      bg: "deep",
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    input: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 1px ${t.colors.primary}`,
        outline: "none",
      },
    },
    select: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 1px ${t.colors.primary}`,
        outline: "none",
      },
    },
    textarea: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 1px ${t.colors.primary}`,
        outline: "none",
      },
    },
    slider: {
      bg: "muted",
    },
  },
};

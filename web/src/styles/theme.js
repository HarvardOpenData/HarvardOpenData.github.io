export default {
  breakpoints: ["640px", "1024px"],
  colors: {
    text: "#111111",
    primary: "#C63F3F",
    yellow: "#F4B436",
    blue: "#83BFCC",
    navy: "#455574",
    grey: "#C2BBB9",
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
    default: "Post Grotesk, Open Sans, system-ui, sans-serif",
    body: "Post Grotesk, Open Sans, system-ui, sans-serif",
    button: "Post Grotesk, Open Sans, system-ui, sans-serif",
    strong: "Post Grotesk, Open Sans, system-ui, sans-serif",
    small: "Post Grotesk, Open Sans, system-ui, sans-serif",
    heading: "Post Grotesk, Open Sans, system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 228, 256, 512, 640, 1024, 1280],
  sizes: [0, 4, 8, 16, 32, 64, 128, 228, 256, 512, 640, 1024, 1280],
  fontSizes: [12, 15, 19, 22, 32, 45, 60],
  fontWeights: {
    default: 400,
    body: 400,
    medium: 500,
    strong: 700,
    bold: 700,
    heading: 700,
  },
  text: {
    default: {
      color: "#111111",
      fontSize: 3,
      letterSpacing: "0.02em",
      lineHeight: 1.2,
    },
    caps: {
      textTransform: "uppercase",
      fontSize: "16px",
      letterSpacing: "0.08em",
      fontWeight: "medium",
    },
    monospace: {
      textTransform: "uppercase",
      fontFamily: "monospace",
      fontSize: "16px",
      letterSpacing: "0.08em",
      fontWeight: "medium",
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      letterSpacing: "0.015em",
      lineHeight: 1,
    },
    strong: {
      fontFamily: "bold",
    },
    small: {
      fontSize: 1,
    },
    verySmall: {
      fontSize: "12px",
    },
    quote: {
      fontWeight: 500,
      fontSize: 2,
      lineHeight: "155%",
      letterSpacing: "0.015em",
    },
    h1: {
      variant: "text.heading",
      mt: 2,
      mb: 2,
      fontSize: 5,
    },
    h2: {
      variant: "text.heading",
      mt: 1,
      mb: 1,
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
      mb: 2,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
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
    default: {
      fontFamily: "strong",
      "&:focus": {
        border: "0.2em solid black"
      },
    },
    primary: {
      color: "white",
      backgroundColor: "primary",
    },
    deep: {
      color: "white",
      backgroundColor: "deep",
    }
  },
  links: {
    outbound: {
      color: "inherit",
      fontWeight: "bold",
      textDecoration: "none",
      "&.active": {
        color: "primary",
      },
      ":hover": {
        textDecoration: "underline",
      },
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
      mb: 3,
      fontSize: 5,
    },
    h2: {
      variant: "text.heading",
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
    },
    p: {
      fontSize: 2,
      lineHeight: 1.55,
    },
    li: {
      fontSize: 2,
      lineHeight: 1.55,
    },
    button: {
      fontFamily: "strong",
      "&:focus": {
        border: "0.2em solid black"
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
    tag: {
      padding: 2,
      margin: 1,
      variant: "text.small",
      color: "background",
      font: "body",
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    input: {
      borderColor: "gray",
      font: "body",
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

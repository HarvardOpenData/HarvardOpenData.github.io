/** @jsx jsx */
// import { Link } from 'gatsby'
// import Icon from './icons'
// import { cn } from '../lib/helpers'

// import styles from './header.module.css'

// const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
//   <div className={styles.root}>
//     <div className={styles.wrapper}>
//       <h1 className={styles.branding}>
//         <Link to="/">{siteTitle}</Link>
//       </h1>

//       <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
//         <Icon symbol="hamburger" />
//       </button>

//       <nav className={cn(styles.nav, showNav && styles.showNav)}>
//         <ul>
//           <li>
//             <Link to="/about/">About</Link>
//           </li>
//           <li>
//             <Link to="/projects/">Projects</Link>
//           </li>
//           <li>
//             <Link to="/blog/">Blog</Link>
//           </li>
//           <li>
//             <Link to="/contact/">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   </div>
// )

// export default Header

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Container from './container'
import { jsx, Grid, Styled } from 'theme-ui'


export default function Header() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            link
            name
            subMenu {
              link
              name
            }
          }
        }
      }
    }
  `)
  const menuLinks = data.site.siteMetadata.menuLinks

  return (
    <Container
      sx={{position: 'relative', zIndex: '99 !important'}}
    >
      <Styled.h1>
        <Link to="/">{data.site.siteMetadata.title}</Link>
      </Styled.h1>
      <ul
        sx={{
          listStyle: "none",
          background: "darkorange",
          margin: 0,
          padding: 0,
        }}
      >
        {menuLinks.map((link) => (
          <li
            sx={{
              color: "white",
              backgroundColor: "darkorange",
              display: "block",
              float: "left",
              padding: "1rem",
              position: "relative",
              transitionDuration: "0.2s",
              ":hover": {
                backgroundColor: "red",
                cursor: "pointer",
              },
              ":hover > ul, :focus-within > ul ": {
                visibility: "visible",
                opacity: "1",
                display: "block",
              },
            }}
            key={link.name}
          >
            <a
              sx={{
                color: "white",
                textDecoration: "none",
              }}
              href={link.link}
              aria-haspopup={link.subMenu && link.subMenu.length > 0 ? true : false}
            >
              {link.name}
            </a>
            {link.subMenu && link.subMenu.length > 0 ? (
              <ul
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                  backgroundColor: "darkorange",
                  visibility: "hidden",
                  opacity: "0",
                  display: "none",
                  minWidth: "8rem",
                  position: "absolute",
                  transition: "all 0.5s ease",
                  marginTop: "1rem",
                  left: "0",
                  ":hover": {
                    visibility: "visible",
                    opacity: "1",
                    display: "block",
                  },
                }}
                aria-label="submenu"
              >
                {link.subMenu.map((subLink) => (
                  <li
                    sx={{
                      clear: "both",
                      width: "100%",
                      padding: "1rem",
                      ":hover": {
                        backgroundColor: "red",
                      },
                    }}
                    key={subLink.name}
                  >
                    <a
                      sx={{
                        color: "white",
                        textDecoration: "none",
                      }}
                      href={subLink.link}
                    >
                      {subLink.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </Container>
  )
}
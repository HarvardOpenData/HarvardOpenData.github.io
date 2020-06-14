/** @jsx jsx */
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import React, { useState } from 'react'
import Icon from '../components/icons'
import { Link } from 'gatsby'
import Container from './container'
import { jsx, Box, Flex, Grid, Styled } from 'theme-ui'

function MenuLink(props) {
  if (props.link[0] === '/') {
    return (
      <Link to={props.link} sx={{ color: 'text', textDecoration: 'none' }}>
        {props.children}
      </Link>
    )
  }
  return (
    <Styled.a href={props.link} target="_blank">
      {props.children}
    </Styled.a>
  )
}

function StandardSubmenuLink({ name, link, subMenu }) {
  return (
    <Box
      mr={2}
      sx={{
        ': hover': {
          bg: 'light',
          borderRadius: '5px 5px 0px 0px',
          ':hover > div, :focus-within > div ': {
            visibility: 'visible',
            display: 'inline',
            opacity: '1'
          }
        }
      }}
      aria-haspopup={true}
    >
      <MenuLink link={link}>
        <Box p={2} sx={{ flex: '1 auto', ':hover': { color: 'primary' } }}>
          <b sx={{ textDecoration: 'none', fontSize: [3] }}>{`${name} `}</b>
        </Box>
      </MenuLink>
      <div
        sx={{
          visibility: 'hidden',
          position: 'absolute',
          display: 'block'
        }}
      >
        <Box
          sx={{
            bg: 'light',
            borderRadius: '0px 5px 5px 5px'
          }}
        >
          {subMenu && subMenu.length > 0
            ? subMenu.map(subLink => (
                <MenuLink {...subLink}>
                  <Box
                    p={2}
                    pt={1}
                    sx={{
                      flex: '1 auto',
                      ':hover': { color: 'primary' }
                    }}
                  >
                    <b sx={{ textDecoration: 'none', fontSize: [1] }}>{subLink.name}</b>
                  </Box>
                </MenuLink>
              ))
            : null}
        </Box>
      </div>
    </Box>
  )
}

function StandardMenuLink({ name, link, subMenu }) {
  return (
    <div>
      <MenuLink link={link}>
        <Box
          p={2}
          mr={2}
          aria-haspopup={false}
          sx={{
            ': hover': {
              bg: 'light',
              borderRadius: '5px',
              color: 'primary'
            }
          }}
        >
          <b sx={{ fontSize: [3] }}>{name}</b>
        </Box>
      </MenuLink>
    </div>
  )
}

function StandardHeader({ logo, menuLinks }) {
  const logoSrc = imageUrlFor(buildImageObj(logo))
    .width(600)
    .url()
  return (
    <div
      sx={{
        b: {
          textDecoration: 'none',
          ':hover': { color: 'primary' }
        },
        display: 'block',
        position: 'relative',
        zIndex: '100 !important'
      }}
    >
      <Container>
        <Link to="/">
          <img src={logoSrc} sx={{ maxWidth: '200px', marginTop: '2em' }} alt={logo.alt} />
        </Link>
        <Flex>
          {menuLinks.map(link =>
            link.subMenu && link.subMenu.length > 0 ? (
              <StandardSubmenuLink {...link} />
            ) : (
              <StandardMenuLink {...link} />
            )
          )}
        </Flex>
      </Container>
    </div>
  )
}

class MobileHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  componentDidMount() {
    this.setState({
      open: false
    })
  }

  onClick() {
    this.setState({
      open: false
    })
  }

  renderClosed() {
    const { logo } = this.props
    const logoSrc = imageUrlFor(buildImageObj(logo))
      .width(600)
      .url()
    return (
      <Flex>
        <Box p={3} sx={{ flex: '1 5 auto' }}>
          <Link to="/">
            <img src={logoSrc} sx={{ maxWidth: '200px', marginTop: '0.5em' }} alt={logo.alt} />
          </Link>
        </Box>
        <Box
          p={3}
          sx={{
            flex: '0 1 auto',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Icon symbol="hamburger" />
        </Box>
      </Flex>
    )
  }

  renderOpen() {
    const { logo, menuLinks } = this.props
    return <div>Open now, fill things in</div>
  }

  render() {
    const { open } = this.state
    return <>{open ? this.renderOpen() : this.renderClosed()}</>
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { logo, menuLinks } = this.props
    return (
      <div>
        <div sx={{ display: ['none', 'none', 'initial', 'initial'] }}>
          {logo && <StandardHeader logo={logo} menuLinks={menuLinks} />}
        </div>
        <div sx={{ display: ['initial', 'initial', 'none', 'none'] }}>
          {logo && logo.asset && <MobileHeader logo={logo} menuLinks={menuLinks} />}
        </div>
      </div>
    )
  }
}

export default Header

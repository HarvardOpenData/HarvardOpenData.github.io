/** @jsx jsx */
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import React, { useState } from 'react'
import Icon from '../components/icons'
import { Link } from 'gatsby'
import Container from './container'
import HamburgerMenu from 'react-hamburger-menu'
import Fade from 'react-reveal/Fade';
import { Collapse } from 'react-collapse'
import { jsx, Box, Divider, Flex, Styled } from 'theme-ui'

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
    this.state = {
      open: false,
      openList: new Array(this.props.menuLinks.length).fill(false)
    }
  }

  componentDidMount() {
    this.setState({
      open: false
    })
  }

  componentWillUnmount() {
    this.setState({
      open: false
    })
  }

  handleClick() {
    console.log("switched!")
    this.setState({
        open: !this.state.open
    });
  }

  renderTopBar() {
    const { logo } = this.props
    const logoSrc = imageUrlFor(buildImageObj(logo))
      .width(600)
      .url()
    return (
      <div sx={{width: '100vw'}}>
      <Container>
        <Flex
          sx={{ mt: [3], mb: [3] }}
        >
          <Box sx={{ flex: '1 5 auto' }}>
            <Link to="/">
              <img src={logoSrc} sx={{ maxWidth: '200px', marginTop: '0.5em' }} alt={logo.alt} />
            </Link>
          </Box>
          <Box
            pt={3}
            sx={{
              flex: '0 1 auto',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <HamburgerMenu
              isOpen={this.state.open}
              menuClicked={this.handleClick.bind(this)}
              width={30}
              height={20}
              strokeWidth={2}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.5}
            />
          </Box>
        </Flex>
      </Container>
      </div>
    )
  }

  onToggleItem = i => {
    // console.log(this.state.openList)
    this.setState(state => {
      const list = state.openList.map((item, j) => {
        if (j === i) {
          return (!item);
        } else {
          return item;
        }
      });
      console.log(list)
      return {
        list,
      };
    });
  };

  renderMenuItem(index) {
    const link = this.props.menuLinks[index]
    console.log(this.state.openList[2])

    return (
      <>
        <Flex>
          <Box p='2' flex='1 1 auto'>
            <h2
              sx={{
                color: 'text',
                width: 'auto',
                ': hover': { cursor: 'pointer' }
              }}
              onClick={this.handleClick.bind(this)}
            >
              <MenuLink {...link}>{link.name}</MenuLink>
            </h2>
          </Box>
          { link.subMenu && link.subMenu.length > 0 &&
            <Box onClick={() => this.onToggleItem(index)} sx={{ textAlign: 'right' }}>
              <h1>+</h1>
            </Box>
          }
        </Flex>
        <Collapse isOpened={this.state.openList[index]}>
          <div>Content here!</div>
        </Collapse>
      </>
    );
  }

  renderMenuItems() {
    const { menuLinks } = this.props
    return (
      <Fade>
        <div
          sx={{
            width: '100vw',
            height: '95vh',
            color: 'primary',
            bg: 'light',
            padding: '1.5em',
          }}
        >
            {menuLinks.map((_link, i) =>
              <>
                {this.renderMenuItem(i)}
                <Divider color='muted'/>
              </>
            )}
        </div>
      </Fade>
    )
  }

  render() {
    const { open } = this.state
    return (
      <>
        {this.renderTopBar()}
        {open && this.renderMenuItems()}
      </>
    )
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
        <div sx={{ display: ['none', 'initial', 'initial', 'initial'] }}>
          {logo && logo.asset && <StandardHeader logo={logo} menuLinks={menuLinks} />}
        </div>
        <div sx={{ display: ['initial', 'none', 'none', 'none'] }}>
          {logo && logo.asset && <MobileHeader logo={logo} menuLinks={menuLinks} />}
        </div>
      </div>
    )
  }
}

export default Header

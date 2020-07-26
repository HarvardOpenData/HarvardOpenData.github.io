/** @jsx jsx */
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import React, { useState } from "react";
import Link from "../core/link";
import Container from "./container";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "react-reveal/Fade";
import { Collapse } from "react-collapse";
import { jsx, Box, Divider, Flex, Grid, Styled } from "theme-ui";

function MenuLink(props) {
  return (
    <Link to={props.link} href={props.link} variant="default">
      {props.children}
    </Link>
  );
}

function StandardSubmenuLink({ name, link, subMenu }) {
  return (
    <Box
      mr={2}
      sx={{
        ": hover": {
          bg: "light",
          borderRadius: "5px 5px 0px 0px",
          ":hover > div, :focus-within > div ": {
            visibility: "visible",
            display: "inline",
            opacity: "1",
          },
        },
      }}
      aria-haspopup={true}
    >
      <MenuLink link={link}>
        <Box p={1} sx={{ flex: "1 auto", ":hover": { color: "primary" } }}>
          <b sx={{ textDecoration: "none", fontSize: [1] }}>{`${name} `}</b>
        </Box>
      </MenuLink>
      <div
        sx={{
          visibility: "hidden",
          position: "absolute",
          display: "block",
        }}
      >
        <Box
          sx={{
            bg: "light",
            borderRadius: "0px 5px 5px 5px",
          }}
        >
          {subMenu && subMenu.length > 0
            ? subMenu.map((subLink) => (
                <MenuLink {...subLink}>
                  <Box
                    p={2}
                    pt={1}
                    sx={{
                      flex: "1 auto",
                      ":hover": { color: "primary" },
                    }}
                  >
                    <b sx={{ textDecoration: "none", fontSize: [1] }}>
                      {subLink.name}
                    </b>
                  </Box>
                </MenuLink>
              ))
            : null}
        </Box>
      </div>
    </Box>
  );
}

function StandardMenuLink({ name, link, subMenu }) {
  return (
    <div>
      <MenuLink link={link}>
        <Box
          p={1}
          mr={2}
          aria-haspopup={false}
          sx={{
            ": hover": {
              bg: "light",
              borderRadius: "5px",
              color: "primary",
            },
          }}
        >
          <b sx={{ fontSize: [1] }}>{name}</b>
        </Box>
      </MenuLink>
    </div>
  );
}

function StandardHeader({ logo, menuLinks }) {
  const logoSrc = imageUrlFor(buildImageObj(logo)).width(600).url();
  return (
    <div
      sx={{
        b: {
          textDecoration: "none",
          ":hover": { color: "primary" },
        },
        display: "block",
        position: "relative",
        zIndex: "100 !important",
      }}
    >
      <Container>
        <Link to="/">
          <img
            src={logoSrc}
            sx={{ maxWidth: "200px", marginTop: "2em" }}
            alt={logo.alt}
          />
        </Link>
        <Flex>
          {menuLinks.map((link) =>
            link.subMenu && link.subMenu.length > 0 ? (
              <StandardSubmenuLink {...link} />
            ) : (
              <StandardMenuLink {...link} />
            )
          )}
        </Flex>
        <Divider />
      </Container>
    </div>
  );
}

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.setState({
      open: false,
    });
    this.props.menuLinks.forEach((link) => {
      let slug = link.link;
      if (link.submenu && link.submenu.length > 0) {
        this.setState({
          [slug]: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      open: false,
    });
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  renderTopBar() {
    const { logo } = this.props;
    const logoSrc = imageUrlFor(buildImageObj(logo)).width(600).url();
    return (
      <div sx={{ width: "100vw" }}>
        <Container>
          <Flex sx={{ mt: [3], mb: [3] }}>
            <Box sx={{ flex: "1 5 auto" }}>
              <Link to="/">
                <img
                  src={logoSrc}
                  sx={{ maxWidth: "200px", marginTop: "0.5em" }}
                  alt={logo.alt}
                />
              </Link>
            </Box>
            <Box
              pt={3}
              sx={{
                flex: "0 1 auto",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.handleClick.bind(this)}
                width={30}
                height={20}
                strokeWidth={2}
                rotate={0}
                color="black"
                borderRadius={0}
                animationDuration={0.5}
                sx={{ ":hover": { cursor: "pointer" } }}
              />
            </Box>
          </Flex>
        </Container>
      </div>
    );
  }

  onToggleItem = (slug) => {
    if (slug !== null) {
      this.setState({ [slug]: !this.state[slug] });
    }
  };

  renderMenuItem(i) {
    const link = this.props.menuLinks[i];
    const slug = link.link;

    return (
      <>
        <Grid
          columns={"5fr 1fr"}
          sx={{ alignItems: "center" }}
          onClick={() => this.onToggleItem(slug)}
        >
          <h2
            onClick={this.handleClick.bind(this)}
            sx={{
              color: "text",
              width: "fit-content !important",
              ":hover": { cursor: "pointer !important" },
            }}
          >
            <MenuLink {...link}>{link.name}</MenuLink>
          </h2>
          {link.subMenu && link.subMenu.length > 0 && (
            <h2
              onClick={() => this.onToggleItem(slug)}
              sx={{
                fontSize: "5",
                margin: "0",
                ":hover": { cursor: "pointer" },
              }}
            >
              {!this.state[slug] ? "+" : "-"}
            </h2>
          )}
        </Grid>
        <Collapse
          sx={{ transition: "height 500ms" }}
          isOpened={this.state[slug] === true}
        >
          {link.subMenu.map((subLink) => (
            <h3
              onClick={() => this.handleClick()}
              sx={{
                color: "text",
                width: "fit-content !important",
                ":hover": { cursor: "pointer !important" },
              }}
            >
              <MenuLink {...subLink}>{subLink.name}</MenuLink>
            </h3>
          ))}
        </Collapse>
      </>
    );
  }

  renderMenuItems() {
    const { menuLinks } = this.props;
    return (
      <Fade>
        <div
          sx={{
            width: "100vw",
            minHeight: "95vh",
            color: "primary",
            bg: "light",
            padding: "1.5em",
          }}
        >
          {menuLinks.map((_link, i) => (
            <>
              {this.renderMenuItem(i)}
              <Divider color="muted" />
            </>
          ))}
        </div>
      </Fade>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <>
        {this.renderTopBar()}
        {open && this.renderMenuItems()}
      </>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { logo, menuLinks } = this.props;
    return (
      <div>
        <div sx={{ display: ["none", "initial", "initial", "initial"] }}>
          {logo && logo.asset && (
            <StandardHeader logo={logo} menuLinks={menuLinks} />
          )}
        </div>
        <div sx={{ display: ["initial", "none", "none", "none"] }}>
          {logo && logo.asset && (
            <MobileHeader logo={logo} menuLinks={menuLinks} />
          )}
        </div>
      </div>
    );
  }
}

export default Header;

/** @jsx jsx */
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import React, { useState } from "react";
import Link from "../core/link";
import Spacer from "./spacer";
import Container from "./container";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "react-reveal/Fade";
import { Collapse } from "react-collapse";
import { Box, Divider, Flex, Grid, Input, jsx, Text } from "theme-ui";
import { navigate } from "gatsby";

function MenuLink(props) {
  return (
    <Link to={props.link} href={props.link} variant="default">
      {props.children}
    </Link>
  );
}

function Searchbar(props) {
  const [search, setSearch] = useState("");

  const handleChange = (event) => setSearch(event.target.value);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: do something with form values
        navigate(`/search/?query=${search}`);
      }}
      sx={{
        width: props.isMobile ? "100%" : "30%",
        height: "60%",
        marginLeft: "auto",
      }}
    >
      <Input
        placeholder={"Search"}
        value={search}
        href={"/search"}
        onChange={handleChange}
      />
      <input type="submit" hidden={true} />
    </form>
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
        <Box
          p={1}
          sx={{
            fontWeight: 500,
            flex: "1 auto",
            ":hover": { color: "primary" },
          }}
        >
          {`${name}`}
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
            bg: "#FFFFFF",
            border: `0.5px solid #2F2F2F`,
            boxShadow:
              "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 22.3px 17.9px rgba(0, 0, 0, 0.072)",
            borderRadius: "2px 2px 2px 2px",
          }}
        >
          {subMenu && subMenu.length > 0
            ? subMenu.map((subLink, index) => (
                <MenuLink key={`menu-link-${index}`} {...subLink}>
                  <Box
                    p={2}
                    pt={1}
                    sx={{
                      fontWeight: 400,
                      fontSize: [1],
                      flex: "1 auto",
                      ":hover": { color: "primary" },
                    }}
                  >
                    {subLink.name}
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
            fontWeight: 500,
            ": hover": {
              bg: "light",
              borderRadius: "5px",
              color: "primary",
            },
          }}
        >
          {name}
        </Box>
      </MenuLink>
    </div>
  );
}

function StandardHeader({ logo, menuLinks, isSearch }) {
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
        // boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
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
          {menuLinks.map((link, index) =>
            link.subMenu && link.subMenu.length > 0 ? (
              <StandardSubmenuLink
                key={`standard-submenu-link-${index}`}
                {...link}
              />
            ) : (
              <StandardMenuLink key={`standard-menu-link-${index}`} {...link} />
            )
          )}
          {!isSearch && <Searchbar />}
        </Flex>
        <br />
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
          {!this.props.isSearch && <Searchbar isMobile />}
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
            <>
              <Text
                onClick={() => this.handleClick()}
                sx={{
                  color: "text",
                  fontSize: 2,
                  mb: 2,
                  width: "fit-content !important",
                  ":hover": { cursor: "pointer !important" },
                }}
              >
                <MenuLink {...subLink}>{subLink.name}</MenuLink>
              </Text>
              <Spacer height={0} />
            </>
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
              <Divider color="grey" />
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

function Header(props) {
  const { logo, menuLinks } = props;

  return (
    <div>
      <div sx={{ display: ["none", "initial", "initial", "initial"] }}>
        {logo && logo.asset && (
          <StandardHeader
            logo={logo}
            menuLinks={menuLinks}
            isSearch={props.isSearch}
          />
        )}
      </div>
      <div sx={{ display: ["initial", "none", "none", "none"] }}>
        {logo && logo.asset && (
          <MobileHeader
            logo={logo}
            menuLinks={menuLinks}
            isSearch={props.isSearch}
          />
        )}
      </div>
    </div>
  );
}

export default Header;

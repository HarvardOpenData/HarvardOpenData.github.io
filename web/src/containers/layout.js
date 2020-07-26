import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import { ThemeProvider, Styled } from "theme-ui";
import theme from "../styles/theme.js";
import Layout from "../components/core/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
    menu: site {
      siteMetadata {
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
    companyInfo: sanityCompanyInfo(_id: { regex: "/(drafts.|)companyInfo/" }) {
      name
      _rawLogo
      email
      github
      facebook
      twitter
      instagram
      interestForm
      city
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <StaticQuery
          query={query}
          render={(data) => {
            return (
              <Layout
                {...props}
                logo={data.companyInfo._rawLogo}
                showNav={showNav}
                companyInfo={data.companyInfo}
                menuLinks={data.menu.siteMetadata.menuLinks}
                siteTitle={data.site.title}
                onHideNav={handleHideNav}
                onShowNav={handleShowNav}
              />
            );
          }}
        />
      </Styled.root>
    </ThemeProvider>
  );
}

export default LayoutContainer;

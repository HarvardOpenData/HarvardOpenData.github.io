/** @jsx jsx */
import { jsx, Divider, Styled } from 'theme-ui'
import React from 'react'
import Header from './header'
import Container from './container'

const Layout = ({
  children,
  companyInfo,
  logo,
  menuLinks,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle
}) => (
  <>
    <Header
      siteTitle={siteTitle}
      logo={logo}
      menuLinks={menuLinks}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <div className="pageContent" sx={{ minHeight: '70vh' }}>
      {children}
    </div>
    <footer sx={{ textAlign: 'center' }}>
      <Container>
        <Divider />
      </Container>
      <div>
        <div>{companyInfo && <div>{companyInfo.name}</div>}</div>
        <div>
          © 2015-{new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{' '}
          &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
        <br></br>
      </div>
    </footer>
  </>
)

export default Layout

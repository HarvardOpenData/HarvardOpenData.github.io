/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import Header from './header'

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
    <div>{children}</div>
    <footer sx={{ textAlign: 'center' }}>
      <div>
        <div>{companyInfo && <div>{companyInfo.name}</div>}</div>
        <div>
          © 2015-{new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{' '}
          &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  </>
)

export default Layout

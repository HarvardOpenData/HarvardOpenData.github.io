/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Header from './header'

const Layout = ({ children, companyInfo, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div>{children}</div>
    <footer sx={{ justifyContent: 'center' }}>
      <div>
        <div>
          {companyInfo && (
            <div>
              {companyInfo.name}
            </div>
          )}
        </div>

        <div>
          © {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a> &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </footer>
  </>
)

export default Layout

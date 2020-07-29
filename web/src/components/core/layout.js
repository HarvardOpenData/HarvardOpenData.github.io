/** @jsx jsx */
import React from "react";
import { jsx, Button, Input, Grid } from "theme-ui";
import { SocialIcon } from "react-social-icons";
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Header from "./header";
import Container from "./container";
import Link from "./link";

const socialIconStyles = {
  height: 35,
  width: 35,
  marginRight: "0.7em",
};

const url = "https://hodp.us20.list-manage.com/subscribe/post?u=4415ac3e9c1cf1f92c9e5b357&amp;id=8dbd4ffd38";

const SubscribeWidget = ({ url, interestForm }) => (
  <div
    sx={{
      p: 3,
      borderRadius: "3px",
      bg: "#FAFAFA",
      border: "1px solid #111111",
      maxWidth: "500px",
    }}
  >
    <b>Subscribe to our monthly newsletter</b>
    <Grid as="form" pt={3} height="36px" columns={["2.5fr 1fr"]}>
      <Input name="email" id="email" mb={3} sx={{ height: 4 }} />
      <Button
        sx={{
          height: "32px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
        onClick={() => alert("Subscribed! Check your inbox :)")}
      >
        Subscribe
      </Button>
    </Grid>
    {`Interested in open data? `}
    <Link variant="highlighted" href={interestForm}>
      <b>Join the team.</b>
    </Link>
    <br />
    <br />
    <iframe
      src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FHarvardODP%2F&width=100&layout=button_count&action=like&size=large&height=30&appId"
      width="100"
      height="30"
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      frameBorder="0"
      allowTransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
);

const Layout = ({
  children,
  companyInfo,
  logo,
  menuLinks,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
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
    <div className="pageContent" sx={{ minHeight: "70vh", mb: 5 }}>
      {children}
    </div>
    <footer>
      <div sx={{ bg: "charcoal", pt: 3, pb: 3 }}>
        <Container>
          <SocialIcon
            url={companyInfo.facebook}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={companyInfo.instagram}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={companyInfo.twitter}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={companyInfo.github}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={`mailto:companyInfo.email`}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
        </Container>
      </div>
      <div sx={{ bg: "container", fontSize: 1, pt: 4, pb: 4 }}>
        <Container>
          <Grid columns={[1, "1fr 1fr", "2fr 1fr"]}>
            <div>
              {companyInfo && (
                <div>
                  <b>{companyInfo.name}</b>
                </div>
              )}
              <div>
                © 2015-{new Date().getFullYear()}, Built with{" "}
                <Link href="https://www.sanity.io" variant="highlighted">
                  <b>Sanity</b>
                </Link>{" "}
                &amp;
                {` `}
                <Link href="https://www.gatsbyjs.org" variant="highlighted">
                  <b>Gatsby</b>
                </Link>
              </div>
              <br />
              <div>
                <b>Resources</b>
                <br />
                <Link href="https://docs.hodp.org">Docs</Link>
                <br />
                <Link href="https://wiki.hodp.org">Harvard Wiki</Link>
                <br />
                <br />
                The code for this website is open-source. Check it out{" "}
                <Link
                  href="https://github.com/HarvardOpenData"
                  variant="highlighted"
                >
                  <b>here</b>
                </Link>
                .
              </div>
            </div>
            <SubscribeWidget interestForm={companyInfo.interestForm} />
          </Grid>
        </Container>
      </div>
    </footer>
  </>
);

export default Layout;

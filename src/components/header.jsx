import React, { useContext } from "react"

import { Box, Button, Heading, Anchor, ResponsiveContext } from "grommet"
import { Menu, Twitter, Instagram, Facebook, MailOption } from "grommet-icons"
import logo from "../logo.png"
import config from "../config"
import { navigate } from "gatsby"

const Header = ({ title, toggleSidebar, showSidebar }) => {
  const size = useContext(ResponsiveContext)
  return (
    <Box responsive={false} background="brand" elevation="small">
      <Box
        width="xxlarge"
        as="header"
        pad="small"
        alignSelf="center"
        direction="row"
        justify="between"
      >
        <Box
          flex={false}
          direction="row"
          align="center"
          margin={{ left: `small` }}
          gap="small"
        >
          <Button
            icon={<Menu />}
            plain
            onClick={() => toggleSidebar(!showSidebar)}
          />
          <img src={logo} alt="logo" width="180px" height="42px"/>
          <Heading
            style={{ cursor: `pointer` }}
            onClick={() => navigate(`/`)}
            level="2"
            margin={{ left: `small`, vertical: `none` }}
          >
            {title || `Gezi Bloğu`}
          </Heading>
        </Box>
        {size !== `small` && (
          <Box
            margin={{ horizontal: `medium` }}
            direction="row"
            align="center"
            gap="medium"
          >
            <Anchor
              rel="noopener noreferrer"
              target="_blank"
              a11title="Instagram"
              icon={<Instagram />}
              href={`https://instagram.com/${config.instagram}/`}
            />
            <Anchor
              rel="noopener noreferrer"
              target="_blank"
              a11title="Twitter"
              icon={<Twitter />}
              href={`https://twitter.com/${config.twitter}`}
            />
            <Anchor
              rel="noopener noreferrer"
              target="_blank"
              a11title="Facebook"
              icon={<Facebook />}
              href={`https://facebook.com/${config.facebook}`}
            />
            <Anchor
              rel="noopener noreferrer"
              target="_blank"
              a11title="Email"
              icon={<MailOption />}
              href={`mailto:${config.email}`}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Header

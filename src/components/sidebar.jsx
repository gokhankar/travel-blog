import React, { useContext, useState } from "react"
import {
  Layer,
  Box,
  ResponsiveContext,
  Text,
  Button,
  Collapsible,
  Heading,
} from "grommet"
import { Archive, Camera, Group, Home, FormClose, Globe } from "grommet-icons"

import Destinations from "./destinations"
import ListItem from "./listItem"
import { InternalLink } from "../tools"
import { navigate } from "gatsby"

const SideBarLink = ({ to, text, icon: Icon }) => (
  <Button as="span" hoverIndicator>
    <InternalLink to={to}>
      <ListItem>
        <Icon />
        <Text>{text}</Text>
      </ListItem>
    </InternalLink>
  </Button>
)
const Sidebar = ({ toggleSidebar }) => {
  const [destOpen, setDest] = useState(false)
  const size = useContext(ResponsiveContext)
  const sidebarProps = {
    full: `vertical`,
    background: `light-3`,
    position: `left`,
    modal: true,
    onClickOutside: () => toggleSidebar(false),
    onEsc: () => toggleSidebar(false),
  }
  return (
    <Layer {...sidebarProps}>
      {size === `small` && (
        <ListItem hoverIndicator>
          <Button onClick={() => toggleSidebar(false)}>
            <FormClose />
          </Button>
        </ListItem>
      )}
      <Box width="small">
        <Box align="center" border="bottom">
          <Heading
            style={{ cursor: `pointer` }}
            onClick={() => navigate(`/`)}
            level={3}
          >
            Gezi Blog
          </Heading>
        </Box>
        <Box margin={{ vertical: `small` }}>
          <SideBarLink to="/" text="Ana Sayfa" icon={Home} />
          <SideBarLink to="/archive/" text="Arşiv" icon={Archive} />
          <SideBarLink to="/photos/" text="Fotoğraflar" icon={Camera} />
          <Button plain hoverIndicator onClick={() => setDest(!destOpen)}>
            <ListItem>
              <Globe />
              <Text>Destinasyon</Text>
            </ListItem>
          </Button>

          <Collapsible open={destOpen}>
            {}
            <Box>
              <Destinations />
            </Box>
            {}
          </Collapsible>
          <SideBarLink to="/about/" text="Hakkımda" icon={Group} />
        </Box>
      </Box>
    </Layer>
  )
}

export default Sidebar

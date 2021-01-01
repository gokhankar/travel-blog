import React, { Component, Fragment, useState, useContext } from "react"
import _ from "lodash"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import { Box, Heading, Anchor, Text } from "grommet"
import { MapLocation, Car, Globe, Schedule } from "grommet-icons"
import { ResponsiveContext } from "grommet"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

import App from "../components/layout"
import Posts from "../components/posts"
import Map from "../components/map"
import Section from "../components/section"
import Seo from "../components/seo"
import { flatten, groupBy, coordinates, calculateTotals } from "../tools"

const Stat = ({ title, icon: Icon, counter }) => (
  <Box margin="none" align="center">
    <Icon size="xlarge" />
    <Heading level="4">{title}</Heading>
    {counter}
  </Box>
)

const Sensor = ({ onChange, children }) => {
  const size = useContext(ResponsiveContext)
  if (size === `small`) {
    return null
  }
  // TODO improve this to be more modular
  // Receive an object with the info and recreate the stats etc
  return (
    <VisibilitySensor
      onChange={e => onChange(e)}
      offset={{ top: 10 }}
      delayedCall
    >
      {children}
    </VisibilitySensor>
  )
}

const Index = ({ data }) => {
  const [didViewCountUp, setViewCountUp] = useState(false)
  const { edges: posts } = data.allMarkdownRemark
  const nodes = flatten(posts)
  const { [true]: featured, [null]: latest } = groupBy(nodes, `featured`)
  const coords = coordinates(nodes)
  const totals = calculateTotals(nodes)
  const countries = _.uniq(nodes.map(post => post.frontmatter.country)).length

  return (
    <>
      <Seo postImage={data.file.childImageSharp.fluid.src} />
      <App>
        <Section title="Seçme Yazılar">
          <Posts posts={featured} />
        </Section>
        <Sensor onChange={setViewCountUp}>
          <Section
            size={useContext(ResponsiveContext)}
            title="Sayılarla gezilerim"
            background="light-4"
          >
            <Box
              justify="between"
              width="xxlarge"
              direction="row-responsive"
              pad={{ horizontal: `xlarge`, vertical: `small` }}
            >
              <Stat
                icon={Car}
                title="Toplam mesafe"
                counter={
                  <CountUp
                    duration={2}
                    start={0}
                    end={didViewCountUp ? totals.km : 0}
                    suffix=" km"
                  />
                }
              />
              <Stat
                icon={Schedule}
                title="Süre"
                counter={
                  <CountUp
                    duration={2}
                    start={0}
                    end={didViewCountUp ? totals.duration : 0}
                    suffix=" gün"
                  />
                }
              />
              <Stat
                icon={Globe}
                title="Ülke"
                counter={
                  <CountUp
                    duration={2}
                    start={0}
                    end={didViewCountUp ? countries : 0}
                  />
                }
              />
              <Stat
                icon={MapLocation}
                title="Destinasyon"
                counter={
                  <CountUp
                    duration={2}
                    start={0}
                    end={didViewCountUp ? totals.stops : 0}
                    suffix=" şehir"
                  />
                }
              />
            </Box>
          </Section>
        </Sensor>
        <Section title="Bloğumdaki şehirler!">
          <Map cities={coords} />
        </Section>
        <Section
          background="light-3"
          title="Merhaba dostlar, ben Gökhan"
          pad={{ horizontal: `xlarge`, vertical: `small` }}
        >
          <Box direction="row-responsive" margin="medium">
            <Box align="center" basis="3/4">
              <Text size="large">
                Gezi Bloğuma hoş geldiniz.
                <br />
                Ekranınızda bir gezi bloğu görüyorsunuz. Bu blog gezmeyi ve fotoğraflamayı seven bir fani tarafından, tarihe not düşmek amacıyla hazırlandı.Farklı zamanlarda farklı destinasyonlar halinde gezdiğim şehirleri, ayrı ayrı şehir incelemesi olarak okuyabilir, çektiğim resimlerle şehirler hakkında fikir sahibi olabilirisiniz. 
                <br />
                <br />
                Bu blog hazırlanırken hem gezdiğim yerleri hatırlamayı, hafızamı tazelemeyi, hem de biraz web tasarım çalışması yaparak gatsby öğrenmeyi amaçladım. 
                <br />
                <br />
                Umuyorum ki sizler için faydalı aynı zamanda eğlenceli bir çalışma ortaya koyabilmişimdir.
                <br />
                <br />
                Hadi o zaman birlikte dünyayı gezelim.
                <Anchor
                  onClick={() => navigate(`/about`)}
                  label=" Daha fazla"
                  size="medium"
                  color="neutral-3"
                />
              </Text>
            </Box>
            <Box align="stretch" basis="1/4">
              <Img fluid={data.file.childImageSharp.fluid} alt="Logo" />
            </Box>
          </Box>
        </Section>
        <Section title="En son yazılar">
          {/* <Posts posts={latest.slice(0, 2)} /> */}
        </Section>
      </App>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.shape().isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    file(relativePath: { eq: "about/ben.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { in: ["photo", "article"] } } }
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            km
            featured
            itinerary
            duration
            coordinates {
              country
              coordinates
            }
            country
            cover {
              childImageSharp {
                fluid(maxHeight: 200, maxWidth: 300, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Index

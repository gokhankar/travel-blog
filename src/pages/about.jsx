import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Box } from "grommet"

import Section from "../components/section"
import Seo from "../components/seo"
import App from "../components/layout"
import { renderAst } from "../tools"

function About({ data }) {
  return (
    <Fragment>
      <Seo
        postImage={data.file.childImageSharp.fluid.src}
        postData={{
          frontmatter: {
            title: `Blog Hakkında - Gezi Bloğu`,
            path: `/about/`,
          },
        }}
      />
      <App title="Blog Hakkında">
        <Section>
          <Box
            margin={{ horizontal: `xlarge`, vertical: `small` }}
            pad="medium"
            align="center"
            elevation="medium"
          >
            {renderAst(data.markdownRemark.htmlAst)}
          </Box>
        </Section>
      </App>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query AboutQuery {
    file(relativePath: { eq: "about/ben.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/about" } }) {
      htmlAst
      frontmatter {
        path
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.shape().isRequired,
}

export default About

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {


    const posts = this.props.data.allMarkdownRemark.edges

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1 
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    
    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
              <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '2rem',
            marginTop: '2rem',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
            marginLeft:'0%',
          }}
        >
       
         {currentPage === 2 ? (
            <Link to={`/tags/${tag}`} rel="prev">
              ← Previous Page
            </Link> )
        : !isFirst && (
            <Link to={`/tags/${tag}/page/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${i === 0 ? `/tags/${tag}` : `/tags/${tag}/page/${i + 1}`}`}
                style={{
                  padding: '0.42rem',
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={`/tags/${tag}/page/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )} 
        </ul>  
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip 
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {


    const posts = this.props.data.allMarkdownRemark.edges

    const { currentPage, numPages, tag } = this.props.pageContext
    const isFirst = currentPage === 1 
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? `/tags/${tag}/` : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`
    

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tags} | ${title}`} />
          <div className="container content">
            <div className="columns">
            
                    {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div className="is-parent column is-6" key={node.fields.slug}>
          <article>
                <header>
                </header>
                <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={node.fields.slug}
                    >
                      {node.frontmatter.title}
                    </Link>
                    <span> </span>
                  </p>
                 </article></div>})}

                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
               
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
             <div>
             <ul>
       
                {currentPage === 2 ? (
                    <Link to={`/tags/${tags}`} rel="prev">
                      ← Previous Page
                    </Link> )
                : !isFirst && (
                    <Link to={`/tags/${tags}/page/${prevPage}`} rel="prev">
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
                to={`/${i === 0 ? `/tags/${tags}` : `/tags/${tags}/page/${i + 1}`}`}
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
            <Link to={`/tags/${tags}/page/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )} 
        </ul>  </div>
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
            tags
          }
        }
      }
    }
  }
`

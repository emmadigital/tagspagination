import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"



export default class TagList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1 
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    console.log('posts')
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
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blogging.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #3571B8, -0.5rem 0 0 #3571B8',
              backgroundColor: '#3571B8',
              color: 'white',
              padding: '1rem',
            }}
          >
            Latest Articles
          </h1>
        </div>

        <section className="section">
          <div className="container">
          <div class="tile is-ancestor">
          <div class="tile is-vertical is-8">
            <div class="tile">              
              <div class="tile is-parent">
                <article class="tile is-child box">
                <div className="content">
                <div className="columns is-multiline">  
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
            <Link to={`/tags`} rel="prev">
              ← Previous Page
            </Link> )
        : !isFirst && (
            <Link to={`/tags/page/${prevPage}`} rel="prev">
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
                to={`/${i === 0 ? '/tags' : `/tags/page/${i + 1}`}`}
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
            <Link to={`/tags/page/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )} 
        </ul>  
                </div>
                </article>
              </div>
            </div>
          </div>
      
        </div>  
          </div>
        </section>
        
       
      </Layout>
    )
  }
}
export const tagListQuery = graphql`
  query TaglistPageQuery($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
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
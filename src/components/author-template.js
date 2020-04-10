import ArchivePost from './archive-post';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import {InnerWrapper, Main, SectionHeading, Sidebar} from './ui';
import {graphql} from 'gatsby';

export default function AuthorTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
  const {name} = props.data.wordpressWpUsers;
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
        <meta property="og:title" content={name} />
        <meta name="twitter:title" content={name} />
      </Helmet>
      <SectionHeading>Posts by {name}</SectionHeading>
      <InnerWrapper>
        <Main>
          {props.data.allWordpressPost.nodes.map(post => (
            <ArchivePost key={post.id} post={post} />
          ))}
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

AuthorTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query AuthorQuery($id: String) {
    wordpressWpUsers(id: {eq: $id}) {
      name
    }
    allWordpressPost(filter: {author: {id: {eq: $id}}}) {
      nodes {
        id
        date
        excerpt
        title
        slug
        featured_media {
          localFile {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
        categories {
          slug
          id
          name
        }
        author {
          name
          slug
          avatar_urls {
            wordpress_96
          }
          acf {
            title
            avatar {
              localFile {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

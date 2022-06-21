import ArchivePost from './archive-post';
import Layout from './layout';
import Metas from './Metas';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import {InnerWrapper, Main, SectionHeading, Sidebar} from './ui';
import {graphql} from 'gatsby';

export default function AuthorTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
  const {name} = props.data.wpUser;
  return (
    <Layout>
      <Metas
        title={name}
        description={`Blog posts by ${name} | ${props.data.wp.generalSettings.description}`}
      />
      <SectionHeading>Posts by {name}</SectionHeading>
      <InnerWrapper>
        <Main>
          {props.data.allWpPost.nodes.map(post => (
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
    wp {
      generalSettings {
        description
      }
    }
    wpUser(id: {eq: $id}) {
      name
    }
    allWpPost(filter: {author: {node: {id: {eq: $id}}}}) {
      nodes {
        id
        date
        excerpt
        title
        path
        featuredImage {
          node {
            localFile {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
        }
        categories {
          nodes {
            id
            name
            path
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
            userMetadata {
              title
              avatarId {
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
  }
`;

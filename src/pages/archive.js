import ArchivePost from '../components/archive-post';
import Categories from '../components/categories';
import FollowUs from '../components/follow-us';
import Layout from '../components/layout';
import NewsletterForm, {useNewsletterForm} from '../components/newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {InnerWrapper, Main, SectionHeading, Sidebar} from '../components/ui';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';
import {size} from 'polished';

const StyledSectionHeading = styled(SectionHeading)({
  display: 'flex',
  alignItems: 'center',
  svg: {
    ...size(18),
    marginRight: 12,
    color: colors.indigo.base
  }
});

export default function Archive(props) {
  const newsletterFormProps = useNewsletterForm();
  return (
    <Layout>
      <StyledSectionHeading>Archive</StyledSectionHeading>
      <InnerWrapper>
        <Main>
          <div>
            {props.data.allWordpressPost.nodes.map(post => (
              <ArchivePost key={post.id} post={post} />
            ))}
          </div>
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <FollowUs />
          <Categories />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

Archive.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    allWordpressPost {
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

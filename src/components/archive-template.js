import ArchivePost from './archive-post';
import Categories from './categories';
import FollowUs from './follow-us';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import Pagination from './pagination';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {InnerWrapper, Main, SectionHeading, Sidebar} from './ui';
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
  const {nodes, pageInfo} = props.data.allWordpressPost;
  return (
    <Layout>
      <StyledSectionHeading>Archive</StyledSectionHeading>
      <InnerWrapper>
        <Main>
          {nodes.map(post => (
            <ArchivePost key={post.id} post={post} />
          ))}
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <FollowUs />
          <Categories />
        </Sidebar>
      </InnerWrapper>
      <Pagination basePath="/archive/" pageInfo={pageInfo} />
    </Layout>
  );
}

Archive.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ArchiveQuery($limit: Int, $skip: Int) {
    allWordpressPost(limit: $limit, skip: $skip) {
      pageInfo {
        currentPage
        pageCount
      }
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

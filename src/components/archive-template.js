import ArchivePost from './archive-post';
import Categories from './categories';
import FollowUs from './follow-us';
import Helmet from 'react-helmet';
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

const ARCHIVE_TITLE = 'Archive';

export default function Archive(props) {
  const newsletterFormProps = useNewsletterForm();
  const {nodes, pageInfo} = props.data.allWpPost;
  return (
    <Layout>
      <Helmet>
        <title>{ARCHIVE_TITLE}</title>
        <meta property="og:title" content={ARCHIVE_TITLE} />
        <meta name="twitter:title" content={ARCHIVE_TITLE} />
      </Helmet>
      <StyledSectionHeading>{ARCHIVE_TITLE}</StyledSectionHeading>
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
    allWpPost(limit: $limit, skip: $skip) {
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
        featuredImage {
          remoteFile {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
        categories {
          nodes {
            slug
            id
            name
          }
        }
        author {
          name
          slug
          avatar {
            url
          }
          userMetadata {
            title
            avatarId {
              remoteFile {
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

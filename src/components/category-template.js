import ArchivePost from './archive-post';
import Categories from './categories';
import FollowUs from './follow-us';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import Pagination from './pagination';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import RecentPosts from './recent-posts';
import styled from '@emotion/styled';
import {
  Categories as CategoriesBase,
  Category,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  categoryStyles,
  selectedCategoryStyles
} from './ui';
import {graphql} from 'gatsby';

const StyledCategories = styled(CategoriesBase)({
  flexWrap: 'wrap',
  marginBottom: 46,
  '> *': {
    marginBottom: 12
  }
});

const SelectedCategory = styled.div({
  ...categoryStyles,
  ...selectedCategoryStyles
});

const StyledRecentPosts = styled(RecentPosts)({
  ':not(:last-child)': {
    marginBottom: 120
  }
});

function LatestPosts(props) {
  return (
    <Fragment>
      <SectionHeading>Latest</SectionHeading>
      <StyledRecentPosts {...props} />
    </Fragment>
  );
}

export default function CategoryTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
  const {path, name, wpChildren, wpParent} = props.data.wpCategory;
  const {nodes, pageInfo} = props.data.allWpPost;
  const {nodes: topics} = wpParent ? wpParent.node.wpChildren : wpChildren;
  const latestPosts = nodes.slice(0, 3);
  const morePosts = nodes.slice(3);
  const hasMorePosts = morePosts.length > 0;
  const isFirstPage = pageInfo.currentPage === 1;
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
        <meta property="og:title" content={name} />
        <meta name="twitter:title" content={name} />
      </Helmet>
      {topics.length > 0 && (
        <StyledCategories>
          {topics.map((topic) => (
            <Fragment key={topic.id}>
              {topic.id === props.pageContext.id ? (
                <SelectedCategory>{topic.name}</SelectedCategory>
              ) : (
                <Category category={topic} />
              )}
            </Fragment>
          ))}
        </StyledCategories>
      )}
      {hasMorePosts && isFirstPage && <LatestPosts posts={latestPosts} />}
      <InnerWrapper>
        <Main>
          {hasMorePosts || !isFirstPage ? (
            <Fragment>
              <SectionHeading>Read more</SectionHeading>
              {(isFirstPage ? morePosts : nodes).map((post) => (
                <ArchivePost key={post.id} post={post} />
              ))}
            </Fragment>
          ) : (
            <LatestPosts posts={latestPosts} />
          )}
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <Categories />
          <FollowUs />
        </Sidebar>
      </InnerWrapper>
      <Pagination basePath={path} pageInfo={pageInfo} />
    </Layout>
  );
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryQuery($id: String, $ids: [String], $limit: Int, $skip: Int) {
    wpCategory(id: {eq: $id}) {
      path
      name
      wpChildren {
        nodes {
          id
          name
          path
        }
      }
      wpParent {
        node {
          wpChildren {
            nodes {
              id
              name
              path
            }
          }
        }
      }
    }
    allWpPost(
      filter: {categories: {nodes: {elemMatch: {id: {in: $ids}}}}}
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        pageCount
      }
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

import ArchivePost from './archive-post';
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
  Categories,
  Category,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  categoryStyles,
  selectedCategoryStyles
} from './ui';
import {graphql} from 'gatsby';

const StyledCategories = styled(Categories)({
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
  const {id, slug, name, categories} = props.pageContext;
  const {nodes, pageInfo} = props.data.allWordpressPost;
  const latestPosts = nodes.slice(0, 3);
  const morePosts = nodes.slice(3);
  const hasMorePosts = morePosts.length > 0;
  const isFirstPage = pageInfo.currentPage === 1;
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <StyledCategories>
        {categories.map(category => (
          <Fragment key={category.id}>
            {category.id === id ? (
              <SelectedCategory>{category.name}</SelectedCategory>
            ) : (
              <Category category={category} />
            )}
          </Fragment>
        ))}
      </StyledCategories>
      {hasMorePosts && isFirstPage && <LatestPosts posts={latestPosts} />}
      <InnerWrapper>
        <Main>
          {hasMorePosts || !isFirstPage ? (
            <Fragment>
              <SectionHeading>Read more</SectionHeading>
              {(isFirstPage ? morePosts : nodes).map(post => (
                <ArchivePost key={post.id} post={post} />
              ))}
            </Fragment>
          ) : (
            <LatestPosts posts={latestPosts} />
          )}
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <FollowUs />
        </Sidebar>
      </InnerWrapper>
      <Pagination basePath={`/category/${slug}/`} pageInfo={pageInfo} />
    </Layout>
  );
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryQuery($id: String, $limit: Int, $skip: Int) {
    allWordpressPost(
      filter: {categories: {elemMatch: {id: {eq: $id}}}}
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

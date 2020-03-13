import ArchivePost from './archive-post';
import FollowUs from './follow-us';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
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
  marginBottom: 60
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
  const {
    wordpressCategory,
    allWordpressCategory,
    allWordpressPost
  } = props.data;
  const latestPosts = allWordpressPost.nodes.slice(0, 3);
  const morePosts = allWordpressPost.nodes.slice(3);
  const hasMorePosts = morePosts.length > 0;
  return (
    <Layout>
      <Helmet>
        <title>{wordpressCategory.name}</title>
      </Helmet>
      <StyledCategories>
        {allWordpressCategory.nodes.map(category => (
          <Fragment key={category.id}>
            {category.id === props.pageContext.id ? (
              <SelectedCategory>{category.name}</SelectedCategory>
            ) : (
              <Category category={category} />
            )}
          </Fragment>
        ))}
      </StyledCategories>
      {hasMorePosts && <LatestPosts posts={latestPosts} />}
      <InnerWrapper>
        <Main>
          {hasMorePosts ? (
            <Fragment>
              <SectionHeading>Read more</SectionHeading>
              {morePosts.map(post => (
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
    </Layout>
  );
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryQuery($id: String) {
    wordpressCategory(id: {eq: $id}) {
      name
    }
    allWordpressCategory {
      nodes {
        id
        slug
        name
      }
    }
    allWordpressPost(filter: {categories: {elemMatch: {id: {eq: $id}}}}) {
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

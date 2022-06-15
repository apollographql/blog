import ArchivePost from './archive-post';
import Categories from './categories';
import FollowUs from './follow-us';
import Layout from './layout';
import Metas from './Metas';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import Pagination from './pagination';
import PropTypes from 'prop-types';
import React from 'react';
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

export default function CategoryTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
  const {path, name, wpChildren, wpParent} = props.data.wpCategory;
  const {nodes, pageInfo} = props.data.allWpPost;
  const {nodes: topics} = wpParent ? wpParent.node.wpChildren : wpChildren;
  const morePosts = nodes.slice(3);
  const hasMorePosts = morePosts.length > 0;
  const isFirstPage = pageInfo.currentPage === 1;

  const categorySlug = wpParent?.node?.name
    ? `${wpParent.node.name} > ${name}`
    : name;
  const metaTitle = `${categorySlug} | ${pageInfo.currentPage}`;

  const topicSelector = topics.length > 0 && (
    <StyledCategories>
      {topics
        .filter(topic => topic.count)
        .map(topic =>
          topic.id === props.pageContext.id ? (
            <SelectedCategory key={topic.id}>{topic.name}</SelectedCategory>
          ) : (
            <Category key={topic.id} category={topic} />
          )
        )}
    </StyledCategories>
  );

  function getHeadingStyle(condition) {
    return {marginBottom: condition && 24};
  }

  const latestPosts = (
    <>
      <SectionHeading style={getHeadingStyle(isFirstPage && topicSelector)}>
        Latest {wpParent?.node.name} {name} posts
      </SectionHeading>
      {isFirstPage && topicSelector}
      <StyledRecentPosts posts={nodes.slice(0, 3)} />
    </>
  );

  return (
    <Layout>
      <Metas
        title={metaTitle}
        description={`Read the latest ${categorySlug} posts | ${props.data.wp.generalSettings.description}`}
      />
      {hasMorePosts && isFirstPage && latestPosts}
      <InnerWrapper>
        <Main>
          {hasMorePosts || !isFirstPage ? (
            <>
              <SectionHeading
                style={getHeadingStyle(!isFirstPage && topicSelector)}
              >
                Read more
              </SectionHeading>
              {!isFirstPage && topicSelector}
              {(isFirstPage ? morePosts : nodes).map(post => (
                <ArchivePost key={post.id} post={post} />
              ))}
            </>
          ) : (
            latestPosts
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
    wp {
      generalSettings {
        description
      }
    }
    wpCategory(id: {eq: $id}) {
      path
      name
      wpChildren {
        nodes {
          id
          name
          path
          count
        }
      }
      wpParent {
        node {
          name
          wpChildren {
            nodes {
              id
              name
              path
              count
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

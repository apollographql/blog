import ArchivePost from '../components/archive-post';
import Byline from '../components/byline';
import FollowUs from '../components/follow-us';
import Layout from '../components/layout';
import NewsletterForm, {useNewsletterForm} from '../components/newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import RecentPosts, {PostLink} from '../components/recent-posts';
import styled from '@emotion/styled';
import {
  Categories,
  DateText,
  ExcerptText,
  FONT_FAMILY_MONO,
  HeadingLink,
  InnerWrapper,
  Main,
  PostImage,
  SectionHeading,
  Sidebar,
  TopFold
} from '../components/ui';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';
import {Link, graphql} from 'gatsby';
import {ListCategories} from '../components/categories';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';
import {size} from 'polished';

const FeaturedPost = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: 124
});

const StyledRecentPosts = styled(RecentPosts)({
  marginBottom: 90
});

const ViewAllLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: FONT_FAMILY_MONO,
  color: colors.indigo.base,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  },
  svg: {
    ...size('1em'),
    marginLeft: 12
  }
});

const HomePageCategories = styled(Categories)({
  marginBottom: 32
});

export default function Index(props) {
  const newsletterFormProps = useNewsletterForm();
  const [featuredPost, ...otherPosts] = props.data.allWpPost.nodes;
  const recentPosts = otherPosts.slice(0, 4);
  const archivePosts = otherPosts.slice(4);
  return (
    <Layout>
      <HomePageCategories>
        <ListCategories />
      </HomePageCategories>
      <TopFold>
        <DateText style={{marginBottom: 12}} date={featuredPost.date} />
        <h2>
          <HeadingLink to={featuredPost.path}>
            {decode(featuredPost.title)}
          </HeadingLink>
        </h2>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedPost>
            <PostLink to={featuredPost.path}>
              {featuredPost.featuredImage && (
                <PostImage
                  src={
                    featuredPost.featuredImage.node?.localFile.childImageSharp
                      .original.src
                  }
                />
              )}
              <ExcerptText excerpt={featuredPost.excerpt} />
            </PostLink>
            <Byline author={featuredPost.author.node} />
          </FeaturedPost>
          <SectionHeading>What&apos;s new</SectionHeading>
          <StyledRecentPosts posts={recentPosts} />
          <SectionHeading style={{marginBottom: 8}}>Archive</SectionHeading>
          <div style={{marginBottom: 48}}>
            <ViewAllLink to="/archive/1">
              View all posts <IconProceed />
            </ViewAllLink>
          </div>
          <div>
            {archivePosts.map(post => (
              <ArchivePost key={post.id} post={post} />
            ))}
          </div>
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <FollowUs />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

Index.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    allWpPost(
      sort: {fields: date, order: DESC}
      limit: 10
      filter: {
        categories: {
          nodes: {elemMatch: {slug: {nin: ["retail", "financial-services"]}}}
        }
      }
    ) {
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

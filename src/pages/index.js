import ArchivePost from '../components/archive-post';
import Byline from '../components/byline';
import Categories from '../components/categories';
import FollowUs from '../components/follow-us';
import Layout from '../components/layout';
import NewsletterForm, {useNewsletterForm} from '../components/newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import RecentPosts, {PostLink} from '../components/recent-posts';
import styled from '@emotion/styled';
import {
  DateText,
  ExcerptText,
  HeadingLink,
  InnerWrapper,
  Main,
  PostImage,
  SectionHeading,
  Sidebar,
  TopFold
} from '../components/ui';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';
import {graphql} from 'gatsby';
import {size} from 'polished';

const FeaturedPost = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: 124
});

const StyledSectionHeading = styled(SectionHeading)({
  display: 'flex',
  alignItems: 'center',
  svg: {
    ...size(18),
    marginRight: 12,
    color: colors.indigo.base
  }
});

const StyledRecentPosts = styled(RecentPosts)({
  marginBottom: 90
});

export default function Index(props) {
  const newsletterFormProps = useNewsletterForm();
  const [featuredPost, ...otherPosts] = props.data.allWordpressPost.nodes;
  const recentPosts = otherPosts.slice(0, 4);
  const archivePosts = otherPosts.slice(4);
  return (
    <Layout>
      <TopFold>
        <DateText style={{marginBottom: 12}} date={featuredPost.date} />
        <h2>
          <HeadingLink to={'/' + featuredPost.slug}>
            {decode(featuredPost.title)}
          </HeadingLink>
        </h2>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedPost>
            <PostLink to={'/' + featuredPost.slug}>
              {featuredPost.featured_media && (
                <PostImage
                  src={
                    featuredPost.featured_media.localFile.childImageSharp
                      .original.src
                  }
                />
              )}
              <ExcerptText excerpt={featuredPost.excerpt} />
            </PostLink>
            <Byline author={featuredPost.author} />
          </FeaturedPost>
          <StyledSectionHeading>Recent</StyledSectionHeading>
          <StyledRecentPosts posts={recentPosts} />
          <StyledSectionHeading>
            <HeadingLink to="/archive">Archive</HeadingLink>
          </StyledSectionHeading>
          <div>
            {archivePosts.map(post => (
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

Index.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    allWordpressPost(limit: 10) {
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

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
  Category,
  DateText,
  ExcerptText,
  HeadingLink,
  InnerWrapper,
  Main,
  PostImage,
  SectionHeading,
  Sidebar,
  SidebarSection,
  TopFold
} from '../components/ui';
import {IconBookmark} from '@apollo/space-kit/icons/IconBookmark';
import {IconTime} from '@apollo/space-kit/icons/IconTime';
import {colors} from '@apollo/space-kit/colors';
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

const CategoryNav = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: 16,
  '> :not(:last-child)': {
    marginBottom: 16
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
            {featuredPost.title}
          </HeadingLink>
        </h2>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedPost>
            <PostLink to={'/' + featuredPost.slug}>
              <PostImage
                style={{height: 240}}
                src={
                  featuredPost.featured_media.localFile.childImageSharp.original
                    .src
                }
              />
              <ExcerptText
                style={{marginBottom: 24}}
                excerpt={featuredPost.excerpt}
              />
            </PostLink>
            <Byline author={featuredPost.author} />
          </FeaturedPost>
          <StyledSectionHeading>
            <IconTime />
            Recent
          </StyledSectionHeading>
          <StyledRecentPosts posts={recentPosts} />
          <StyledSectionHeading>
            <IconBookmark />
            Archive
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
          <SidebarSection>
            <SectionHeading>Categories</SectionHeading>
            <CategoryNav>
              {props.data.allWordpressCategory.nodes.map(category => (
                <Category key={category.id} category={category} />
              ))}
            </CategoryNav>
          </SidebarSection>
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
          avatar_urls {
            wordpress_96
          }
          acf {
            title
          }
        }
      }
    }
    allWordpressCategory {
      nodes {
        id
        slug
        name
      }
    }
  }
`;

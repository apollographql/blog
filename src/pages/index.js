import Byline from '../components/byline';
import FollowUs from '../components/follow-us';
import Layout from '../components/layout';
import NewsletterForm from '../components/newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  Excerpt,
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
import {graphql} from 'gatsby';

const FeaturedPost = styled.div({
  marginBottom: 124
});

const RecentPosts = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '-30px -15px',
  marginBottom: 90
});

const RecentPost = styled.div({
  width: '50%',
  padding: '30px 15px'
});

const PostCategories = styled.div({
  display: 'flex',
  [Category]: {
    marginRight: 12
  }
});

const StyledSectionHeading = styled(SectionHeading)({
  marginBottom: 48
});

const ArchivePosts = styled.div({
  marginBottom: 120
});

const ArchivePost = styled.div({
  ':not(:last-child)': {
    marginBottom: 40
  }
});

const CategoryNav = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: 16,
  [Category]: {
    ':not(:last-child)': {
      marginBottom: 16
    }
  }
});

const posts = [
  {
    id: 1,
    date: 'November 7, 2019',
    title: 'Roadmap to your data graph',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua…',
    categories: [
      {
        id: 1,
        name: 'Development'
      },
      {
        id: 2,
        name: 'Product'
      }
    ]
  },
  {
    id: 2,
    date: 'November 7, 2019',
    title: 'Roadmap to your data graph',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing…',
    categories: [
      {
        id: 1,
        name: 'Development'
      },
      {
        id: 2,
        name: 'Product'
      }
    ]
  },
  {
    id: 3,
    date: 'November 7, 2019',
    title: 'Roadmap to your data graph',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut labore et dolore magna aliqua…',
    categories: [
      {
        id: 1,
        name: 'Development'
      },
      {
        id: 2,
        name: 'Product'
      }
    ]
  }
];

export default function Index(props) {
  const {categories} = props.data.wordpress;
  return (
    <Layout>
      <TopFold>
        <DateText style={{marginBottom: 12}}>November 14, 2019</DateText>
        <h2>What I Learned at GraphQL Summit 2019</h2>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedPost>
            <PostImage
              style={{height: 240}}
              src="https://spaceholder.cc/800x600"
            />
            <Excerpt style={{marginBottom: 24}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua sed do eiusmod
              tempor incididunt ut labore.
            </Excerpt>
            <Byline
              avatar="https://pbs.twimg.com/profile_images/1189363307624288256/euOBSJ5W_400x400.jpg"
              name="Khalil Stemmler"
              title="Developer Advocate"
            />
          </FeaturedPost>
          <StyledSectionHeading>
            <IconTime />
            Recent
          </StyledSectionHeading>
          <RecentPosts>
            {posts.map(post => (
              <RecentPost key={post.id}>
                <PostImage
                  style={{height: 160}}
                  src="https://spaceholder.cc/600x400"
                />
                <DateText>{post.date}</DateText>
                <h3>{post.title}</h3>
                <Excerpt style={{marginBottom: 16}}>{post.excerpt}</Excerpt>
                <PostCategories>
                  {post.categories.map(category => (
                    <Category key={category.id} size="small">
                      {category.name}
                    </Category>
                  ))}
                </PostCategories>
              </RecentPost>
            ))}
          </RecentPosts>
          <StyledSectionHeading>
            <IconBookmark />
            Archive
          </StyledSectionHeading>
          <ArchivePosts>
            {posts.map(post => (
              <ArchivePost key={post.id}>
                <DateText>{post.date}</DateText>
                <h3>{post.title}</h3>
                <Byline
                  mini
                  avatar="https://pbs.twimg.com/profile_images/1189363307624288256/euOBSJ5W_400x400.jpg"
                  name="Khalil Stemmler"
                  title="Developer Advocate"
                />
              </ArchivePost>
            ))}
          </ArchivePosts>
        </Main>
        <Sidebar>
          <NewsletterForm />
          <FollowUs />
          <SidebarSection>
            <SectionHeading>Categories</SectionHeading>
            <CategoryNav>
              {categories.nodes.map(category => (
                <Category key={category.id}>{category.name}</Category>
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
    wordpress {
      categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`;

import Byline from '../components/byline';
import PageLayout from '../components/page-layout';
import React from 'react';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  Excerpt,
  PostImage,
  SectionHeading
} from '../components/ui';
import {IconBookmark} from '@apollo/space-kit/icons/IconBookmark';
import {IconTime} from '@apollo/space-kit/icons/IconTime';

const FeaturedPost = styled.div({
  marginBottom: 124
});

const RecentPosts = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: -15,
  marginBottom: 105
});

const RecentPost = styled.div({
  width: '50%',
  padding: 15
});

const Categories = styled.div({
  display: 'flex',
  [Category]: {
    marginRight: 12
  }
});

const StyledSectionHeading = styled(SectionHeading)({
  marginBottom: 48
});

const Post = styled.div({
  ':not(:last-child)': {
    marginBottom: 40
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

export default function Index() {
  return (
    <PageLayout>
      <FeaturedPost>
        <DateText style={{marginBottom: 12}}>November 14, 2019</DateText>
        <h2>What I Learned at GraphQL Summit 2019</h2>
        <PostImage style={{height: 240}} src="https://spaceholder.cc/800x600" />
        <Excerpt style={{marginBottom: 24}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua sed do eiusmod tempor
          incididunt ut labore.
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
            <Categories>
              {post.categories.map(category => (
                <Category key={category.id} size="small">
                  {category.name}
                </Category>
              ))}
            </Categories>
          </RecentPost>
        ))}
      </RecentPosts>
      <StyledSectionHeading>
        <IconBookmark />
        Archive
      </StyledSectionHeading>
      <div>
        {posts.map(post => (
          <Post key={post.id}>
            <DateText>{post.date}</DateText>
            <h3>{post.title}</h3>
            <Byline
              mini
              avatar="https://pbs.twimg.com/profile_images/1189363307624288256/euOBSJ5W_400x400.jpg"
              name="Khalil Stemmler"
              title="Developer Advocate"
            />
          </Post>
        ))}
      </div>
    </PageLayout>
  );
}

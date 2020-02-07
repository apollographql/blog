import ArchivePost from '../archive-post';
import React from 'react';
import styled from '@emotion/styled';
import {graphql, useStaticQuery} from 'gatsby';

const Wrapper = styled.div({
  flexGrow: 1
});

export default function RecentPosts() {
  const data = useStaticQuery(
    graphql`
      {
        wordpress {
          posts(first: 3) {
            nodes {
              date
              excerpt
              title
              slug
              featuredImage {
                sourceUrl(size: LARGE)
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
                avatar {
                  url
                }
                userMetadata {
                  title
                }
              }
            }
          }
        }
      }
    `
  );

  return (
    <Wrapper>
      {data.wordpress.posts.nodes.map(post => (
        <ArchivePost key={post.id} post={post} />
      ))}
    </Wrapper>
  );
}

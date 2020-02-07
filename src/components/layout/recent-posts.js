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
        allWordpressPost(limit: 3) {
          nodes {
            date
            excerpt
            title
            slug
            featured_media {
              localFile {
                childImageSharp {
                  id
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
      }
    `
  );

  return (
    <Wrapper>
      {data.allWordpressPost.nodes.map(post => (
        <ArchivePost key={post.id} post={post} />
      ))}
    </Wrapper>
  );
}

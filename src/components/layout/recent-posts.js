import ArchivePost from '../archive-post';
import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

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
    <div>
      {data.wordpress.posts.nodes.map(post => (
        <ArchivePost key={post.id} post={post} />
      ))}
    </div>
  );
}

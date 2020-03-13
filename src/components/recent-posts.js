import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Category, DateText, ExcerptText, PostImage} from './ui';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridColumnGap: 30,
  gridRowGap: 60
});

export const PostLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  img: {
    transition: 'transform 100ms ease-in-out'
  },
  ':hover': {
    h4: {
      color: colors.indigo.base
    },
    img: {
      transform: 'scale(1.032)'
    }
  }
});

const PostCategories = styled.div({
  display: 'flex',
  '> :not(:last-child)': {
    marginRight: 12
  }
});

export default function RecentPosts({posts, ...props}) {
  return (
    <Wrapper {...props}>
      {posts.map(post => (
        <div key={post.id}>
          <PostLink to={'/' + post.slug}>
            {post.featured_media && (
              <PostImage
                style={{height: 160}}
                src={post.featured_media.localFile.childImageSharp.original.src}
              />
            )}
            <DateText date={post.date} />
            <h4>{decode(post.title)}</h4>
            <ExcerptText excerpt={post.excerpt} />
          </PostLink>
          <PostCategories>
            {post.categories.map(category => (
              <Category isSmall key={category.id} category={category} />
            ))}
          </PostCategories>
        </div>
      ))}
    </Wrapper>
  );
}

RecentPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

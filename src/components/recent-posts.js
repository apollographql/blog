import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {
  Categories,
  Category,
  DateText,
  ExcerptText,
  PostImage,
  postImageStyles
} from './ui';
import {Link} from 'gatsby';
import {ReactComponent as Logo} from '@apollo/space-kit/logos/mark.svg';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridColumnGap: 30,
  gridRowGap: 60
});

const POST_IMAGE_HEIGHT = 160;
const PostImagePlaceholderWrapper = styled.div({
  ...postImageStyles,
  height: POST_IMAGE_HEIGHT,
  backgroundColor: colors.silver.dark,
  color: colors.silver.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const PostLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  ':hover': {
    h4: {
      color: colors.indigo.base
    },
    [['img', PostImagePlaceholderWrapper]]: {
      opacity: 0.8
    }
  }
});

function PostImagePlaceholder() {
  return (
    <PostImagePlaceholderWrapper>
      <Logo fill="currentColor" height={72} />
    </PostImagePlaceholderWrapper>
  );
}

export default function RecentPosts({posts, ...props}) {
  return (
    <Wrapper {...props}>
      {posts.map(post => (
        <div key={post.id}>
          <PostLink to={post.path}>
            {post.featuredImage ? (
              <PostImage
                style={{height: POST_IMAGE_HEIGHT}}
                src={
                  post.featuredImage.node?.localFile.childImageSharp.original
                    .src
                }
              />
            ) : (
              <PostImagePlaceholder />
            )}
            <DateText date={post.date} />
            <h4>{decode(post.title)}</h4>
            <Categories>
              {post.categories.nodes.map(category => (
                <Category isSmall key={category.id} category={category} />
              ))}
            </Categories>
            <ExcerptText
              excerpt={post.excerpt}
              style={{
                fontSize: 13,
                marginTop: 16
              }}
            />
          </PostLink>
        </div>
      ))}
    </Wrapper>
  );
}

RecentPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

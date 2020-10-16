import Avatar from './avatar';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  ':hover': {
    img: {
      opacity: 0.7
    },
    '.name': {
      color: colors.indigo.base
    }
  }
});

const Subheading = styled.h6({
  color: colors.grey.light
});

export default function Byline(props) {
  if (!props.author) {
    return null;
  }

  const {name, slug, userMetadata} = props.author;
  return (
    <StyledLink to={`/author/${slug}`}>
      <Avatar size={props.size} author={props.author} />
      {props.size === 'md' ? (
        <div>
          <h5 className="name">{name}</h5>
          <Subheading>{userMetadata.title}</Subheading>
        </div>
      ) : (
        <Subheading
          style={{
            fontSize: props.size === 'sm' && 16
          }}
        >
          by <span className="name">{name}</span>
        </Subheading>
      )}
    </StyledLink>
  );
}

Byline.propTypes = {
  author: PropTypes.object,
  size: PropTypes.oneOf(['xs', 'sm', 'md'])
};

Byline.defaultProps = {
  size: 'md'
};

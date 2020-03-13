import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {size} from 'polished';

export const avatarSizes = {
  xs: 20,
  sm: 24,
  md: 44,
  lg: 68
};

export const avatarMargins = {
  xs: 8,
  sm: 10,
  md: 16,
  lg: 29
};

const StyledImg = styled.img({
  borderRadius: 4,
  objectFit: 'cover'
});

export default function Avatar(props) {
  const {acf, avatar_urls} = props.author;
  return (
    <StyledImg
      src={
        acf.avatar
          ? acf.avatar.localFile.childImageSharp.original.src
          : avatar_urls.wordpress_96
      }
      style={{
        ...size(avatarSizes[props.size]),
        marginRight: avatarMargins[props.size]
      }}
    />
  );
}

Avatar.propTypes = {
  author: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
};

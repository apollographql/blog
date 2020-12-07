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
  const {userMetadata, avatar} = props.author;
  return (
    <StyledImg
      src={
        userMetadata.avatarId
          ? userMetadata.avatarId.localFile.childImageSharp.original.src
          : avatar.url
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

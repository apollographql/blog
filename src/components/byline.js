import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {size} from 'polished';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const Avatar = styled.img(props => ({
  ...size(props.mini ? 20 : 44),
  borderRadius: 4,
  marginRight: props.mini ? 8 : 16,
  objectFit: 'cover'
}));

export default function Byline(props) {
  const {avatar, name, description} = props.author;
  return (
    <Wrapper>
      <Avatar mini={props.mini} src={avatar.url} />
      {props.mini ? (
        <h6>by {name}</h6>
      ) : (
        <div>
          <h5>{name}</h5>
          <h6>{description}</h6>
        </div>
      )}
    </Wrapper>
  );
}

Byline.propTypes = {
  author: PropTypes.object.isRequired,
  mini: PropTypes.bool
};

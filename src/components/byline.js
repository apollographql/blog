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
  return (
    <Wrapper>
      <Avatar mini={props.mini} src={props.avatar} />
      {props.mini ? (
        <h6>by {props.name}</h6>
      ) : (
        <div>
          <h5>{props.name}</h5>
          <h6>{props.title}</h6>
        </div>
      )}
    </Wrapper>
  );
}

Byline.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mini: PropTypes.bool
};

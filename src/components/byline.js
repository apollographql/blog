import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {size} from 'polished';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const Avatar = styled.img({
  ...size(44),
  borderRadius: 4,
  marginRight: 16,
  objectFit: 'cover'
});

export default function Byline(props) {
  return (
    <Wrapper>
      <Avatar src={props.avatar} />
      <div>
        <h5>{props.name}</h5>
        <h6>{props.title}</h6>
      </div>
    </Wrapper>
  );
}

Byline.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

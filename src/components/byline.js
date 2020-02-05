import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Avatar} from './ui';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';

const Wrapper = styled(Link)({
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
  const {avatar, name, userMetadata} = props.author;
  return (
    <Wrapper>
      <Avatar size={props.mini ? 'sm' : 'md'} src={avatar.url} />
      {props.mini ? (
        <Subheading>
          by <span className="name">{name}</span>
        </Subheading>
      ) : (
        <div>
          <h5 className="name">{name}</h5>
          <Subheading>{userMetadata.title}</Subheading>
        </div>
      )}
    </Wrapper>
  );
}

Byline.propTypes = {
  author: PropTypes.object.isRequired,
  mini: PropTypes.bool
};

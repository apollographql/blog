import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {size} from 'polished';

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
        <h6>
          by <span className="name">{name}</span>
        </h6>
      ) : (
        <div>
          <h5 className="name">{name}</h5>
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

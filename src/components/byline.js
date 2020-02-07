import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Avatar} from './ui';
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
  const {avatar_urls, name, acf} = props.author;
  return (
    <StyledLink to="/">
      <Avatar size={props.mini ? 'sm' : 'md'} src={avatar_urls.wordpress_96} />
      {props.mini ? (
        <Subheading>
          by <span className="name">{name}</span>
        </Subheading>
      ) : (
        <div>
          <h5 className="name">{name}</h5>
          <Subheading>{acf.title}</Subheading>
        </div>
      )}
    </StyledLink>
  );
}

Byline.propTypes = {
  author: PropTypes.object.isRequired,
  mini: PropTypes.bool
};

import PropTypes from 'prop-types';
import React from 'react';
import TwitterButton from './twitter-button';
import styled from '@emotion/styled';
import {
  Avatar,
  avatarMargins,
  avatarSizes,
  dateTextStyles,
  largeTextStyles
} from '../ui';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {size} from 'polished';

export const linkStyles = {
  color: colors.indigo.base,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};

const AuthorHeader = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const AuthorByline = styled.div({
  marginRight: 'auto',
  h5: dateTextStyles
});

const AuthorBio = styled.div({
  marginTop: 14,
  paddingLeft: avatarSizes.lg + avatarMargins.lg,
  color: colors.grey.base,
  p: {
    ...largeTextStyles,
    ':not(:last-child)': {
      marginBottom: 24
    }
  },
  a: {
    ...linkStyles,
    display: 'inline-flex',
    alignItems: 'center',
    svg: {
      ...size(19),
      marginLeft: 12
    }
  }
});

export default function AuthorDetails(props) {
  const {avatar_urls, name, acf, description} = props.author;
  return (
    <div>
      <AuthorHeader>
        <Avatar size="lg" src={avatar_urls.wordpress_96} />
        <AuthorByline>
          <h5>Written by</h5>
          <h3>{name}</h3>
        </AuthorByline>
        {acf.twitter && (
          <TwitterButton
            as={
              <a
                href={`https://twitter.com/${acf.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Follow
          </TwitterButton>
        )}
      </AuthorHeader>
      <AuthorBio>
        <p>{description}</p>
        <p>
          <Link to="/author/name">
            Read more by {name} <IconProceed />
          </Link>
        </p>
      </AuthorBio>
    </div>
  );
}

AuthorDetails.propTypes = {
  author: PropTypes.object.isRequired
};

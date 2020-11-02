import Avatar, {avatarMargins, avatarSizes} from '../avatar';
import PropTypes from 'prop-types';
import React from 'react';
import TwitterButton from './twitter-button';
import styled from '@emotion/styled';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {dateTextStyles, largeTextStyles, linkStyles} from '../ui';
import {decode} from 'he';
import {size} from 'polished';

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
  if (!props.author) {
    return null;
  }

  const {name, slug, userMetadata, description} = props.author;
  return (
    <div>
      <AuthorHeader>
        <Avatar size="lg" author={props.author} />
        <AuthorByline>
          <h5>Written by</h5>
          <h3>{name}</h3>
        </AuthorByline>
        {userMetadata.twitter && (
          <TwitterButton
            as={
              <a
                href={`https://twitter.com/${userMetadata.twitter}`}
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
        {description && (
          <p
            dangerouslySetInnerHTML={{
              __html: decode(description).replace(
                /(https?:\/\/([\w./-]+))/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
              )
            }}
          />
        )}
        <p>
          <Link to={`/author/${slug}`}>
            Read more by {name} <IconProceed />
          </Link>
        </p>
      </AuthorBio>
    </div>
  );
}

AuthorDetails.propTypes = {
  author: PropTypes.object
};

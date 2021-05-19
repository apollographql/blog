import Byline from './byline';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {DateText, HeadingLink} from './ui';
import {decode} from 'he';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  ':not(:last-child)': {
    marginBottom: 40
  }
});

export default function ArchivePost(props) {
  return (
    <Wrapper key={props.post.id}>
      <DateText date={props.post.date} />
      <h4>
        <HeadingLink to={props.post.path}>
          {decode(props.post.title)}
        </HeadingLink>
      </h4>
      <Byline size="xs" author={props.post.author.node} />
    </Wrapper>
  );
}

ArchivePost.propTypes = {
  post: PropTypes.object.isRequired
};

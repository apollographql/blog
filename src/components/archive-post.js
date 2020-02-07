import Byline from './byline';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {DateText, HeadingLink} from './ui';

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
        <HeadingLink to={'/' + props.post.slug}>{props.post.title}</HeadingLink>
      </h4>
      <Byline mini author={props.post.author} />
    </Wrapper>
  );
}

ArchivePost.propTypes = {
  post: PropTypes.object.isRequired
};

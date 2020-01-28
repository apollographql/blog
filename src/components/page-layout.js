import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Layout} from 'gatsby-theme-apollo-core';

const Wrapper = styled.div({
  maxWidth: 1220,
  margin: '0 auto'
});

export default function PageLayout(props) {
  return (
    <Layout>
      <Wrapper>{props.children}</Wrapper>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};

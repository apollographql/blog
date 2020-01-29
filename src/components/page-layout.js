import NewsletterForm from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Layout} from 'gatsby-theme-apollo-core';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1220,
  minHeight: '100vh',
  margin: '0 auto'
});

const Header = styled.header({
  display: 'flex',
  alignItems: 'center',
  height: 64,
  backgroundColor: 'white',
  position: 'sticky',
  top: 0
});

const InnerWrapper = styled.div({
  display: 'flex',
  flexGrow: 1
});

const Main = styled.main({
  flexGrow: 1
});

const Sidebar = styled.aside({
  width: 200,
  flexShrink: 0
});

export default function PageLayout(props) {
  return (
    <Layout>
      <Wrapper>
        <Header>
          Logo
          <div>Search</div>
        </Header>
        <InnerWrapper>
          <Main>{props.children}</Main>
          <Sidebar>
            <NewsletterForm />
          </Sidebar>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};

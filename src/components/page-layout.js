import Helmet from 'react-helmet';
import NewsletterForm from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {ReactComponent as BlogIcon} from '../assets/blog.svg';
import {Global} from '@emotion/core';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';
import {Layout} from 'gatsby-theme-apollo-core';
import {TextField} from '@apollo/space-kit/TextField';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1220,
  minHeight: '100vh',
  margin: '0 auto',
  padding: '0 40px'
});

const Header = styled.header({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 0',
  backgroundColor: 'white',
  position: 'sticky',
  top: 0
});

const LogoWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const StyledApolloIcon = styled(ApolloIcon)({
  height: 28,
  marginRight: 8
});

const StyledBlogIcon = styled(BlogIcon)({
  height: 23,
  marginTop: 2
});

const SearchInput = styled(TextField)({
  flexGrow: 1,
  marginLeft: 72
});

const InnerWrapper = styled.div({
  display: 'flex',
  flexGrow: 1,
  paddingTop: 66
});

const Main = styled.main({
  flexGrow: 1
});

const Sidebar = styled.aside({
  width: 262,
  flexShrink: 0,
  position: 'sticky',
  top: 90,
  marginLeft: 127
});

export default function PageLayout(props) {
  return (
    <Layout>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:700|Source+Sans+Pro:700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Global
        styles={{
          h2: {
            fontSize: 38,
            lineHeight: '46px',
            fontWeight: 700
          },
          h3: {
            fontFamily: "'Source Code Pro', Menlo, monospace",
            fontWeight: 700,
            letterSpacing: 3,
            fontSize: 21,
            lineHeight: '30px',
            textTransform: 'uppercase',
            marginBottom: 8
          }
        }}
      />
      <Wrapper>
        <Header>
          <LogoWrapper>
            <StyledApolloIcon />
            <StyledBlogIcon />
          </LogoWrapper>
          <SearchInput
            size="large"
            placeholder="Search blog..."
            icon={
              <IconSearch
                style={{
                  height: 14,
                  width: 14
                }}
              />
            }
          />
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

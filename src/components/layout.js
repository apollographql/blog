import '@apollo/space-kit/reset.css';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import styles, {HEADINGS} from '../styles';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {ReactComponent as BlogIcon} from '../assets/blog.svg';
import {Global} from '@emotion/core';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';
import {Link, graphql, useStaticQuery} from 'gatsby';
import {SectionHeading} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {size} from 'polished';

const Wrapper = styled.div({
  maxWidth: 1220,
  margin: '0 auto',
  padding: '0 40px'
});

const Header = styled.header({
  marginBottom: 66,
  padding: '8px 0',
  backgroundColor: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1
});

const HeaderInner = styled(Wrapper)({
  display: 'flex',
  alignItems: 'center'
});

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'flex-start',
  color: 'inherit'
});

const StyledApolloIcon = styled(ApolloIcon)({
  height: 28,
  marginRight: 8
});

const StyledBlogIcon = styled(BlogIcon)({
  height: 22,
  marginTop: 2
});

const SearchInput = styled(TextField)({
  flexGrow: 1,
  marginLeft: 72
});

const Footer = styled.footer({
  marginTop: 120,
  padding: '120px 0',
  backgroundColor: '#181137',
  color: colors.indigo.lightest,
  [HEADINGS]: {
    color: 'inherit'
  }
});

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      {
        wordpress {
          generalSettings {
            title
            description
          }
        }
      }
    `
  );

  const {title, description} = data.wordpress.generalSettings;
  return (
    <Fragment>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:700|Source+Sans+Pro:700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://apollographql.com/favicon.ico" />
        <style id="space-kit">{'/* Space Kit CSS goes here */'}</style>
      </Helmet>
      <Global styles={styles} />
      <Header>
        <HeaderInner>
          <LogoLink to="/">
            <StyledApolloIcon />
            <StyledBlogIcon />
          </LogoLink>
          <SearchInput
            size="large"
            placeholder="Search blog..."
            icon={<IconSearch style={size(14)} />}
          />
        </HeaderInner>
      </Header>
      <Wrapper>{props.children}</Wrapper>
      <Footer>
        <Wrapper>
          <SectionHeading>Similar articles</SectionHeading>
        </Wrapper>
      </Footer>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

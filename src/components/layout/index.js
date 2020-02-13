import '@apollo/space-kit/reset.css';
import FooterNav from './footer-nav';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import RecentPosts from './recent-posts';
import styled from '@emotion/styled';
import styles from '../../styles';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {ReactComponent as BlogIcon} from '../../assets/blog.svg';
import {Global} from '@emotion/core';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';
import {LargeInput, SectionHeading} from '../ui';
import {Link, graphql, useStaticQuery} from 'gatsby';
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

const SearchInput = styled(LargeInput)({
  flexGrow: 1,
  marginLeft: 72,
  input: {
    paddingLeft: 40
  },
  'label div div': {
    left: 16
  }
});

const StyledSearchIcon = styled(IconSearch)(size(16));

const Footer = styled.footer({
  marginTop: 120,
  padding: '120px 0',
  backgroundColor: '#181137',
  color: colors.indigo.lightest,
  h4: {
    color: 'inherit'
  },
  h6: {
    color: colors.grey.lighter
  }
});

const FooterInner = styled.div({
  display: 'flex',
  marginTop: 60
});

const FooterNavGroup = styled.div({
  marginLeft: 100
});

const HiddenInput = styled.div({
  display: 'none'
});

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      query LayoutQuery {
        wordpressSiteMetadata {
          description
          title: name
        }
        companyMenu: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 2}) {
          ...MenuFragment
        }
        communityMenu: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 3}) {
          ...MenuFragment
        }
        helpMenu: wordpressWpApiMenusMenusItems(wordpress_id: {eq: 4}) {
          ...MenuFragment
        }
      }

      fragment MenuFragment on wordpress__wp_api_menus_menus_items {
        name
        items {
          object_id
          url
          title
        }
      }
    `
  );

  const {title, description} = data.wordpressSiteMetadata;
  return (
    <Fragment>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:700|Source+Sans+Pro:700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://apollographql.com/favicon.ico" />
      </Helmet>
      <Global styles={styles} />
      <Header>
        <HeaderInner>
          <LogoLink to="/">
            <StyledApolloIcon />
            <StyledBlogIcon />
          </LogoLink>
          <SearchInput
            placeholder="Search blog..."
            type="search"
            icon={<StyledSearchIcon />}
          />
        </HeaderInner>
      </Header>
      <Wrapper>{props.children}</Wrapper>
      <Footer>
        <Wrapper>
          <SectionHeading>Recent articles</SectionHeading>
          <FooterInner>
            <RecentPosts />
            <FooterNavGroup>
              <FooterNav menu={data.companyMenu} />
            </FooterNavGroup>
            <FooterNavGroup>
              <FooterNav menu={data.communityMenu} />
              <FooterNav menu={data.helpMenu} />
            </FooterNavGroup>
          </FooterInner>
        </Wrapper>
      </Footer>
      {/* for the newsletter form styles */}
      <HiddenInput id="spaceKitInput">
        <TextField size="large" type="hidden" />
      </HiddenInput>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

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

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      query LayoutQuery {
        wordpress {
          generalSettings {
            title
            description
          }
          companyMenu: menu(id: "TWVudToy") {
            ...MenuFragment
          }
          communityMenu: menu(id: "TWVudToz") {
            ...MenuFragment
          }
          helpMenu: menu(id: "TWVudTo0") {
            ...MenuFragment
          }
        }
      }

      fragment MenuFragment on Wordpress_Menu {
        name
        menuItems {
          nodes {
            id
            url
            label
          }
        }
      }
    `
  );

  const {
    generalSettings,
    companyMenu,
    communityMenu,
    helpMenu
  } = data.wordpress;
  const {title, description} = generalSettings;
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
              <FooterNav menu={companyMenu} />
            </FooterNavGroup>
            <FooterNavGroup>
              <FooterNav menu={communityMenu} />
              <FooterNav menu={helpMenu} />
            </FooterNavGroup>
          </FooterInner>
        </Wrapper>
      </Footer>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

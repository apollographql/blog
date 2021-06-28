import '@apollo/space-kit/reset.css';
import ArchivePost from '../archive-post';
import FooterNav from './footer-nav';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import styles from '../../styles';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  SectionHeading,
  WRAPPER_PADDING_X
} from '../ui';
import {ReactComponent as BlogIcon} from '../../assets/blog.svg';
import {Global} from '@emotion/core';
import {Link, graphql, useStaticQuery, withPrefix} from 'gatsby';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {triangle} from 'polished';

const Wrapper = styled.div({
  maxWidth: BREAKPOINT_LG,
  margin: '0 auto',
  padding: `0 ${WRAPPER_PADDING_X}px`
});

const Header = styled.header({
  marginBottom: 33,
  backgroundColor: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1
});

const HeaderInner = styled(Wrapper)({
  display: 'flex',
  alignItems: 'center',
  height: 72
});

const LogoWrapper = styled.div({
  display: 'flex',
  marginRight: 24
});

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'flex-start',
  fontSize: 24,
  color: colors.black.lighter
});

const StyledApolloIcon = styled(ApolloIcon)({
  height: '1em',
  marginRight: '0.2857142857em'
});

const StyledBlogIcon = styled(BlogIcon)({
  height: '0.7857142857em',
  marginTop: '0.07142857143em'
});

const SearchForm = styled.form({
  flexGrow: 1,
  maxWidth: 400,
  marginRight: 24
});

const SearchInput = styled(TextField)({
  input: {
    fontSize: 16
  },
  'label div div': {
    left: 16
  }
});

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
  marginTop: 60,
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    display: 'block'
  }
});

const FooterNavGroup = styled.div({
  marginLeft: 100,
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    marginLeft: 0,
    ':not(:last-child)': {
      marginBottom: 48
    }
  }
});

const RecentPosts = styled.div({
  flexGrow: 1,
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    marginBottom: 100
  }
});

const HeaderNav = styled.ul({
  display: 'flex',
  paddingLeft: 0,
  marginLeft: 'auto',
  listStyle: 'none',
  '> li:not(:last-child)': {
    marginRight: 16
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: colors.indigo.base
    }
  }
});

const CategoryDropdown = styled.div({
  paddingTop: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  ul: {
    padding: '12px 16px',
    listStyle: 'none',
    borderRadius: 4,
    backgroundColor: colors.black.lighter,
    color: colors.silver.base,
    whiteSpace: 'nowrap',
    'li:not(:last-child)': {
      marginBottom: 12
    },
    'a:hover': {
      color: colors.indigo.light
    }
  }
});

const CategoryTriangle = styled.div(
  triangle({
    pointingDirection: 'top',
    height: '6px',
    width: '12px',
    foregroundColor: colors.black.lighter
  })
);

const CategoryMenu = styled.li({
  position: 'relative',
  [`:not(:hover) ${CategoryDropdown}`]: {
    display: 'none'
  }
});

const CATEGORIES_IN_NAV = 3;

function getTopicCount(category) {
  return category.wpChildren.nodes.reduce(
    (acc, node) => (node.totalCount ? acc + node.totalCount : acc),
    0
  );
}

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        wp {
          generalSettings {
            description
            title
          }
        }
        companyMenu: wpMenu(databaseId: {eq: 2}) {
          ...MenuFragment
        }
        communityMenu: wpMenu(databaseId: {eq: 3}) {
          ...MenuFragment
        }
        helpMenu: wpMenu(databaseId: {eq: 4}) {
          ...MenuFragment
        }
        # categories for nav
        allWpCategory {
          nodes {
            id
            name
            path
            wpChildren {
              nodes {
                id
                totalCount
              }
            }
          }
        }
        recentPosts: allWpPost(limit: 3) {
          nodes {
            id
            date
            title
            path
            author {
              node {
                name
                slug
                avatar {
                  url
                }
                userMetadata {
                  avatarId {
                    localFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      fragment MenuFragment on WpMenu {
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

  const {title, description} = data.wp.generalSettings;
  const defaultSocialImage = data.site.siteMetadata.siteUrl + '/social.jpg';

  const navCategories = data.allWpCategory.nodes
    .filter((category) => category.wpChildren.nodes.length)
    .sort((a, b) => {
      const aCount = getTopicCount(a);
      const bCount = getTopicCount(b);
      return bCount - aCount;
    });

  return (
    <Fragment>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:700|Source+Sans+Pro:700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://www.apollographql.com/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={defaultSocialImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:site" content="@apollographql" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={defaultSocialImage} />
      </Helmet>
      <Global styles={styles} />
      <Header>
        <HeaderInner>
          <LogoWrapper>
            <LogoLink to="/">
              <StyledApolloIcon />
              <StyledBlogIcon />
            </LogoLink>
          </LogoWrapper>
          <SearchForm action={withPrefix('/search')}>
            <SearchInput
              size="large"
              placeholder="Search Apollo Blog"
              type="search"
              name="q"
              defaultValue={props.defaultSearchValue}
            />
          </SearchForm>
          <HeaderNav>
            {navCategories.slice(0, CATEGORIES_IN_NAV).map((category) => (
              <li key={category.id}>
                <Link to={category.path + 1}>{category.name}</Link>
              </li>
            ))}
            <li>
              <CategoryMenu>
                More...
                <CategoryDropdown>
                  <CategoryTriangle />
                  <ul>
                    {navCategories.slice(CATEGORIES_IN_NAV).map((category) => (
                      <li key={category.id}>
                        <Link to={category.path + 1}>{category.name}</Link>
                      </li>
                    ))}
                  </ul>
                </CategoryDropdown>
              </CategoryMenu>
            </li>
          </HeaderNav>
        </HeaderInner>
      </Header>
      <Wrapper>{props.children}</Wrapper>
      <Footer>
        <Wrapper>
          <SectionHeading>{props.recentPostsTitle}</SectionHeading>
          <FooterInner>
            <RecentPosts>
              {(props.recentPosts || data.recentPosts.nodes).map((post) => (
                <ArchivePost key={post.id} post={post} />
              ))}
            </RecentPosts>
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
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  defaultSearchValue: PropTypes.string,
  recentPosts: PropTypes.array,
  recentPostsTitle: PropTypes.string
};

Layout.defaultProps = {
  recentPostsTitle: 'Recent posts'
};

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

const Wrapper = styled.div({
  maxWidth: BREAKPOINT_LG,
  margin: '0 auto',
  padding: `0 ${WRAPPER_PADDING_X}px`
});

const Header = styled.header({
  marginBottom: 66,
  backgroundColor: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1
});

const HeaderInner = styled(Wrapper)({
  display: 'grid',
  height: 72,
  gridTemplateColumns: '0.75fr 1fr 0.75fr',
  alignItems: 'center',
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    display: 'flex'
  }
});

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'flex-start',
  fontSize: 24,
  color: colors.black.lighter,
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    marginRight: 48
  }
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
  flexGrow: 1
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
        companyMenu: wpMenu(menuId: {eq: 2}) {
          ...MenuFragment
        }
        communityMenu: wpMenu(menuId: {eq: 3}) {
          ...MenuFragment
        }
        helpMenu: wpMenu(menuId: {eq: 4}) {
          ...MenuFragment
        }
        recentPosts: allWpPost(limit: 3) {
          nodes {
            id
            date
            title
            slug
            author {
              # TODO: move to fragment in author component
              name
              slug
              avatar {
                url
              }
              userMetadata {
                avatarId {
                  remoteFile {
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
          <LogoLink to="/">
            <StyledApolloIcon />
            <StyledBlogIcon />
          </LogoLink>
          <SearchForm action={withPrefix('/search')}>
            <SearchInput
              size="large"
              placeholder="Search Apollo Blog"
              type="search"
              name="q"
              defaultValue={props.defaultSearchValue}
            />
          </SearchForm>
        </HeaderInner>
      </Header>
      <Wrapper>{props.children}</Wrapper>
      <Footer>
        <Wrapper>
          <SectionHeading>{props.recentPostsTitle}</SectionHeading>
          <FooterInner>
            <RecentPosts>
              {(props.recentPosts || data.recentPosts.nodes).map(post => (
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

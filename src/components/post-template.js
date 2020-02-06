import Byline from './byline';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import TwitterButton from './twitter-button';
import styled from '@emotion/styled';
import {
  Avatar,
  Category,
  DateText,
  FONT_FAMILY_MONO,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection,
  SidebarSticky,
  SocialIcon,
  SocialIcons,
  TopFold,
  avatarMargins,
  avatarSizes,
  dateTextStyles
} from './ui';
import {IconEmail} from '@apollo/space-kit/icons/IconEmail';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {ReactComponent as IconLinkedin} from '../assets/icons/linkedin.svg';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';
import {IconSingleService} from '@apollo/space-kit/icons/IconSingleService';
import {ReactComponent as IconSlack} from '../assets/icons/slack.svg';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {Link, graphql} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {size} from 'polished';

const BylineWrapper = styled.div({
  display: 'flex',
  marginTop: 32
});

const Categories = styled.div({
  display: 'flex',
  marginTop: 32,
  [Category]: {
    marginRight: 16
  }
});

const FeaturedImage = styled.img({
  width: '100%',
  marginBottom: 90
});

const TwitterHandleWrapper = styled.div({
  display: 'flex',
  paddingLeft: 24,
  marginLeft: 24,
  borderLeft: `1px solid ${colors.grey.lighter}`
});

const TwitterHandle = styled.a({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto 0',
  color: colors.indigo.dark,
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

const largeTextStyles = {
  fontSize: 21,
  lineHeight: '32px'
};

const linkStyles = {
  color: colors.indigo.base,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};

const FULL_IMAGE_HEIGHT = 600;
const FIGCAPTION_MARGIN = 12;

const PostContent = styled.div({
  h2: {
    marginTop: 90
  },
  h3: {
    marginTop: 60,
    marginBottom: 32
  },
  p: {
    ...largeTextStyles,
    marginBottom: 31
  },
  a: linkStyles,
  '.wp-block-image': {
    margin: '90px 0',
    '&.alignfull': {
      img: {
        width: '100%',
        maxWidth: 'none',
        height: FULL_IMAGE_HEIGHT,
        objectFit: 'cover',
        position: 'absolute',
        left: 0
      },
      figcaption: {
        paddingTop: FULL_IMAGE_HEIGHT + FIGCAPTION_MARGIN
      }
    },
    img: {
      maxWidth: '100%'
    },
    figcaption: {
      marginTop: FIGCAPTION_MARGIN,
      fontFamily: FONT_FAMILY_MONO,
      color: colors.grey.lighter,
      lineHeight: 1.5
    }
  }
});

const Divider = styled.div({
  margin: '120px 0',
  color: colors.indigo.base,
  svg: {
    marginRight: 16
  }
});

const AuthorHeader = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const AuthorByline = styled.div({
  marginRight: 'auto',
  h5: dateTextStyles
});

const AuthorBio = styled.div({
  marginTop: 14,
  paddingLeft: avatarSizes.lg + avatarMargins.lg,
  color: colors.grey.base,
  p: {
    ...largeTextStyles,
    ':not(:last-child)': {
      marginBottom: 24
    }
  },
  a: {
    ...linkStyles,
    display: 'inline-flex',
    alignItems: 'center',
    svg: {
      ...size(19),
      marginLeft: 12
    }
  }
});

const NewsletterSignup = styled.div({
  marginTop: 120,
  backgroundColor: colors.silver.light,
  padding: 32,
  borderRadius: 8,
  p: {
    ...largeTextStyles,
    marginTop: 14,
    marginBottom: 32
  }
});

const PostAction = styled(SidebarSection)({
  color: 'white',
  backgroundColor: colors.indigo.dark,
  h3: {
    color: 'inherit'
  }
});

export default function PostTemplate(props) {
  const {
    date,
    title,
    author,
    categories,
    featuredImage,
    content
  } = props.data.wordpress.post;
  const {twitter} = author.userMetadata;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TopFold style={{paddingBottom: 90}}>
        <DateText style={{marginBottom: 12}} date={date} />
        <h1>{title}</h1>
        <BylineWrapper>
          <Byline author={author} />
          {twitter && (
            <TwitterHandleWrapper>
              <TwitterHandle
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconTwitter
                  style={{
                    width: 20,
                    marginRight: 8
                  }}
                />
                @{twitter}
              </TwitterHandle>
            </TwitterHandleWrapper>
          )}
        </BylineWrapper>
        <Categories>
          {categories.nodes.map(category => (
            <Category key={category.id}>{category.name}</Category>
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedImage src={featuredImage.sourceUrl} />
          <PostContent dangerouslySetInnerHTML={{__html: content}} />
          <Divider>
            <IconSingleService />
            <IconSingleService />
            <IconSingleService />
          </Divider>
          <AuthorHeader>
            <Avatar size="lg" src={author.avatar.url} />
            <AuthorByline>
              <h5>Written by</h5>
              <h3>{author.name}</h3>
            </AuthorByline>
            {author.userMetadata.twitter && (
              <TwitterButton href={author.userMetadata.twitter}>
                Follow
              </TwitterButton>
            )}
          </AuthorHeader>
          <AuthorBio>
            <p>{author.description}</p>
            <p>
              <Link to="/author/name">
                Read more by {author.name} <IconProceed />
              </Link>
            </p>
          </AuthorBio>
          <NewsletterSignup>
            <h3>Stay in our orbit</h3>
            <p>
              Sign up for our mailing list and get updates on products, events,
              and more. Oh, and no junk mail. Ever.
            </p>
          </NewsletterSignup>
        </Main>
        <Sidebar>
          <SidebarSticky>
            <NewsletterForm />
            <SidebarSection>
              <SectionHeading>Share article</SectionHeading>
              <SocialIcons>
                <SocialIcon href="#">
                  <IconTwitter />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconFacebook />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconLinkedin />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconSlack />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconEmail />
                </SocialIcon>
              </SocialIcons>
            </SidebarSection>
          </SidebarSticky>
          <SidebarSticky>
            <PostAction>
              <h3>Don&apos;t miss GraphQL Summit 2020!</h3>
            </PostAction>
          </SidebarSticky>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: ID!) {
    wordpress {
      post(id: $id) {
        date
        title
        content
        author {
          name
          description
          avatar {
            url
          }
          userMetadata {
            title
            twitter
          }
        }
        categories {
          nodes {
            id
            slug
            name
          }
        }
        featuredImage {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`;

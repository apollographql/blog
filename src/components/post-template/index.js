import AuthorDetails from './author-details';
import Byline from '../byline';
import Helmet from 'react-helmet';
import Layout from '../layout';
import NewsletterForm, {useNewsletterForm} from '../newsletter-form';
import PostAction from './post-action';
import PostContent from './post-content';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {
  Categories,
  Category,
  DateText,
  InnerWrapper,
  LargeButton,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection,
  SocialIcons,
  TopFold,
  largeInputStyles,
  largeTextStyles
} from '../ui';
import {
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import {IconEmail} from '@apollo/space-kit/icons/IconEmail';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {IconSingleService} from '@apollo/space-kit/icons/IconSingleService';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

const BylineWrapper = styled.div({
  display: 'flex',
  margin: '32px 0'
});

const FeaturedImage = styled.img({
  width: '100%',
  marginBottom: 90,
  borderRadius: 8
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

const Divider = styled.div({
  margin: '120px 0',
  color: colors.indigo.base,
  svg: {
    marginRight: 16
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
    ':not(:last-child)': {
      marginBottom: 32
    }
  }
});

const PostSidebarWrapper = styled.div({
  flexGrow: 0.5
});

const InputRow = styled.div({
  display: 'flex',
  '.mktoForm': {
    flexGrow: 1,
    marginRight: 24,
    '.mktoEmailField': largeInputStyles
  }
});

export default function PostTemplate(props) {
  const newsletterFormProps = useNewsletterForm();

  const {
    path,
    date,
    title,
    author,
    categories,
    featured_media,
    content,
    cta
  } = props.data.wordpressPost;
  const {twitter} = author.acf;

  const shareUrl = 'https://blog.apollographql.com' + path;
  const shareButtonProps = {
    resetButtonStyle: false,
    url: shareUrl
  };

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
          {categories.map(category => (
            <Category key={category.id} category={category} />
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedImage
            src={featured_media.localFile.childImageSharp.original.src}
          />
          <PostContent
            content={content}
            mediaNodes={props.data.allWordpressWpMedia.nodes}
          />
          <Divider>
            <IconSingleService />
            <IconSingleService />
            <IconSingleService />
          </Divider>
          <AuthorDetails author={author} />
          <NewsletterSignup>
            <h3>Stay in our orbit</h3>
            {newsletterFormProps.success ? (
              <p>Success! You&apos;ve signed up for the Apollo newsletter.</p>
            ) : (
              <Fragment>
                <p>
                  Sign up for our mailing list and get updates on products,
                  events, and more. Oh, and no junk mail. Ever.
                </p>
                <InputRow>
                  <form data-formid="1341" />
                  <LargeButton
                    onClick={newsletterFormProps.submitForm}
                    color={colors.indigo.dark}
                  >
                    Subscribe
                  </LargeButton>
                </InputRow>
              </Fragment>
            )}
          </NewsletterSignup>
        </Main>
        <Sidebar>
          <PostSidebarWrapper>
            <NewsletterForm {...newsletterFormProps} />
            <SidebarSection>
              <SectionHeading>Share article</SectionHeading>
              <SocialIcons>
                <TwitterShareButton {...shareButtonProps}>
                  <IconTwitter />
                </TwitterShareButton>
                <FacebookShareButton {...shareButtonProps}>
                  <IconFacebook />
                </FacebookShareButton>
                <LinkedinShareButton {...shareButtonProps}>
                  <LinkedinIcon
                    bgStyle={{fill: 'transparent'}}
                    iconFillColor="currentColor"
                    style={{
                      transform: 'scale(2)',
                      pointerEvents: 'none'
                    }}
                  />
                </LinkedinShareButton>
                <a
                  href={`mailto:?body=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconEmail />
                </a>
              </SocialIcons>
            </SidebarSection>
          </PostSidebarWrapper>
          <PostAction cta={cta} />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($wordpress_id: Int) {
    # get all media nodes for this post to replace images with local files
    allWordpressWpMedia(filter: {post: {eq: $wordpress_id}}) {
      nodes {
        slug
        localFile {
          childImageSharp {
            original {
              src
              width
              height
            }
          }
        }
      }
    }
    # everything we need to render a post
    wordpressPost(wordpress_id: {eq: $wordpress_id}) {
      path
      date
      title
      content
      author {
        name
        description
        avatar_urls {
          wordpress_96
        }
        acf {
          twitter
          title
        }
      }
      categories {
        id
        slug
        name
      }
      featured_media {
        localFile {
          childImageSharp {
            id
            original {
              src
            }
          }
        }
      }
      # cta customization fields
      cta: acf {
        cta_title
        cta_content
        cta_button_text
        cta_link
      }
    }
  }
`;

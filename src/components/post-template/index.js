import AuthorDetails from './author-details';
import Byline from '../byline';
import Divider from './divider';
import Layout from '../layout';
import Metas from '../Metas';
import NewsletterForm, {
  newsletterInputStyles,
  useNewsletterForm
} from '../newsletter-form';
import Odyssey from '../odyssey';
import PostContent, {ShareButtonContext} from './post-content';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {
  Categories,
  Category,
  DATE_FORMAT,
  DateText,
  InnerWrapper,
  LargeButton,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection,
  SocialIcons,
  TopFold,
  dateTextStyles,
  largeTextStyles,
  linkStyles
} from '../ui';
import {
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import {IconEmail} from '@apollo/space-kit/icons/IconEmail';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';
import {format} from 'date-fns';
import {graphql} from 'gatsby';
import {stripHtmlTags} from '../../utils';

const PostTitle = styled.h1`
  @media (max-width: 400px) {
    font-size: 38px;
  }
`;

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

const LastUpdated = styled.div(dateTextStyles, {
  marginBottom: 32
});

const NewsletterSignup = styled.div({
  marginTop: 120,
  borderRadius: 8,
  overflow: 'hidden',
  p: {
    ...largeTextStyles,
    marginTop: 14,
    ':not(:last-child)': {
      marginBottom: 32
    }
  }
});

const NewsletterSignupInner = styled.div({
  padding: 32,
  backgroundColor: colors.silver.light,
  ':last-child': {backgroundColor: colors.silver.base}
});

const PostFeedback = styled.button(linkStyles, {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0
});

const PostSidebarWrapper = styled.div({
  flexGrow: 0.5
});

const InlineNewsletterForm = styled.form({
  display: 'flex'
});

const EmailInput = styled(TextField)({
  flexGrow: 1,
  marginRight: 24,
  ...newsletterInputStyles,
  input: {
    height: 50,
    fontSize: 18
  }
});

export default function PostTemplate(props) {
  const newsletterFormProps = useNewsletterForm();

  const {
    path,
    date,
    modified,
    title,
    author,
    excerpt,
    categories,
    featuredImage: featuredMedia,
    content
  } = props.data.wpPost;
  const {twitter} = author?.node?.userMetadata ?? {};

  const postTitle = decode(title);
  const description = stripHtmlTags(excerpt);
  const featuredImage =
    featuredMedia?.node?.localFile.childImageSharp.original.src;

  const shareUrl = props.data.site.siteMetadata.siteUrl + path;
  const shareButtonProps = {
    resetButtonStyle: false,
    url: shareUrl
  };

  return (
    <Layout
      recentPosts={props.data.similarPosts.nodes}
      recentPostsTitle="Similar posts"
    >
      <Metas
        title={postTitle}
        description={description}
        featuredImage={featuredImage}
        shareUrl={shareUrl}
      />
      <TopFold style={{paddingBottom: 90}}>
        <DateText style={{marginBottom: 12}} date={date} />
        <PostTitle>{postTitle}</PostTitle>
        <BylineWrapper>
          <Byline author={author.node} />
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
            <Category key={category.id} category={category} />
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          {featuredImage && <FeaturedImage src={featuredImage} />}
          {modified !== date && (
            <LastUpdated>
              Last updated {format(new Date(modified), DATE_FORMAT)}
            </LastUpdated>
          )}
          <ShareButtonContext.Provider value={shareUrl}>
            <PostContent content={content} />
          </ShareButtonContext.Provider>
          <Divider />
          <AuthorDetails author={author.node} />
          <NewsletterSignup>
            <NewsletterSignupInner>
              <h3>Stay in our orbit!</h3>
              {newsletterFormProps.success ? (
                <p>
                  Mission accomplished! You&apos;ve signed up for the Apollo
                  newsletter.
                </p>
              ) : (
                <Fragment>
                  <p>
                    Become an Apollo insider and get first access to new
                    features, best practices, and community events. Oh, and no
                    junk mail. Ever.
                  </p>
                  <InlineNewsletterForm
                    onSubmit={newsletterFormProps.handleSubmit}
                  >
                    <EmailInput
                      name="email"
                      type="email"
                      size="large"
                      required
                      placeholder="Enter your email"
                    />
                    <LargeButton type="submit" color={colors.indigo.dark}>
                      Subscribe
                    </LargeButton>
                  </InlineNewsletterForm>
                </Fragment>
              )}
            </NewsletterSignupInner>
            <NewsletterSignupInner>
              <h3>Make this article better!</h3>
              <p>
                Was this post helpful? Have suggestions? Consider{' '}
                <PostFeedback
                  onClick={() => {
                    if (window.freddyWidget) {
                      window.freddyWidget.show();
                    }
                  }}
                >
                  leaving feedback
                </PostFeedback>{' '}
                so we can improve it for future readers ✨.
              </p>
            </NewsletterSignupInner>
          </NewsletterSignup>
        </Main>
        <Sidebar>
          <PostSidebarWrapper>
            <Odyssey />
            <NewsletterForm {...newsletterFormProps} />
            <SidebarSection>
              <SectionHeading>Share article</SectionHeading>
              <SocialIcons>
                <TwitterShareButton title={postTitle} {...shareButtonProps}>
                  <IconTwitter />
                </TwitterShareButton>
                <FacebookShareButton quote={postTitle} {...shareButtonProps}>
                  <IconFacebook />
                </FacebookShareButton>
                <LinkedinShareButton title={postTitle} {...shareButtonProps}>
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
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: String, $categoriesIn: [String]) {
    site {
      siteMetadata {
        siteUrl
      }
    }

    # everything we need to render a post
    wpPost(id: {eq: $id}) {
      path
      date(formatString: "l")
      modified(formatString: "l")
      title
      excerpt
      content
      author {
        node {
          ...UserFragment
        }
      }
      categories {
        nodes {
          id
          name
          path
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              id
              original {
                src
              }
            }
          }
        }
      }
    }

    # query posts that share categories with the current post
    similarPosts: allWpPost(
      limit: 3
      filter: {
        id: {ne: $id}
        categories: {nodes: {elemMatch: {id: {in: $categoriesIn}}}}
      }
    ) {
      nodes {
        id
        date
        title
        path
        author {
          node {
            ...UserFragment
          }
        }
      }
    }
  }

  fragment UserFragment on WpUser {
    name
    slug
    description
    avatar {
      url
    }
    userMetadata {
      title
      twitter
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
`;

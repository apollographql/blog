import AuthorDetails from './author-details';
import Byline from '../byline';
import Divider from './divider';
import Helmet from 'react-helmet';
import Layout from '../layout';
import NewsletterForm, {
  newsletterInputStyles,
  useNewsletterForm
} from '../newsletter-form';
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
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';
import {graphql} from 'gatsby';
import {stripHtmlTags} from '../../utils';

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
    title,
    author,
    excerpt,
    categories,
    featured_media,
    content,
    acf
  } = props.data.wordpressPost;
  const {twitter} = author.acf;

  const description = stripHtmlTags(excerpt);
  const shareUrl = 'https://www.apollographql.com/blog' + path;
  const shareButtonProps = {
    resetButtonStyle: false,
    url: shareUrl
  };

  return (
    <Layout
      recentPosts={props.data.similarPosts.nodes}
      recentPostsTitle="Similar posts"
    >
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {featured_media && (
          <meta property="og:image" content={featured_media.localFile.url} />
        )}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {featured_media && (
          <meta name="twitter:image" content={featured_media.localFile.url} />
        )}
      </Helmet>
      <TopFold style={{paddingBottom: 90}}>
        <DateText style={{marginBottom: 12}} date={date} />
        <h1>{decode(title)}</h1>
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
          {featured_media && (
            <FeaturedImage
              src={featured_media.localFile.childImageSharp.original.src}
            />
          )}
          <PostContent
            content={content}
            mediaNodes={props.data.allWordpressWpMedia.nodes}
          />
          <Divider />
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
                <InlineNewsletterForm
                  onSubmit={newsletterFormProps.handleSubmit}
                >
                  <EmailInput
                    name="email"
                    type="email"
                    size="large"
                    required
                    placeholder="Email address"
                  />
                  <LargeButton type="submit" color={colors.indigo.dark}>
                    Subscribe
                  </LargeButton>
                </InlineNewsletterForm>
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
          <PostAction cta={acf.cta || props.data.defaultCta} />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($wordpress_id: Int, $categoriesIn: [String]) {
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
      excerpt
      content
      author {
        name
        slug
        description
        avatar_urls {
          wordpress_96
        }
        acf {
          twitter
          title
          avatar {
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
      categories {
        id
        slug
        name
      }
      featured_media {
        localFile {
          url
          childImageSharp {
            id
            original {
              src
            }
          }
        }
      }

      # retrieve post CTA
      acf {
        cta {
          ...CtaFragment
        }
      }
    }

    defaultCta: wordpressWpCta(acf: {default: {eq: true}}) {
      ...CtaFragment
    }

    # query posts that share categories with the current post
    similarPosts: allWordpressPost(
      limit: 3
      filter: {
        wordpress_id: {ne: $wordpress_id}
        categories: {elemMatch: {id: {in: $categoriesIn}}}
      }
    ) {
      nodes {
        date
        title
        slug
        author {
          name
          slug
          avatar_urls {
            wordpress_96
          }
          acf {
            avatar {
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

  fragment CtaFragment on wordpress__wp_cta {
    title
    excerpt
    acf {
      cta_button_url
      cta_button_text
    }
  }
`;

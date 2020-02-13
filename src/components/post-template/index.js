import AuthorDetails, {linkStyles} from './author-details';
import Byline from '../byline';
import Helmet from 'react-helmet';
import Layout from '../layout';
import NewsletterForm, {useNewsletterForm} from '../newsletter-form';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import parse, {domToReact} from 'html-react-parser';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  FONT_FAMILY_MONO,
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
import {HEADING_COLOR} from '../../styles';
import {IconEmail} from '@apollo/space-kit/icons/IconEmail';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {IconSingleService} from '@apollo/space-kit/icons/IconSingleService';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

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

const PostContent = styled.div({
  color: HEADING_COLOR,
  h2: {
    marginTop: 90
  },
  h3: {
    marginTop: 60,
    marginBottom: 32
  },
  [['p', 'li']]: {
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
        position: 'absolute',
        left: 0
      }
    },
    img: {
      maxWidth: '100%'
    },
    figcaption: {
      marginTop: 12,
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

const PostActionWrapper = styled.div({
  display: 'flex',
  flexGrow: 1
});

const PostAction = styled(SidebarSection)({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  marginTop: 'auto',
  marginRight: -40,
  borderRadius: 12,
  color: 'white',
  backgroundColor: colors.indigo.dark,
  position: 'sticky',
  bottom: 90,
  h3: {
    color: 'inherit',
    marginBottom: 16
  },
  p: {
    marginBottom: 32
  }
});

const InputRow = styled.div({
  display: 'flex',
  '.mktoForm': {
    flexGrow: 1,
    marginRight: 24,
    '.mktoEmailField': largeInputStyles
  }
});

function findLocalFile(mediaNodes, src) {
  for (const {slug, localFile} of mediaNodes) {
    if (src.toLowerCase().includes(slug)) {
      return localFile;
    }
  }
}

function getDomNodeText(domNode) {
  let text = '';

  function addText(children) {
    for (const child of children) {
      switch (child.type) {
        case 'text':
          text += child.data;
          break;
        case 'tag':
          text += '<' + child.name + '>';
          addText(child.children);
          text += '</' + child.name + '>';
          break;
        default:
      }
    }
  }

  addText(domNode.children);

  return text;
}

export default function PostTemplate(props) {
  const newsletterFormProps = useNewsletterForm();

  const {
    path,
    date,
    title,
    author,
    categories,
    featured_media,
    content
  } = props.data.wordpressPost;
  const mediaNodes = props.data.allWordpressWpMedia.nodes;
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
            <Category key={category.id}>{category.name}</Category>
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedImage
            src={featured_media.localFile.childImageSharp.original.src}
          />
          <PostContent>
            {parse(content, {
              replace(domNode) {
                switch (domNode.name) {
                  case 'img': {
                    // replace images from wordpress with their local counterparts
                    const localFile = findLocalFile(
                      mediaNodes,
                      domNode.attribs.src
                    );
                    if (localFile) {
                      return (
                        <img src={localFile.childImageSharp.original.src} />
                      );
                    }
                    break;
                  }
                  case 'figcaption': {
                    const parentClass = domNode.parent.attribs.class;
                    if (parentClass && parentClass.includes('alignfull')) {
                      const localFile = findLocalFile(
                        mediaNodes,
                        domNode.prev.attribs.src
                      );
                      if (localFile) {
                        const {
                          width,
                          height
                        } = localFile.childImageSharp.original;
                        const aspectRatio = width / height;
                        return (
                          <figcaption
                            style={{
                              paddingTop: `calc(var(--rw, 100vw) / ${aspectRatio})`
                            }}
                          >
                            {domToReact(domNode.children)}
                          </figcaption>
                        );
                      }
                    }
                    break;
                  }
                  case 'code': {
                    const className = domNode.attribs.class;
                    if (className && className.startsWith('language-')) {
                      const text = getDomNodeText(domNode);
                      const html = Prism.highlight(
                        text,
                        Prism.languages.javascript,
                        'javascript'
                      );
                      return <Fragment>{parse(html)}</Fragment>;
                    }
                    break;
                  }
                  default:
                }
              }
            })}
          </PostContent>
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
          <PostActionWrapper>
            <PostAction>
              <h3>Don&apos;t miss GraphQL Summit 2020!</h3>
              <p>
                Get your ticket now for an earlybird price of just $45! Rates
                will increase on Feb 1, 2020.
              </p>
              <LargeButton
                color={colors.white}
                style={{color: colors.indigo.dark}}
              >
                Buy tickets
              </LargeButton>
            </PostAction>
          </PostActionWrapper>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: String) {
    allWordpressWpMedia {
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
    wordpressPost(id: {eq: $id}) {
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
    }
  }
`;

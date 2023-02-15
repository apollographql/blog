import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import parse, {domToReact} from 'html-react-parser';
import styled from '@emotion/styled';
import {
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  FONT_FAMILY_MONO,
  WRAPPER_PADDING_X,
  largeTextStyles,
  linkStyles
} from '../ui';
import {Button} from '@apollo/space-kit/Button';
import {HEADINGS, HEADING_COLOR} from '../../styles';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {TwitterShareButton} from 'react-share';
import {colors} from '@apollo/space-kit/colors';
import {outdent} from 'outdent';

// load prism languages after prism import
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

const DOUBLE_WRAPPER_PADDING_X = WRAPPER_PADDING_X * 2;
const ALIGNFULL_WIDTH = 'var(--rw, 100vw)';

const ANCHOR_SIZE = 16;
const ANCHOR_OFFSET = 8;
const CLICK_PAD = 20;

const Wrapper = styled.div({
  color: HEADING_COLOR,
  [HEADINGS]: {
    display: 'block',
    position: 'relative',
    '.aal_anchor': {
      visibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      left: -(ANCHOR_SIZE + ANCHOR_OFFSET + CLICK_PAD),
      paddingLeft: CLICK_PAD,
      paddingTop: 14,
      paddingRight: ANCHOR_OFFSET,
      paddingBottom: CLICK_PAD,
      svg: {
        width: ANCHOR_SIZE,
        height: ANCHOR_SIZE
      }
    },
    '&:hover .aal_anchor': {
      visibility: 'visible'
    }
  },
  h2: {
    marginTop: 90
  },
  h3: {
    marginTop: 60,
    marginBottom: 32,
    '.aal_anchor': {
      paddingTop: 6
    }
  },
  [['p', 'li']]: {
    ...largeTextStyles,
    marginBottom: 32
  },
  'li li:first-child': {
    marginTop: 32
  },
  a: linkStyles,
  '.wp-block-image': {
    margin: '90px 0',
    '&.alignfull': {
      width: ALIGNFULL_WIDTH,
      marginLeft: `calc(min(${
        BREAKPOINT_LG - DOUBLE_WRAPPER_PADDING_X
      }px - ${ALIGNFULL_WIDTH}, -${DOUBLE_WRAPPER_PADDING_X}px) / 2)`,
      position: 'relative',
      img: {
        width: '100%'
      }
    },
    img: {
      maxWidth: '100%',
      height: 'auto'
    },
    figcaption: {
      marginTop: 12,
      fontFamily: FONT_FAMILY_MONO,
      color: colors.grey.lighter,
      lineHeight: 1.5
    },
    [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
      margin: '60px 0'
    },
    '.alignright': {
      float: 'right'
    },
    '.alignleft': {
      float: 'left'
    }
  },
  [[
    'pre.wp-block-code',
    'pre.wp-block-prismatic-blocks',
    'pre.wp-block-preformatted'
  ]]: {
    margin: '60px 0',
    padding: '1em',
    borderRadius: 8,
    backgroundColor: colors.silver.light,
    overflow: 'auto',
    fontSize: `calc(${largeTextStyles.fontSize}px * 0.9)`,
    lineHeight: 1.3,
    '.token': {
      [['&.comment', '&.prolog', '&.doctype', '&.cdata']]: {
        color: colors.grey.light
      },
      '&.punctuation': {
        color: colors.grey.base
      },
      [[
        '&.property',
        '&.tag',
        '&.boolean',
        '&.number',
        '&.constant',
        '&.symbol',
        '&.deleted',
        '&.class-name',
        '&.function'
      ]]: {
        color: colors.pink.base
      },
      [[
        '&.selector',
        '&.attr-name',
        '&.string',
        '&.char',
        '&.builtin',
        '&.inserted'
      ]]: {
        color: colors.teal.dark
      },
      [['&.atrule', '&.attr-value', '&.keyword']]: {
        color: colors.indigo.base
      },
      [['&.regex', '&.important', '&.variable']]: {
        color: colors.yellow.base
      }
    }
  },
  '& :not(pre) > code': {
    padding: '.1em .3em',
    borderRadius: '.3em',
    fontSize: '0.9em',
    color: colors.pink.base,
    backgroundColor: colors.silver.base
  },
  hr: {
    margin: '60px 0'
  },
  blockquote: {
    margin: '90px 0',
    paddingLeft: 60,
    fontFamily: FONT_FAMILY_MONO,
    color: colors.grey.base,
    position: 'relative',
    '::before': {
      content: "'“'",
      color: colors.silver.base,
      fontSize: 280,
      lineHeight: 1,
      position: 'absolute',
      top: -90,
      left: 0,
      zIndex: -1
    },
    cite: {
      display: 'block',
      marginBottom: '1em'
    },
    [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
      margin: '60px 0',
      paddingLeft: 40
    }
  },
  '.wp-block-pullquote': {
    margin: 0
  },
  '.wp-block-embed-youtube': {
    margin: 0,
    iframe: {
      width: '100%'
    }
  },
  '.wp-block-group': {
    details: {
      ...largeTextStyles,
      margin: '60px 0',
      [['summary + *', '> :first-child:not(summary)']]: {
        marginTop: 24
      }
    }
  }
});

function reduceTextNodes(children) {
  return children.reduce((acc, node) => {
    if (node.type === 'text') {
      return [...acc, node.data];
    } else if (Array.isArray(node.children)) {
      return [...acc, ...reduceTextNodes(node.children)];
    }
    return acc;
  }, []);
}

export const ShareButtonContext = createContext();

function ShareButton(props) {
  const shareUrl = useContext(ShareButtonContext);
  return (
    <TwitterShareButton resetButtonStyle={false} url={shareUrl} {...props} />
  );
}

function replace(domNode) {
  switch (domNode.name) {
    case 'script': {
      if (
        domNode.attribs.src ===
          'https://embeddable-explorer.cdn.apollographql.com/_latest/embeddable-explorer.umd.production.min.js' &&
        typeof window !== 'undefined'
      ) {
        const script = document.createElement('script');
        script.src = domNode.attribs.src;
        script.onload = () => {
          if (window.EmbeddedExplorer) {
            new window.EmbeddedExplorer({
              target: '#embedded-explorer',
              graphRef: 'apollo-platform@main',
              persistExplorerState: true,
              initialState: {
                document: outdent`
                  # Fetches basic details about a single Studio graph
                  # by its ID.
                  #
                  # By default, this fetches details for the
                  # \`apollo-platform\` graph and its \`main\` variant, 
                  # which you're currently querying! You can provide a 
                  # different graph ID in the Variables panel.
                  #
                  # ⚠️ If you provide a non-public graph ID, you
                  #   need to provide a valid API key in the
                  #   X-API-KEY header!
                  query GetGraph($graphId: ID!, $name: String!) {
                    graph(id: $graphId) {
                      id
                      title
                      myRole # Null if querying a public graph anonymously
                      variant(name: $name) {
                        id
                        url
                      }
                    }
                  }
                `,
                variables: {
                  graphId: 'apollo-platform',
                  name: 'main'
                },
                headers: {
                  'apollographql-client-name': 'explorer',
                  'apollographql-client-version': '1.0'
                },
                displayOptions: {
                  showHeadersAndEnvVars: true,
                  docsPanelState: 'closed',
                  theme: 'dark'
                }
              }
            });
          }
        };
        document.head.appendChild(script);
      }
      break;
    }
    case 'blockquote':
      return (
        <blockquote>
          {domToReact(domNode.children)}
          {domNode.parent?.attribs.class.includes('wp-block-pullquote') && (
            <Button
              as={
                <ShareButton
                  title={reduceTextNodes(domNode.children).join('')}
                />
              }
              icon={
                <IconTwitter
                  style={{
                    color: colors.silver.darker,
                    height: 16,
                    marginRight: 8
                  }}
                />
              }
            >
              Tweet
            </Button>
          )}
        </blockquote>
      );
    case 'div':
      if (
        domNode.attribs.class?.includes('gatsby-image-wrapper') &&
        domNode.parent.attribs.class?.includes('alignfull')
      ) {
        return <>{domToReact(domNode.children)}</>;
      } else if (domNode.attribs.class === 'wp-block-group__inner-container') {
        return <details>{domToReact(domNode.children, {replace})}</details>;
      }
      break;
    default:
  }
}

export default function PostContent(props) {
  if (!props.content) {
    return null;
  }

  const content = props.content
    .replace(/<br>/g, '\n')
    .replace(
      /<pre class="wp-block-preformatted">([\s\S]*?)<\/pre>/g,
      (match, text) => `<pre class="wp-block-preformatted">${text}</pre>`
    )
    .replace(
      /<code class="language-([a-z]*)">([\s\S]*?)<\/code>/g,
      (match, language, text) => {
        const grammar = Prism.languages[language];
        if (!grammar) {
          return `<code>${text}</code>`;
        }

        const html = Prism.highlight(text, grammar, language);
        return `<code class="language-${language}">${html}</code>`;
      }
    )
    .replace(
      /<code>([\s\S]*?)<\/code>/g,
      (match, text) => `<code>${text}</code>`
    );

  return <Wrapper>{parse(content, {replace})}</Wrapper>;
}

PostContent.propTypes = {
  content: PropTypes.string
};

import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import parse, {domToReact, htmlToDOM} from 'html-react-parser';
import styled from '@emotion/styled';
import {
  BREAKPOINT_LG,
  FONT_FAMILY_MONO,
  WRAPPER_PADDING_X,
  largeTextStyles,
  linkStyles
} from '../ui';
import {HEADING_COLOR} from '../../styles';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {TwitterShareButton} from 'react-share';
import {colors} from '@apollo/space-kit/colors';

// load prism languages after prism import
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import {Button} from '@apollo/space-kit/Button';

const DOUBLE_WRAPPER_PADDING_X = WRAPPER_PADDING_X * 2;
const ALIGNFULL_WIDTH = 'var(--rw, 100vw)';

const Wrapper = styled.div({
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
      width: ALIGNFULL_WIDTH,
      marginLeft: `calc(min(${
        BREAKPOINT_LG - DOUBLE_WRAPPER_PADDING_X
      }px - ${ALIGNFULL_WIDTH}, -${DOUBLE_WRAPPER_PADDING_X}px) / 2)`,
      position: 'relative'
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
  },
  [[
    'pre[class*="language-"]',
    'pre.wp-block-code',
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
    }
  },
  '.wp-block-embed-youtube': {
    margin: 0,
    iframe: {
      width: '100%'
    }
  }
});

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

function renderContent(content, shareUrl) {
  return parse(content, {
    replace(domNode) {
      switch (domNode.name) {
        case 'blockquote':
          return (
            <blockquote>
              {domToReact(domNode.children)}
              <Button
                as={
                  <TwitterShareButton
                    resetButtonStyle={false}
                    url={shareUrl}
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
            </blockquote>
          );

        case 'code':
          return (
            <code>
              {domToReact(
                domNode.children.flatMap((child) => htmlToDOM(child.data))
              )}
            </code>
          );
        case 'div': {
          if (
            domNode.attribs.class?.includes('gatsby-image-wrapper') &&
            domNode.parent.attribs.class?.includes('alignfull')
          ) {
            return <>{domToReact(domNode.children)}</>;
          }
          break;
        }
        case 'pre':
          // use prism on blocks created with prismatic
          if (domNode.attribs.class === 'wp-block-prismatic-blocks') {
            const [child] = domNode.children;
            if (child.name === 'code') {
              const className = child.attribs.class;
              if (className && className.startsWith('language-')) {
                // reduce the codeblock into a single text node to
                // account for incorrect rendering of JSX nodes
                const text = getDomNodeText(child);
                const language = className.slice(className.indexOf('-') + 1);

                // highlight the code
                const grammar = Prism.languages[language];
                if (grammar) {
                  const html = Prism.highlight(text, grammar, language);

                  // re-parse the highlighted HTML and put it back in
                  // its place
                  return (
                    <pre className={className}>
                      <code className={className}>{parse(html)}</code>
                    </pre>
                  );
                }
              }
            }
          }
          break;
        default:
      }
    }
  });
}

export default function PostContent(props) {
  return <Wrapper>{renderContent(props.content, props.shareUrl)}</Wrapper>;
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired
};

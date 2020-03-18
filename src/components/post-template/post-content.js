import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import parse, {domToReact} from 'html-react-parser';
import styled from '@emotion/styled';
import {FONT_FAMILY_MONO, largeTextStyles, linkStyles} from '../ui';
import {HEADING_COLOR} from '../../styles';
import {colors} from '@apollo/space-kit/colors';

// load prism languages after prism import
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import Divider from './divider';

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
  },
  [['pre[class*="language-"]', 'pre.wp-block-preformatted']]: {
    margin: '60px 0',
    padding: '1em',
    borderRadius: 8,
    backgroundColor: colors.silver.light,
    overflow: 'auto',
    fontSize: 'calc(21px * 0.9)',
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

function renderContent(content, mediaNodes) {
  return parse(content, {
    replace(domNode) {
      switch (domNode.name) {
        case 'img': {
          // replace images from wordpress with their local counterparts
          const localFile = findLocalFile(mediaNodes, domNode.attribs.src);
          if (localFile && localFile.childImageSharp) {
            return <img src={localFile.childImageSharp.original.src} />;
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
            if (localFile && localFile.childImageSharp) {
              const {width, height} = localFile.childImageSharp.original;
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
        case 'hr':
          return <Divider />;
        default:
      }
    }
  });
}

export default function PostContent(props) {
  return <Wrapper>{renderContent(props.content, props.mediaNodes)}</Wrapper>;
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
  mediaNodes: PropTypes.array.isRequired
};

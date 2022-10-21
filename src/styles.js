import {colors} from '@apollo/space-kit/colors';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export const HEADING_COLOR = colors.black.lighter;

const ANCHOR_SIZE = 16;
const ANCHOR_OFFSET = 8;

export default {
  body: {
    color: colors.grey.dark,
    backgroundColor: 'white'
  },
  [[...HEADINGS, 'p', 'ul', 'ol']]: {
    margin: 0
  },
  [HEADINGS]: {
    color: HEADING_COLOR,
    display: 'flex',
    '.aal_anchor': {
      visibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      paddingRight: ANCHOR_OFFSET,
      marginLeft: -(ANCHOR_SIZE + ANCHOR_OFFSET),
      svg: {
        width: ANCHOR_SIZE,
        height: ANCHOR_SIZE
      }
    },
    '&:hover .aal_anchor': {
      visibility: 'visible'
    }
  },
  [['h1', 'h2', 'h3']]: {
    fontWeight: 700
  },
  [['h2', 'h3', 'h4']]: {
    fontWeight: 700
  },
  [['h5', 'h6']]: {
    fontWeight: 400
  },
  h1: {
    fontSize: 56,
    lineHeight: 8 / 7
  },
  h2: {
    marginBottom: 32,
    fontSize: 38,
    lineHeight: 23 / 19
  },
  h3: {
    fontSize: 28,
    lineHeight: 9 / 7
  },
  h4: {
    marginBottom: 8,
    fontSize: 21,
    lineHeight: 10 / 7
  },
  [['h5', 'p']]: {
    fontSize: '1rem',
    lineHeight: 1.5
  },
  h6: {
    fontSize: 13,
    lineHeight: '20px'
  }
};

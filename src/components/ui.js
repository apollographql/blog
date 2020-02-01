import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {colors} from '@apollo/space-kit/colors';
import {format} from 'date-fns';
import {size, transparentize} from 'polished';

const FONT_FAMILY_MONO = "'Source Code Pro', Menlo, monospace";

const DateTextInner = styled.h6({
  marginBottom: 4,
  fontFamily: FONT_FAMILY_MONO,
  color: colors.grey.light,
  textTransform: 'uppercase',
  letterSpacing: 2
});

export function DateText({date, ...props}) {
  return (
    <DateTextInner {...props}>
      {format(new Date(date), 'MMMM d, yyyy')}
    </DateTextInner>
  );
}

DateText.propTypes = {
  date: PropTypes.string.isRequired
};

export const PostImage = styled.img({
  width: '100%',
  marginBottom: 24,
  borderRadius: 4,
  objectFit: 'cover'
});

const ExcerptTextInner = styled.p({
  marginBottom: 16,
  fontSize: 13
});

export function ExcerptText({excerpt, ...props}) {
  return (
    <ExcerptTextInner
      {...props}
      dangerouslySetInnerHTML={{__html: excerpt.replace(/(<([^>]+)>)/gi, '')}}
    />
  );
}

ExcerptText.propTypes = {
  excerpt: PropTypes.string.isRequired
};

export const SectionHeading = styled.h3({
  display: 'flex',
  alignItems: 'center',
  fontFamily: FONT_FAMILY_MONO,
  letterSpacing: 3,
  textTransform: 'uppercase',
  svg: {
    ...size(18),
    marginRight: 12,
    color: colors.indigo.base
  }
});

export const Category = styled.button(props => {
  const {dark, base, lighter, lightest} = colors.indigo;
  const styles = {
    display: 'inline-block',
    padding: '6px 12px',
    border: `1px solid ${lighter}`,
    borderRadius: 4,
    fontFamily: FONT_FAMILY_MONO,
    lineHeight: 1,
    color: dark,
    textTransform: 'uppercase',
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      borderColor: base,
      backgroundColor: transparentize(0.5, lightest)
    },
    ':active': {
      backgroundColor: lightest
    }
  };

  if (props.size === 'small') {
    return {
      ...styles,
      padding: '1px 6px',
      fontSize: 13,
      lineHeight: '18px'
    };
  }

  return styles;
});

const SIDEBAR_WIDTH = 262;
const SIDEBAR_MARGIN = 127;

export const TopFold = styled.div({
  width: `calc(100% - ${SIDEBAR_WIDTH + SIDEBAR_MARGIN}px)`
});

export const InnerWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flexGrow: 1
});

export const Main = styled.main({
  flexGrow: 1
});

export const Sidebar = styled.aside({
  flexShrink: 0,
  width: 262,
  marginLeft: 127,
  position: 'sticky',
  top: 74
});

export const SidebarSection = styled.div({
  ':not(:last-child)': {
    marginBottom: 90
  }
});

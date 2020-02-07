import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {format} from 'date-fns';
import {size, transparentize} from 'polished';

export const FONT_FAMILY_MONO = "'Source Code Pro', Menlo, monospace";

export const dateTextStyles = {
  fontFamily: FONT_FAMILY_MONO,
  color: colors.grey.light,
  textTransform: 'uppercase',
  letterSpacing: 2
};

const DateTextInner = styled.h6({
  ...dateTextStyles,
  marginBottom: 4
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

export const SectionHeading = styled.h4({
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
  flexGrow: 1
});

export const Main = styled.main({
  flexGrow: 1,
  width: 0
});

export const Sidebar = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 360,
  marginLeft: 104
});

export const SidebarSection = styled.div({
  padding: 24,
  marginTop: -24,
  borderRadius: 12,
  backgroundColor: 'white',
  ':not(:last-child)': {
    marginBottom: 90
  }
});

const SidebarStickyOuter = styled.div({
  flexGrow: 1,
  ':not(:last-child)': {
    marginBottom: 90
  }
});

const SidebarStickyInner = styled.div({
  position: 'sticky',
  top: 90
});

export function SidebarSticky(props) {
  return (
    <SidebarStickyOuter>
      <SidebarStickyInner {...props} />
    </SidebarStickyOuter>
  );
}

export const SocialIcons = styled.div({
  display: 'flex',
  marginTop: 16
});

export const SocialIcon = styled.a({
  ...size(24),
  color: '#c2c6d6',
  svg: {
    ...size('100%'),
    fill: 'currentColor'
  },
  ':hover': {
    color: '#7983a7'
  },
  ':not(:last-child)': {
    marginRight: 20
  }
});

export const avatarSizes = {
  sm: 20,
  md: 44,
  lg: 68
};

export const avatarMargins = {
  sm: 8,
  md: 16,
  lg: 29
};

export const Avatar = styled.img(props => ({
  ...size(avatarSizes[props.size]),
  borderRadius: 4,
  marginRight: avatarMargins[props.size],
  objectFit: 'cover'
}));

export const largeTextStyles = {
  fontSize: 21,
  lineHeight: '32px'
};

export const HeadingLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

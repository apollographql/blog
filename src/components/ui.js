import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {format} from 'date-fns';
import {size, transparentize} from 'polished';
import {stripHtmlTags} from '../utils';

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

export const DATE_FORMAT = 'MMMM d, yyyy';

export function DateText({date, ...props}) {
  return (
    <DateTextInner {...props}>
      {format(new Date(date), DATE_FORMAT)}
    </DateTextInner>
  );
}

DateText.propTypes = {
  date: PropTypes.string.isRequired
};

export const postImageStyles = {
  width: '100%',
  marginBottom: 24,
  borderRadius: 4
};

export const PostImage = styled.img({
  ...postImageStyles,
  objectFit: 'cover'
});

const ExcerptTextInner = styled.p({
  marginBottom: 24
});

export function ExcerptText({excerpt, ...props}) {
  return (
    <ExcerptTextInner {...props}>{stripHtmlTags(excerpt)}</ExcerptTextInner>
  );
}

ExcerptText.propTypes = {
  excerpt: PropTypes.string.isRequired
};

export const categoryStyles = {
  whiteSpace: 'nowrap',
  padding: '6px 12px',
  border: `1px solid ${colors.indigo.lighter}`,
  borderRadius: 4,
  fontFamily: FONT_FAMILY_MONO,
  lineHeight: 1,
  textTransform: 'uppercase',
  textDecoration: 'none'
};

export const selectedCategoryStyles = {
  backgroundColor: colors.indigo.dark,
  borderColor: colors.indigo.dark,
  color: 'white'
};

export const categoryInnerStyles = {
  ...categoryStyles,
  color: colors.indigo.dark,
  ':hover': {
    borderColor: colors.indigo.base,
    backgroundColor: transparentize(0.5, colors.indigo.lightest)
  },
  ':active': {
    backgroundColor: colors.indigo.lightest
  }
};

const CategoryInner = styled(Link)(categoryInnerStyles);

const CategoryInnerSmall = styled(CategoryInner)({
  padding: '1px 6px',
  fontSize: 13,
  lineHeight: '18px'
});

export const CategoryNav = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: 16,
  '> :not(:last-child)': {
    marginBottom: 16
  }
});

export function Category({isSmall, category, ...props}) {
  return React.createElement(
    isSmall ? CategoryInnerSmall : CategoryInner,
    {
      to: category.path + 1,
      ...props
    },
    category.name
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  isSmall: PropTypes.bool
};

export const Categories = styled.nav({
  display: 'flex',
  flexWrap: 'wrap',
  margin: -4,
  [['a', 'div']]: {
    margin: 4
  }
});

export const BREAKPOINT_LG = 1220;
export const BREAKPOINT_MD = 900;

export const WRAPPER_PADDING_X = 40;

const SIDEBAR_WIDTH = 312;
const SIDEBAR_MARGIN = 128;

export const TopFold = styled.div({
  width: `calc(100% - ${SIDEBAR_WIDTH + SIDEBAR_MARGIN}px)`,
  [`@media(max-width: ${BREAKPOINT_LG}px)`]: {
    width: 'auto'
  }
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
  width: SIDEBAR_WIDTH,
  marginLeft: SIDEBAR_MARGIN,
  [`@media(max-width: ${BREAKPOINT_LG}px)`]: {
    width: 250,
    marginLeft: SIDEBAR_MARGIN * 0.75
  },
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    display: 'none'
  }
});

export const SectionHeading = styled.h4({
  marginBottom: 48,
  fontFamily: FONT_FAMILY_MONO,
  letterSpacing: 3,
  textTransform: 'uppercase'
});

export const SidebarSection = styled.div({
  [SectionHeading]: {
    marginBottom: 0
  },
  ':not(:last-child)': {
    marginBottom: 90
  }
});

export const SocialIcons = styled.div({
  display: 'flex',
  marginTop: 16,
  [['a', 'button']]: {
    ...size(24),
    padding: 0,
    border: 0,
    cursor: 'pointer',
    color: colors.silver.darker,
    background: 'none',
    overflow: 'hidden',
    svg: {
      ...size('100%'),
      fill: 'currentColor'
    },
    ':hover': {
      color: colors.grey.light
    },
    ':not(:last-child)': {
      marginRight: 20
    }
  }
});

export const largeTextStyles = {
  fontSize: 21,
  lineHeight: '32px'
};

export const linkStyles = {
  color: colors.indigo.base,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};

export const HeadingLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

export function LargeButton({style, ...props}) {
  return (
    <Button
      size="large"
      style={{
        height: 50,
        ...style
      }}
      {...props}
    />
  );
}

LargeButton.propTypes = {
  style: PropTypes.object
};

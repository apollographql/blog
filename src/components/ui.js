import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {Link} from 'gatsby';
import {TextField} from '@apollo/space-kit/TextField';
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
  width: 312,
  marginLeft: 128
});

export const SidebarSection = styled.div({
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

const largeInputHeight = 50;
export const largeInputStyles = {
  height: largeInputHeight,
  fontSize: 18
};

const LargeInputBase = styled(TextField)({
  input: largeInputStyles
});

export function LargeInput(props) {
  return <LargeInputBase size="large" {...props} />;
}

export function LargeButton({style, ...props}) {
  return (
    <Button
      size="large"
      style={{
        height: largeInputHeight,
        ...style
      }}
      {...props}
    />
  );
}

LargeButton.propTypes = {
  style: PropTypes.object
};

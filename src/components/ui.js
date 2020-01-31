import styled from '@emotion/styled';
import {colors, fontFamilyMono} from 'gatsby-theme-apollo-core';
import {size, transparentize} from 'polished';
import {colors as spaceKitColors} from '@apollo/space-kit/colors';

export const DateText = styled.h6({
  marginBottom: 4,
  fontFamily: fontFamilyMono,
  color: colors.text3,
  textTransform: 'uppercase',
  letterSpacing: 2
});

export const PostImage = styled.img({
  width: '100%',
  marginBottom: 24,
  borderRadius: 4,
  objectFit: 'cover'
});

export const Excerpt = styled.p({
  marginBottom: 0,
  fontSize: 13
});

export const SectionHeading = styled.h3({
  display: 'flex',
  alignItems: 'center',
  fontFamily: "'Source Code Pro', Menlo, monospace",
  letterSpacing: 3,
  textTransform: 'uppercase',
  svg: {
    ...size(18),
    marginRight: 12,
    color: spaceKitColors.indigo.base
  }
});

export const Category = styled.button(props => {
  const {base, lightest} = spaceKitColors.indigo;
  const styles = {
    display: 'inline-block',
    padding: '6px 12px',
    border: `1px solid ${colors.primaryLight}`,
    borderRadius: 4,
    fontFamily: fontFamilyMono,
    lineHeight: 1,
    color: colors.primary,
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

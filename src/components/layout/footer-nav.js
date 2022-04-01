import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {BREAKPOINT_MD, largeTextStyles} from '../ui';
import {colors} from '@apollo/space-kit/colors';

const Wrapper = styled.div({
  paddingRight: 0,
  ':not(:last-child)': {
    paddingRight: 48
  },
  [`@media(max-width: ${BREAKPOINT_MD}px)`]: {
    paddingBottom: 48
  }
});

const Heading = styled.h4({
  ...largeTextStyles,
  marginBottom: 16
});

const Links = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});

const Link = styled.a({
  fontSize: 18,
  lineHeight: '28px',
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.light
  },
  ':not(:last-child)': {
    marginBottom: 8
  }
});

export default function FooterNav({category}) {
  const {title, links} = category;

  return (
    <Wrapper>
      <Heading>{title}</Heading>
      <Links>
        {links.map(({text, href}, i) => (
          <Link key={i} href={href}>
            {text}
          </Link>
        ))}
      </Links>
    </Wrapper>
  );
}

FooterNav.propTypes = {
  category: PropTypes.object.isRequired
};

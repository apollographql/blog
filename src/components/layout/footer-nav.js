import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {colors} from '@apollo/space-kit/colors';
import {largeTextStyles} from '../ui';

const Wrapper = styled.div({
  ':not(:last-child)': {
    marginBottom: 48
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

export default function FooterNav(props) {
  return (
    <Wrapper>
      <Heading>{props.menu.name}</Heading>
      <Links>
        {props.menu.menuItems.nodes.map(item => (
          <Link key={item.id} href={item.url}>
            {item.label}
          </Link>
        ))}
      </Links>
    </Wrapper>
  );
}

FooterNav.propTypes = {
  menu: PropTypes.object.isRequired
};

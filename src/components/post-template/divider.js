import React from 'react';
import styled from '@emotion/styled';
import {IconSingleService} from '@apollo/space-kit/icons/IconSingleService';
import {colors} from '@apollo/space-kit/colors';

const Wrapper = styled.div({
  margin: '120px 0',
  color: colors.indigo.base,
  svg: {
    marginRight: 16
  }
});

export default function Divider() {
  return (
    <Wrapper>
      <IconSingleService />
      <IconSingleService />
      <IconSingleService />
    </Wrapper>
  );
}

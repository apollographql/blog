import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {colors} from '@apollo/space-kit/colors';

const StyledButton = styled(Button)({
  width: '100%',
  boxShadow: 'none'
});

export default function Odyssey() {
  return (
    <SidebarSection>
      <SectionHeading>Learn GraphQL Today</SectionHeading>
      <h5 style={{marginBottom: 12}}>
        Take your GraphQL skills to the next level with our free interactive
        courses, videos, quizzes and code challenges on <strong>Odyssey</strong>
        , Apollo&apos;s new official learning platform!
      </h5>
      <StyledButton
        color={colors.indigo.lightest}
        style={{
          height: 40,
          color: colors.indigo.dark
        }}
        as={<a />}
        href="https://odyssey.apollographql.com/?utm_source=blog&utm_medium=sidebar&utm_campaign=blog_sidebar"
        target="_blank"
        rel-="noopener noreferrer"
      >
        Begin your Odyssey now!
      </StyledButton>
    </SidebarSection>
  );
}

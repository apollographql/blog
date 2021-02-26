import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {colors} from '@apollo/space-kit/colors';

const StyledButton = styled(Button)({
  width: '100%',
  color: colors.indigo.dark,
  backgroundColor: colors.indigo.lightest,
  height: 40
});

export default function Odyssey() {
  return (
    <SidebarSection>
      <SectionHeading>Learn GraphQL Today</SectionHeading>
      <h5 style={{marginBottom: 12}}>
        Take your GraphQL skills to the next level with <strong>Odyssey</strong>
        , Apollo&apos;s official learning platform. Try our interactive courses,
        videos, quizzes and code challenges for free!
      </h5>
      <StyledButton
        color={colors.indigo.lightest}
        style={{
          color: colors.indigo.dark,
          width: '100%',
          boxShadow: 'none'
        }}
        as={<a />}
        href="https://odyssey.apollographql.com/?utm_source=blog&utm_medium=sidebar&utm_campaign=blog_sidebar"
        target="_blank"
        rel-="noopener noreferrer"
      >
        Begin your Odyssey Now!
      </StyledButton>
    </SidebarSection>
  );
}

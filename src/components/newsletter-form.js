import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from 'gatsby-theme-apollo-core';

const StyledInput = styled(TextField)({
  marginBottom: 16
});

const StyledButton = styled(Button)({
  width: '100%',
  height: 40
});

export default function NewsletterForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <SidebarSection>
      <form onSubmit={handleSubmit}>
        <SectionHeading>Mailing list</SectionHeading>
        <h5 style={{marginBottom: 24}}>
          Don’t miss a single post! Be the first to hear about meetups and other
          news.
        </h5>
        <StyledInput size="large" placeholder="Your email address" />
        <StyledButton type="submit" color={colors.primary}>
          Subscribe
        </StyledButton>
      </form>
    </SidebarSection>
  );
}

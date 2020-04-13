import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';

const StyledButton = styled(Button)({
  width: '100%',
  marginTop: 16
});

export const newsletterInputStyles = {
  '> :last-child': {
    marginTop: 0
  },
  'label > div': {
    marginTop: 0
  }
};

const StyledInput = styled(TextField)(newsletterInputStyles);

export function useNewsletterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return {
    loading,
    success,
    async handleSubmit(event) {
      event.preventDefault();

      setLoading(true);

      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: event.target.email.value
      });

      if (response.ok) {
        setSuccess(true);
        return;
      }

      setLoading(false);
    }
  };
}

export default function NewsletterForm(props) {
  return (
    <SidebarSection>
      <SectionHeading>Join our community</SectionHeading>
      {props.success ? (
        <h5>
          Mission accomplished! You&apos;ve signed up for the Apollo newsletter.
        </h5>
      ) : (
        <Fragment>
          <h5 style={{marginBottom: 24}}>
            Be the first to learn about new Apollo features, best practices, and
            community events.
          </h5>
          <form onSubmit={props.handleSubmit}>
            <StyledInput
              required
              size="large"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <StyledButton
              type="submit"
              disabled={props.loading}
              color={colors.indigo.dark}
              style={{height: 40}}
            >
              Subscribe
            </StyledButton>
          </form>
        </Fragment>
      )}
    </SidebarSection>
  );
}

NewsletterForm.propTypes = {
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

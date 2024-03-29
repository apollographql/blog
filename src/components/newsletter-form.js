import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {gql, useMutation} from '@apollo/client';

const utmMedium = Cookies.get('utm_medium') || 'website';
const utmSource = Cookies.get('utm_source') || 'direct';
const utmCampaign = Cookies.get('utm_campaign') || '-';
const utmTerm = Cookies.get('utm_term') || '-';

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

const MARKETO_PUSH = gql`
  mutation PushMarketoLead(
    $input: PushMarketoLeadInput!
    $programId: ID!
    $source: String
    $programStatus: String
  ) {
    pushMarketoLead(
      input: $input
      programId: $programId
      source: $source
      programStatus: $programStatus
    )
  }
`;

export function useNewsletterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pushMarketoLead] = useMutation(MARKETO_PUSH);

  return {
    loading,
    success,
    error,
    async handleSubmit(event) {
      event.preventDefault();
      const email = event.target.email.value;

      const isValidEmail =
        /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(email);

      if (!isValidEmail) {
        setError('Please enter a valid email address.');
        return;
      }

      setLoading(true);

      try {
        pushMarketoLead({
          variables: {
            source: 'Email Signup',
            programId: '1172',
            input: {
              email,
              Lead_Source_Most_Recent__c: 'Email Signup',
              UTM_Medium__c: utmMedium,
              UTM_Source__c: utmSource,
              UTM_Campaign__c: utmCampaign,
              UTM_Term__c: utmTerm
            }
          }
        });
      } catch (err) {
        console.log('marketing graph error');
        setLoading(false);
        return false;
      }

      setSuccess(true);
      window.gtag?.('event', 'blog_newsletter_form_submit');
      return;
    }
  };
}

export default function NewsletterForm(props) {
  return (
    <SidebarSection>
      <SectionHeading>Get Apollo updates to your inbox</SectionHeading>
      {props.success ? (
        <h5>
          Mission accomplished! You&apos;ve signed up for the Apollo mailing
          list.
        </h5>
      ) : (
        <Fragment>
          <h5 style={{marginBottom: 24}}>
            Be the first to learn about new Apollo features, best practices, and
            community events.
          </h5>
          {props.error && <p style={{color: 'red'}}>{props.error}</p>}
          <form onSubmit={props.handleSubmit}>
            <StyledInput
              inputAs={<input required />}
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
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

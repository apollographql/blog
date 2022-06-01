import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';

const utmMedium = Cookies.get('utm_medium') || 'website';
const utmSource = Cookies.get('utm_source') || 'direct';
const utmCampaign = Cookies.get('utm_campaign') || '-';
const utmTerm = Cookies.get('utm_term') || '-';

const wwwFunctionsRootPath =
  'https://apollographql-dot-com.netlify.app/.netlify/functions';

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
      const email = event.target.email.value;

      setLoading(true);

      const programResp = await fetch(`${wwwFunctionsRootPath}/program`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 1172
        })
      });

      const programName = await programResp.json();

      const obj = {
        programName,
        source: 'Email Signup',
        lookupField: 'email',
        input: [
          {
            email,
            Lead_Source_Most_Recent__c: 'Email Signup',
            Lead_Source_Detail__c: 'Email Signup Blog',
            UTM_Medium__c: utmMedium,
            UTM_Source__c: utmSource,
            UTM_Campaign__c: utmCampaign,
            UTM_Term__c: utmTerm
          }
        ]
      };

      const response = await fetch(`${wwwFunctionsRootPath}/marketo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });

      if (response.ok) {
        setSuccess(true);
        window.gtag?.('event', 'blog_newsletter_form_submit');
        return;
      }

      setLoading(false);
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
  handleSubmit: PropTypes.func.isRequired
};

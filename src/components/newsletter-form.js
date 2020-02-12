import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';

const HiddenInput = styled.div({
  display: 'none'
});

const StyledButton = styled(Button)({
  width: '100%',
  marginTop: 16
});

export default function NewsletterForm() {
  const [mktoLoaded, setMktoLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.MktoForms2) {
      window.MktoForms2.loadForm(
        '//app-ab16.marketo.com',
        '627-RVJ-941',
        1341,
        form => {
          // remove marketo CSS
          document.getElementById('mktoForms2BaseStyle').remove();
          document.getElementById('mktoForms2ThemeStyle').remove();

          // indicate that the marketo form is loaded
          setMktoLoaded(true);

          form
            .onSuccess(() => {
              setSuccess(true);
              form.getFormElem().hide(); // hide the form on success
              return false; // prevent default behavior (page reload)
            })
            // remove inline form styles
            .getFormElem()
            .removeAttr('style')
            .find('.mktoFieldDescriptor')
            .removeAttr('style')
            .find('.mktoEmailField')
            .removeAttr('style')
            // apply Space Kit styles to the email input
            .addClass(document.querySelector('#spaceKitInput input').className)
            .attr('placeholder', 'Your email address');
        }
      );
    }
  }, []);

  function handleSubmit() {
    if (window.MktoForms2) {
      window.MktoForms2.whenReady(form => {
        form.submit();
      });
    }
  }

  return (
    <SidebarSection>
      <SectionHeading>Mailing list</SectionHeading>
      {success ? (
        <h5>Success! You&apos;ve signed up for the Apollo newsletter.</h5>
      ) : (
        <h5 style={{marginBottom: 24}}>
          Don’t miss a single post! Be the first to hear about meetups and other
          news.
        </h5>
      )}
      <form id="mktoForm_1341" />
      <HiddenInput id="spaceKitInput">
        <TextField size="large" type="hidden" />
      </HiddenInput>
      {mktoLoaded && !success && (
        <StyledButton
          type="submit"
          color={colors.indigo.dark}
          style={{height: 40}}
          onClick={handleSubmit}
        >
          Subscribe
        </StyledButton>
      )}
    </SidebarSection>
  );
}

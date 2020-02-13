import PropTypes from 'prop-types';
import React, {Fragment, useEffect, useState} from 'react';
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

// inspired by https://blog.teknkl.com/multiple-forms-multiple-times/
function mktoFormChain(formEls, onLoaded, onSuccess) {
  const formEl = formEls.shift();
  const {formid} = formEl.dataset;
  formEl.id = 'mktoForm_' + formid;

  window.MktoForms2.loadForm(
    '//app-ab16.marketo.com',
    '627-RVJ-941',
    Number(formid),
    form => {
      form
        .onSuccess(() => {
          onSuccess();
          form.getFormElem().hide(); // hide the form on success
          return false; // prevent default behavior (page reload)
        })
        // remove inline form styles
        .getFormElem()
        .removeAttr('id') // remove the id attr after the form is loaded
        .removeAttr('style')
        .find('.mktoFieldDescriptor')
        .removeAttr('style')
        .find('.mktoEmailField')
        .removeAttr('style')
        // apply Space Kit styles to the email input
        .addClass(document.querySelector('#spaceKitInput input').className)
        .attr('placeholder', 'Your email address');

      if (formEls.length) {
        mktoFormChain(formEls, onLoaded, onSuccess);
      } else {
        onLoaded();
      }
    }
  );
}

export function useNewsletterForm() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.MktoForms2) {
      const formEls = document.querySelectorAll('[data-formid]');
      mktoFormChain(
        Array.from(formEls),
        () => {
          // remove marketo CSS
          document.getElementById('mktoForms2BaseStyle').remove();
          document.getElementById('mktoForms2ThemeStyle').remove();

          setLoading(false); // indicate that all forms have been loaded
        },
        () => {
          setSuccess(true);
        }
      );
    }
  }, []);

  return {
    loading,
    success,
    submitForm() {
      if (window.MktoForms2) {
        window.MktoForms2.whenReady(form => {
          form.submit();
        });
      }
    }
  };
}

export default function NewsletterForm(props) {
  return (
    <SidebarSection>
      <SectionHeading>Mailing list</SectionHeading>
      {props.success ? (
        <h5>Success! You&apos;ve signed up for the Apollo newsletter.</h5>
      ) : (
        <Fragment>
          <h5 style={{marginBottom: 24}}>
            Don’t miss a single post! Be the first to hear about meetups and
            other news.
          </h5>
          <form data-formid="1341" />
        </Fragment>
      )}
      {!props.loading && !props.success && (
        <StyledButton
          type="submit"
          color={colors.indigo.dark}
          style={{height: 40}}
          onClick={props.submitForm}
        >
          Subscribe
        </StyledButton>
      )}
      <HiddenInput id="spaceKitInput">
        <TextField size="large" type="hidden" />
      </HiddenInput>
    </SidebarSection>
  );
}

NewsletterForm.propTypes = {
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired
};

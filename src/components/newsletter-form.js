import React, {useEffect} from 'react';
import {SectionHeading, SidebarSection} from './ui';

// import styled from '@emotion/styled';
// import {Button} from '@apollo/space-kit/Button';
// import {TextField} from '@apollo/space-kit/TextField';
// import {colors} from '@apollo/space-kit/colors';

// const StyledInput = styled(TextField)({
//   marginBottom: 16
// });

// const StyledButton = styled(Button)({
//   width: '100%'
// });

export default function NewsletterForm() {
  useEffect(() => {
    if (window.MktoForms2) {
      window.MktoForms2.loadForm(
        '//app-ab16.marketo.com',
        '627-RVJ-941',
        1341,
        form => {
          form.onSuccess(() => {
            form.getFormElem().hide();
            return false;
          });
        }
      );
    }
  }, []);

  return (
    <SidebarSection>
      <SectionHeading>Mailing list</SectionHeading>
      <h5 style={{marginBottom: 24}}>
        Don’t miss a single post! Be the first to hear about meetups and other
        news.
      </h5>
      <form id="mktoForm_1341" />
      {/* <StyledInput size="large" placeholder="Your email address" />
        <StyledButton
          type="submit"
          color={colors.indigo.dark}
          style={{height: 40}}
        >
          Subscribe
        </StyledButton> */}
    </SidebarSection>
  );
}

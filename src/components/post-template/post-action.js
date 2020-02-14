import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled from '@emotion/styled';
import {IconClose} from '@apollo/space-kit/icons/IconClose';
import {LargeButton, SidebarSection} from '../ui';
import {colors} from '@apollo/space-kit/colors';
import {graphql, useStaticQuery} from 'gatsby';
import {size} from 'polished';
import {trackCustomEvent} from 'gatsby-plugin-google-analytics';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
});

const InnerWrapper = styled(SidebarSection)({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  marginTop: 'auto',
  marginRight: -40,
  borderRadius: 12,
  color: 'white',
  backgroundColor: colors.indigo.dark,
  position: 'sticky',
  bottom: 90,
  h3: {
    color: 'inherit',
    marginBottom: 16
  },
  p: {
    marginBottom: 32
  }
});

const CloseButton = styled.button({
  background: 'none',
  border: 0,
  padding: 4,
  position: 'absolute',
  color: 'inherit',
  cursor: 'pointer',
  top: 16,
  right: 16,
  svg: {
    display: 'block',
    ...size(14)
  },
  ':hover': {
    opacity: 0.8
  }
});

const EVENT_CATEGORY = 'Post CTA';

export default function PostAction(props) {
  const [shown, setShown] = useState(true);
  const data = useStaticQuery(
    graphql`
      {
        wordpressWpCta {
          acf {
            cta_button_text
            cta_content
            cta_link
            cta_title
          }
        }
      }
    `
  );

  if (!shown) {
    return null;
  }

  const defaultCta = data.wordpressWpCta.acf;
  const ctaTitle = props.cta.cta_title || defaultCta.cta_title;
  const buttonText = props.cta.cta_button_text || defaultCta.cta_button_text;

  function handleClose() {
    setShown(false);
    trackCustomEvent({
      category: EVENT_CATEGORY,
      action: 'Close CTA',
      label: ctaTitle
    });
  }

  function handleButtonClick() {
    trackCustomEvent({
      category: EVENT_CATEGORY,
      action: 'Follow link',
      label: buttonText
    });
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <h3>{ctaTitle}</h3>
        <CloseButton onClick={handleClose}>
          <IconClose />
        </CloseButton>
        <p>{props.cta.cta_content || defaultCta.cta_content}</p>
        <LargeButton
          onClick={handleButtonClick}
          color={colors.white}
          style={{color: colors.indigo.dark}}
          as={<a />}
          href={props.cta.cta_link || defaultCta.cta_link}
          target="_blank"
          rel-="noopener noreferrer"
        >
          {buttonText}
        </LargeButton>
      </InnerWrapper>
    </Wrapper>
  );
}

PostAction.propTypes = {
  cta: PropTypes.object.isRequired
};

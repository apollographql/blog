import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled from '@emotion/styled';
import {BREAKPOINT_LG, LargeButton, SidebarSection} from '../ui';
import {IconClose} from '@apollo/space-kit/icons/IconClose';
import {colors} from '@apollo/space-kit/colors';
import {decode} from 'he';
import {size} from 'polished';
import {stripHtmlTags} from '../../utils';
import {trackCustomEvent} from '../../utils';

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
  },
  [`@media(max-width: ${BREAKPOINT_LG}px)`]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
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

  if (!shown) {
    return null;
  }

  const {title, excerpt, ctaSettings} = props.cta;
  const {ctaButtonUrl, ctaButtonText} = ctaSettings;

  function handleClose() {
    setShown(false);
    trackCustomEvent({
      category: EVENT_CATEGORY,
      action: 'Close CTA',
      label: title
    });
  }

  function handleButtonClick() {
    trackCustomEvent({
      category: EVENT_CATEGORY,
      action: 'Follow link',
      label: ctaButtonText
    });
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <h3>{decode(title)}</h3>
        <CloseButton onClick={handleClose}>
          <IconClose />
        </CloseButton>
        <p>{stripHtmlTags(excerpt)}</p>
        <LargeButton
          onClick={handleButtonClick}
          color={colors.white}
          style={{color: colors.indigo.dark}}
          as={<a />}
          href={ctaButtonUrl}
          target="_blank"
          rel-="noopener noreferrer"
        >
          {ctaButtonText}
        </LargeButton>
      </InnerWrapper>
    </Wrapper>
  );
}

PostAction.propTypes = {
  cta: PropTypes.object.isRequired
};

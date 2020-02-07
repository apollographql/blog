import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {colors} from '@apollo/space-kit/colors';
import {size} from 'polished';

const StyledTwitterIcon = styled(IconTwitter)({
  ...size(14),
  color: colors.grey.lighter,
  marginLeft: -8
});

export default function TwitterButton(props) {
  return (
    <Button
      as={<a />}
      color={colors.white}
      icon={<StyledTwitterIcon />}
      style={{fontWeight: 'normal'}}
      {...props}
    />
  );
}

TwitterButton.propTypes = {
  children: PropTypes.node.isRequired
};

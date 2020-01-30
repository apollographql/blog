import PageLayout from '../components/page-layout';
import React from 'react';
import styled from '@emotion/styled';
import {DateText} from '../components/ui';

const HeroImage = styled.img({
  height: 240,
  width: '100%',
  objectFit: 'cover',
  borderRadius: 4
});

export default function Index() {
  return (
    <PageLayout>
      <DateText>November 14, 2019</DateText>
      <h2>What I Learned at GraphQL Summit 2019</h2>
      <HeroImage src="https://spaceholder.cc/800x600" />
    </PageLayout>
  );
}

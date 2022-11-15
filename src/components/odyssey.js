import React from 'react';
import {Button} from '@apollo/space-kit/Button';
import {SectionHeading, SidebarSection} from './ui';
import {colors} from '@apollo/space-kit/colors';
import {trackCustomEvent} from '../utils';

export default function Odyssey() {
  return (
    <SidebarSection>
      <SectionHeading>Learn GraphQL Today</SectionHeading>
      <h5 style={{marginBottom: 12, display: 'block'}}>
        Take your GraphQL skills to the next level with our free interactive
        GraphQL tutorials, videos, quizzes and code challenges on{' '}
        <strong>Odyssey</strong>, Apollo&apos;s new official learning platform!
      </h5>
      <Button
        color={colors.indigo.lightest}
        style={{
          height: 40,
          width: '100%',
          color: colors.indigo.dark,
          boxShadow: 'none'
        }}
        as={<a />}
        href="https://odyssey.apollographql.com/"
        onClick={() => {
          trackCustomEvent({
            category: 'Blog sidebar',
            action: 'Click Odyssey CTA',
            label: 'Blog'
          });
        }}
      >
        Try our GraphQL tutorials now!
      </Button>
    </SidebarSection>
  );
}

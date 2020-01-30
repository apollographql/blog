import Byline from '../components/byline';
import PageLayout from '../components/page-layout';
import React from 'react';
import {
  Category,
  DateText,
  Excerpt,
  PostImage,
  SectionHeading
} from '../components/ui';
import {IconTime} from '@apollo/space-kit/icons/IconTime';

export default function Index() {
  return (
    <PageLayout>
      <DateText style={{marginBottom: 12}}>November 14, 2019</DateText>
      <h2>What I Learned at GraphQL Summit 2019</h2>
      <PostImage style={{height: 240}} src="https://spaceholder.cc/800x600" />
      <Excerpt style={{marginBottom: 24}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua sed do eiusmod tempor incididunt ut
        labore.
      </Excerpt>
      <Byline
        avatar="https://pbs.twimg.com/profile_images/1189363307624288256/euOBSJ5W_400x400.jpg"
        name="Khalil Stemmler"
        title="Developer Advocate"
      />
      <SectionHeading>
        <IconTime />
        Recent
      </SectionHeading>
      <div>
        <PostImage style={{height: 160}} src="https://spaceholder.cc/600x400" />
        <DateText style={{marginBottom: 4}}>November 7, 2019</DateText>
        <h3 style={{marginBottom: 8}}>Roadmap to your data graph</h3>
        <Excerpt style={{marginBottom: 16}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua…
        </Excerpt>
        <Category size="small">Development</Category>
      </div>
    </PageLayout>
  );
}

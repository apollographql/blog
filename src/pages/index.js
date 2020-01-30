import Byline from '../components/byline';
import PageLayout from '../components/page-layout';
import React from 'react';
import {Category, DateText, PostImage, SectionHeading} from '../components/ui';
import {IconTime} from '@apollo/space-kit/icons/IconTime';

export default function Index() {
  return (
    <PageLayout>
      <DateText style={{marginBottom: 12}}>November 14, 2019</DateText>
      <h2>What I Learned at GraphQL Summit 2019</h2>
      <PostImage style={{height: 240}} src="https://spaceholder.cc/800x600" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua sed do eiusmod tempor incididunt ut
        labore.
      </p>
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
        <h3>Roadmap to your data graph</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua…
        </p>
        <Category size="small">Development</Category>
      </div>
    </PageLayout>
  );
}

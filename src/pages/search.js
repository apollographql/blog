import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection
} from '../components/ui';
import {parse} from 'querystring';

export default function Search(props) {
  const {q} = parse(props.location.search.slice(1));
  return (
    <Layout defaultSearchValue={q}>
      <SectionHeading style={{marginBottom: 60}}>Search results</SectionHeading>
      <InnerWrapper>
        <Main>
          <h3>Roadmap to your data graph</h3>
        </Main>
        <Sidebar>
          <SidebarSection>
            <SectionHeading>Filter articles</SectionHeading>
          </SidebarSection>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

Search.propTypes = {
  location: PropTypes.object.isRequired
};

import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import SearchPost from '../components/search-post';
import {Index} from 'elasticlunr';
import {
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection
} from '../components/ui';
import {graphql} from 'gatsby';
import {parse} from 'querystring';

export default function Search(props) {
  const {q: query} = parse(props.location.search.slice(1));
  const index = useMemo(() => Index.load(props.data.siteSearchIndex.index), [
    props.data.siteSearchIndex.index
  ]);

  const results = useMemo(
    () =>
      index.search(query).map(result => index.documentStore.getDoc(result.ref)),
    [index, query]
  );

  return (
    <Layout defaultSearchValue={query}>
      <SectionHeading style={{marginBottom: 60}}>
        Search results ({results.length})
      </SectionHeading>
      <InnerWrapper>
        <Main>
          {results.map(result => (
            <SearchPost term={query} key={result.id} post={result} size="sm" />
          ))}
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
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    siteSearchIndex {
      index
    }
  }
`;

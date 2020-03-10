import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React, {useMemo, useState} from 'react';
import SearchPost from '../components/search-post';
import styled from '@emotion/styled';
import {
  CategoryNav,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection,
  categoryInnerStyles
} from '../components/ui';
import {Index} from 'elasticlunr';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';
import {parse} from 'querystring';

const CategoryButton = styled.button({
  ...categoryInnerStyles,
  cursor: 'pointer',
  outline: 'none',
  '&.selected': {
    color: 'white',
    borderColor: colors.indigo.base,
    backgroundColor: colors.indigo.base
  }
});

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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = useMemo(
    () =>
      Object.entries(
        results
          .flatMap(result => result.categories)
          .reduce(
            (acc, {name}) => ({
              ...acc,
              [name]: name in acc ? acc[name] + 1 : 1
            }),
            {}
          )
      ),
    [results]
  );

  function toggleCategory(category) {
    setSelectedCategory(prevCategory =>
      prevCategory === category ? null : category
    );
  }

  return (
    <Layout defaultSearchValue={query}>
      <SectionHeading style={{marginBottom: 60}}>
        Search results ({results.length})
      </SectionHeading>
      <InnerWrapper>
        <Main>
          {results
            .filter(result =>
              selectedCategory
                ? result.categories.some(
                    category => category.name === selectedCategory
                  )
                : true
            )
            .map(result => (
              <SearchPost
                term={query}
                key={result.id}
                post={result}
                size="sm"
              />
            ))}
        </Main>
        <Sidebar>
          <SidebarSection>
            <SectionHeading>Filter articles</SectionHeading>
            <CategoryNav>
              {categories.map(([category, count]) => (
                <CategoryButton
                  key={category}
                  className={category === selectedCategory && 'selected'}
                  onClick={() => toggleCategory(category)}
                >
                  {category} ({count})
                </CategoryButton>
              ))}
            </CategoryNav>
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

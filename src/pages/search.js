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
  categoryInnerStyles,
  selectedCategoryStyles
} from '../components/ui';
import {Index} from 'elasticlunr';
import {graphql} from 'gatsby';
import {parse} from 'querystring';

const CategoryButton = styled.button({
  ...categoryInnerStyles,
  cursor: 'pointer',
  outline: 'none',
  '&.selected': selectedCategoryStyles
});

export default function Search(props) {
  const {q: query} = parse(props.location.search.slice(1));

  const {siteSearchIndex, allWordpressWpMedia} = props.data;
  const index = useMemo(() => Index.load(siteSearchIndex.index), [
    siteSearchIndex.index
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

  const avatarById = useMemo(() => {
    const avatarIds = results.map(result => result.author.acf.avatar_id);
    return allWordpressWpMedia.nodes
      .filter(media => avatarIds.includes(media.wordpress_id))
      .reduce(
        (acc, media) => ({
          ...acc,
          [media.wordpress_id]: media
        }),
        {}
      );
  }, [allWordpressWpMedia.nodes, results]);

  const filteredResults = useMemo(
    () =>
      results
        .filter(result =>
          selectedCategory
            ? result.categories.some(
                category => category.name === selectedCategory
              )
            : true
        )
        .map(result => ({
          ...result,
          author: {
            ...result.author,
            acf: {
              ...result.author.acf,
              avatar: avatarById[result.author.acf.avatar_id]
            }
          }
        })),
    [avatarById, results, selectedCategory]
  );

  return (
    <Layout defaultSearchValue={query}>
      <SectionHeading style={{marginBottom: 60}}>
        Search results ({filteredResults.length})
      </SectionHeading>
      <InnerWrapper>
        <Main>
          {filteredResults.map(result => (
            <SearchPost term={query} key={result.id} post={result} size="sm" />
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
                  onClick={() =>
                    setSelectedCategory(prevCategory =>
                      prevCategory === category ? null : category
                    )
                  }
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
    allWordpressWpMedia {
      nodes {
        wordpress_id
        localFile {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`;

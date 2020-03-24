import PropTypes from 'prop-types';
import React, {Fragment, useMemo, useState} from 'react';
import SearchPost from './search-post';
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
} from './ui';

const CategoryButton = styled.button({
  ...categoryInnerStyles,
  cursor: 'pointer',
  outline: 'none',
  '&.selected': selectedCategoryStyles
});

export default function SearchContent(props) {
  const results = useMemo(
    () =>
      props.index
        .search(props.query)
        .map(result => props.index.documentStore.getDoc(result.ref)),
    [props.index, props.query]
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
    return props.media
      .filter(media => avatarIds.includes(media.wordpress_id))
      .reduce(
        (acc, media) => ({
          ...acc,
          [media.wordpress_id]: media
        }),
        {}
      );
  }, [props.media, results]);

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

  if (!results.length) {
    return <SectionHeading>No results found</SectionHeading>;
  }

  return (
    <Fragment>
      <SectionHeading style={{marginBottom: 60}}>
        Search results ({filteredResults.length})
      </SectionHeading>
      <InnerWrapper>
        <Main>
          {filteredResults.map(result => (
            <SearchPost
              term={props.query}
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
    </Fragment>
  );
}

SearchContent.propTypes = {
  index: PropTypes.object.isRequired,
  media: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
};

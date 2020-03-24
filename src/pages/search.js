import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import SearchContent from '../components/search-content';
import {Index} from 'elasticlunr';
import {SectionHeading} from '../components/ui';
import {graphql} from 'gatsby';
import {parse} from 'querystring';

export default function Search(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const {siteSearchIndex, allWordpressWpMedia} = props.data;
  const {q: query} = parse(props.location.search.slice(1));

  // TODO: if we don't like the performance of elasticlunr, we could try flexsearch
  // https://github.com/nextapps-de/flexsearch
  const index = useMemo(() => Index.load(siteSearchIndex.index), [
    siteSearchIndex.index
  ]);

  return (
    <Layout defaultSearchValue={query}>
      {mounted ? (
        <SearchContent
          index={index}
          query={query}
          media={allWordpressWpMedia.nodes}
        />
      ) : (
        <SectionHeading>Loading results...</SectionHeading>
      )}
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

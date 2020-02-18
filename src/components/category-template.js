import Helmet from 'react-helmet';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {Categories, Category, categoryStyles} from './ui';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

const SelectedCategory = styled.div({
  ...categoryStyles,
  backgroundColor: colors.indigo.dark,
  borderColor: colors.indigo.dark,
  color: 'white'
});

export default function CategoryTemplate(props) {
  const {
    wordpressCategory,
    allWordpressCategory,
    allWordpressPost
  } = props.data;
  return (
    <Layout>
      <Helmet>
        <title>{wordpressCategory.name}</title>
      </Helmet>
      <Categories>
        {allWordpressCategory.nodes.map(category => (
          <Fragment key={category.id}>
            {category.id === props.pageContext.id ? (
              <SelectedCategory>{category.name}</SelectedCategory>
            ) : (
              <Category category={category} />
            )}
          </Fragment>
        ))}
      </Categories>
      {allWordpressPost.nodes.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </Layout>
  );
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryQuery($id: String) {
    wordpressCategory(id: {eq: $id}) {
      name
    }
    allWordpressCategory {
      nodes {
        id
        slug
        name
      }
    }
    allWordpressPost(filter: {categories: {elemMatch: {id: {eq: $id}}}}) {
      nodes {
        id
        title
      }
    }
  }
`;

import Helmet from 'react-helmet';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {graphql} from 'gatsby';

export default function CategoryTemplate(props) {
  const {wordpressCategory, allWordpressPost} = props.data;
  return (
    <Layout>
      <Helmet>
        <title>{wordpressCategory.name}</title>
      </Helmet>
      {allWordpressPost.nodes.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </Layout>
  );
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryQuery($id: String) {
    wordpressCategory(id: {eq: $id}) {
      name
    }
    allWordpressPost(filter: {categories: {elemMatch: {id: {eq: $id}}}}) {
      nodes {
        id
        title
      }
    }
  }
`;

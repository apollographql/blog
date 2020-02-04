import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import {graphql} from 'gatsby';

export default function PostTemplate(props) {
  const {title} = props.data.wordpress.post;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1>{title}</h1>
    </div>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: ID!) {
    wordpress {
      post(id: $id) {
        title
      }
    }
  }
`;

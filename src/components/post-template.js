import Byline from './byline';
import Helmet from 'react-helmet';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  TopFold
} from './ui';
import {graphql} from 'gatsby';

const Categories = styled.div({
  display: 'flex',
  marginTop: 32,
  [Category]: {
    marginRight: 16
  }
});

const FeaturedImage = styled.img({
  width: '100%',
  marginBottom: 90
});

export default function PostTemplate(props) {
  const {
    date,
    title,
    author,
    categories,
    featuredImage,
    content
  } = props.data.wordpress.post;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TopFold style={{paddingBottom: 90}}>
        <DateText style={{marginBottom: 12}} date={date} />
        <h1 style={{marginBottom: 32}}>{title}</h1>
        <Byline author={author} />
        <Categories>
          {categories.nodes.map(category => (
            <Category key={category.id}>{category.name}</Category>
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedImage src={featuredImage.sourceUrl} />
          <div dangerouslySetInnerHTML={{__html: content}} />
        </Main>
        <Sidebar>
          <SectionHeading>Test</SectionHeading>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: ID!) {
    wordpress {
      post(id: $id) {
        date
        title
        content
        author {
          name
          description
          avatar {
            url
          }
        }
        categories {
          nodes {
            id
            slug
            name
          }
        }
        featuredImage {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`;

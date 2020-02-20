import FollowUs from './follow-us';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {
  Categories,
  Category,
  InnerWrapper,
  Main,
  SectionHeading,
  Sidebar,
  categoryStyles
} from './ui';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

const StyledCategories = styled(Categories)({
  marginBottom: 60
});

const SelectedCategory = styled.div({
  ...categoryStyles,
  backgroundColor: colors.indigo.dark,
  borderColor: colors.indigo.dark,
  color: 'white'
});

const LatestPosts = styled.div({
  marginTop: 48,
  marginBottom: 120
});

export default function CategoryTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
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
      <StyledCategories>
        {allWordpressCategory.nodes.map(category => (
          <Fragment key={category.id}>
            {category.id === props.pageContext.id ? (
              <SelectedCategory>{category.name}</SelectedCategory>
            ) : (
              <Category category={category} />
            )}
          </Fragment>
        ))}
      </StyledCategories>
      <SectionHeading>Latest</SectionHeading>
      <LatestPosts>
        {allWordpressPost.nodes.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </LatestPosts>
      <InnerWrapper>
        <Main>
          <SectionHeading>Read more</SectionHeading>
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
          <FollowUs />
        </Sidebar>
      </InnerWrapper>
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

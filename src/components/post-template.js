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
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

const BylineWrapper = styled.div({
  display: 'flex',
  marginTop: 32
});

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

const TwitterHandleWrapper = styled.div({
  display: 'flex',
  paddingLeft: 24,
  marginLeft: 24,
  borderLeft: `1px solid ${colors.grey.lighter}`
});

const TwitterHandle = styled.a({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto 0',
  color: colors.indigo.dark,
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
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
        <h1>{title}</h1>
        <BylineWrapper>
          <Byline author={author} />
          <TwitterHandleWrapper>
            <TwitterHandle href="#">
              <IconTwitter
                style={{
                  width: 20,
                  marginRight: 8
                }}
              />
              @trevorblades
            </TwitterHandle>
          </TwitterHandleWrapper>
        </BylineWrapper>
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

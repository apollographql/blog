import React from 'react';
import {Category, CategoryNav, SectionHeading, SidebarSection} from './ui';
import {graphql, useStaticQuery} from 'gatsby';

const categories = [
  'announcement',
  'frontend',
  'backend',
  'platform',
  'how-to',
  'community'
];

export default function Categories() {
  const data = useStaticQuery(
    graphql`
      {
        allWordpressCategory(filter: {slug: {ne: "uncategorized"}}) {
          nodes {
            id
            slug
            name
          }
        }
      }
    `
  );
  return (
    <SidebarSection>
      <SectionHeading>Categories</SectionHeading>
      <CategoryNav>
        {data.allWordpressCategory.nodes
          .slice()
          .sort(
            (a, b) => categories.indexOf(a.slug) - categories.indexOf(b.slug)
          )
          .map(category => (
            <Category key={category.id} category={category} />
          ))}
      </CategoryNav>
    </SidebarSection>
  );
}

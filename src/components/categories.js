import React from 'react';
import {Category, CategoryNav, SectionHeading, SidebarSection} from './ui';
import {graphql, useStaticQuery} from 'gatsby';

export default function Categories() {
  const data = useStaticQuery(
    graphql`
      {
        allWordpressCategory(
          filter: {slug: {ne: "uncategorized"}}
          sort: {order: ASC, fields: acf___menu_order}
        ) {
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
        {data.allWordpressCategory.nodes.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </CategoryNav>
    </SidebarSection>
  );
}

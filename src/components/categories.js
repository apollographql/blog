import React from 'react';
import {Category, CategoryNav, SectionHeading, SidebarSection} from './ui';
import {graphql, useStaticQuery} from 'gatsby';

export default function Categories() {
  const data = useStaticQuery(
    graphql`
      {
        allWpCategory(
          filter: {slug: {ne: "uncategorized"}, parentId: {eq: null}}
          sort: {order: ASC, fields: categoryMeta___menuOrder}
        ) {
          nodes {
            id
            name
            path
            totalCount
          }
        }
      }
    `
  );
  return (
    <SidebarSection>
      <SectionHeading>Categories</SectionHeading>
      <CategoryNav>
        {data.allWpCategory.nodes
          .filter((category) => category.totalCount)
          .map((category) => (
            <Category key={category.id} category={category} />
          ))}
      </CategoryNav>
    </SidebarSection>
  );
}

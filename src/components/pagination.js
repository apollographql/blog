import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';
import {largeTextStyles} from './ui';

const Wrapper = styled.nav({
  marginTop: 90,
  textAlign: 'center',
  a: {
    ...largeTextStyles,
    color: colors.black.lighter,
    fontWeight: 'bold',
    textDecoration: 'none',
    [[':hover', '&.selected']]: {
      color: colors.indigo.base
    },
    ':not(:last-child)': {
      marginRight: 16
    }
  }
});

const MAX_PAGES_SHOWN = 9;

export default function Pagination(props) {
  const {currentPage, pageCount} = props.pageInfo;
  const pageOffset = Math.max(
    0,
    Math.min(
      pageCount - MAX_PAGES_SHOWN,
      currentPage - 1 - Math.floor(MAX_PAGES_SHOWN / 2)
    )
  );

  return (
    <Wrapper>
      {Array.from(Array(pageCount).keys())
        .slice(pageOffset, MAX_PAGES_SHOWN + pageOffset)
        .map(index => {
          const page = index + 1;
          return (
            <Link
              key={index}
              to={props.basePath + page}
              className={page === currentPage ? 'selected' : null}
            >
              {page}
            </Link>
          );
        })}
    </Wrapper>
  );
}

Pagination.propTypes = {
  basePath: PropTypes.string.isRequired,
  pageInfo: PropTypes.object.isRequired
};

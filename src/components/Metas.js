import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

const Metas = ({title, description, shareUrl, featuredImage}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {featuredImage && <meta property="og:image" content={featuredImage} />}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {featuredImage && (
        <meta
          name="twitter:image"
          content={'https://www.apollographql.com' + featuredImage}
        />
      )}
      {shareUrl && <link rel="canonical" href={shareUrl} />}
    </Helmet>
  );
};

Metas.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  shareUrl: PropTypes.string,
  featuredImage: PropTypes.string
};

export default Metas;

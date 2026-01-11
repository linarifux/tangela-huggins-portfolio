import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "Tangela Huggins | Transformation Coach & Speaker";
  const defaultDescription = "Empowering leaders and organizations to navigate change, build resilience, and unlock potential through the 'Grean Light Go' methodology.";
  const defaultImage = "https://your-domain.com/social-share.jpg"; // You'll replace this later with a real URL
  const siteUrl = "https://tangelahuggins.com"; // Replace with your real domain later

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | Tangela Huggins` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
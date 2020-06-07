import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Gallery from '../components/Gallery';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Gallery />
  </Layout>
);

export default IndexPage;

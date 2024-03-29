import React from "react";

import Layout from "../components/common/Layout";
import APODBanner from "../components/APODBanner";
import MainGallery from "../components/MainGallery";

const HomeContainer: React.FC = () => {
  return (
    <Layout>
      <APODBanner />
      <MainGallery />
    </Layout>
  );
};

export default HomeContainer;

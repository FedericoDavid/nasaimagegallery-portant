import React from "react";

import Layout from "./Layout";
import APODBanner from "../components/APODBanner";

const HomeContainer: React.FC = () => {
  return (
    <Layout>
      <APODBanner />
    </Layout>
  );
};

export default HomeContainer;

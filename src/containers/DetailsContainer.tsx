import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/common/Layout";
import Details from "../components/Details";

const DetailsContainer: React.FC = () => {
  const { nasa_id } = useParams<{ nasa_id: string }>();

  return (
    <Layout>
      <Details nasaId={nasa_id || ""} />
    </Layout>
  );
};

export default DetailsContainer;

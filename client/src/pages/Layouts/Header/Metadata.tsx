import { Helmet } from "react-helmet";
import React, { ReactNode } from "react";

interface Props {
    title: string;
}

const Metadata: React.FC<Props> = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Metadata;

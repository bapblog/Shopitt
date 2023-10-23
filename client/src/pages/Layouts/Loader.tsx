import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    h?: string;
    w?: string;
};

const Loader: React.FC<Props> = ({h='min-h-screen',w='min-w-full'}) => {
  return (
    <div className={`h-${h} flex items-center justify-center mt-2`}>
      <CircularProgress />
    </div>
  );
};

export default Loader;

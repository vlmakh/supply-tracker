import { Circles } from "react-loader-spinner";
import { FC } from "react";

export const Loader: FC = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#009846"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

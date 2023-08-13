import { Box } from "components/Base/Box";
import { TailSpin } from "react-loader-spinner";
import { FC } from 'react';

type Props = {
  isProcessing: boolean;
};

export const TaskLoader: FC<Props> = ({ isProcessing }) => {
  return (
    <Box mx="auto" width="16px">
      <TailSpin
        height="18"
        width="18"
        color="#212121"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isProcessing}
      />
    </Box>
  );
};

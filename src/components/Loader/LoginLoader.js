import { TailSpin } from 'react-loader-spinner';

export const LoginLoader = ({ isProcessing }) => {
  return (
    <>
      <TailSpin
        height="16"
        width="16"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{ marginLeft: '16px' }}
        wrapperClass=""
        visible={isProcessing}
      />
    </>
  );
};

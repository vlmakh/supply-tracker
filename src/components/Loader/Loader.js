import { Box } from 'components/Base/Box';
import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Box>
      <Circles
        height="80"
        width="80"
        color="#009846"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};

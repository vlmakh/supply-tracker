import { Link } from 'react-router-dom';
import { MainWrap } from 'components/Container/Container.styled';
import { Box } from 'components/Base/Box';
import logo from 'images/logo256.webp';

export default function ErrorPage() {
  return (
    <MainWrap>
      <Box width="200px" mx="auto" mt={4}>
        <img src={logo} alt="logo" width="200" />
      </Box>

      <Box textAlign="center" mt={5}>
        <h2>404</h2>
        <p>Such page is unavailable</p>
        <Link to="/">Go to main page</Link>
      </Box>
    </MainWrap>
  );
}

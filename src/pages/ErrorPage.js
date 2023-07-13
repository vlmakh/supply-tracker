import { Link } from 'react-router-dom';
import { Box } from 'components/Base/Box';
import logo from 'images/task-manager-512.png';

export default function ErrorPage() {
  return (
    <Box mt={5}>
      <Box width="200px" mx="auto">
        <img src={logo} alt="logo" width="200" />
      </Box>

      <Box textAlign="center" mt={5}>
        <h2>404</h2>
        <p>Such page is unavailable</p>
        <Link to="/">Go to main page</Link>
      </Box>
    </Box>
  );
}

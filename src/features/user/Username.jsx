import { useSelector } from 'react-redux';

/**
 * Renders the username of the logged-in user.
 *
 * @returns {JSX.Element|null} The JSX element representing the username, or null if the username is not available.
 */
function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) {
    return null;
  }

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;

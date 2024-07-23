import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

/**
 * Renders an error message when something goes wrong.
 *
 * @returns {JSX.Element} The rendered Error component.
 */
function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;

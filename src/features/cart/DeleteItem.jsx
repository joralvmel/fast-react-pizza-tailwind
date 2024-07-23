import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

/**
 * Renders a delete button for a specific pizza item in the cart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.pizzaId - The ID of the pizza item to be deleted.
 * @returns {JSX.Element} - The delete button component.
 */
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;

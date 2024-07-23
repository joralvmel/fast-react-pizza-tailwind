import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

/**
 * Renders a component for updating the quantity of a pizza item in the cart.
 *
 * @param {Object} props - The component props.
 * @param {string} props.pizzaId - The ID of the pizza item.
 * @param {number} props.currentQuantity - The current quantity of the pizza item.
 * @returns {JSX.Element} The rendered component.
 */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type={'round'}
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={'round'}
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

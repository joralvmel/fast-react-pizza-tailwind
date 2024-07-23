import { formatCurrency } from '../../utils/helpers';

/**
 * Renders an order item with its quantity, name, total price, and ingredients.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The order item object.
 * @param {boolean} props.isLoadingIngredients - Indicates whether the ingredients are currently being loaded.
 * @param {string[]} props.ingredients - The list of ingredients for the order item.
 * @returns {JSX.Element} The rendered OrderItem component.
 */
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {' '}
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;

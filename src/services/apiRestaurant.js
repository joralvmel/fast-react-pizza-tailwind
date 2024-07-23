const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

/**
 * Fetches the menu from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of menu items.
 * @throws {Error} If there is an error fetching the menu.
 */
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

/**
 * Retrieves an order by its ID from the API.
 *
 * @param {number} id - The ID of the order to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the order data.
 * @throws {Error} - If the order with the specified ID is not found.
 */
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

/**
 * Creates a new order.
 * @param {Object} newOrder - The new order object.
 * @returns {Promise<Object>} - A promise that resolves to the created order data.
 * @throws {Error} - If there is an error creating the order.
 */
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

/**
 * Updates an order with the specified ID.
 * @param {string} id - The ID of the order to update.
 * @param {Object} updateObj - The object containing the updates to apply to the order.
 * @throws {Error} If the update fails.
 */
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}

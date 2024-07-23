/**
 * Retrieves the address based on the provided latitude and longitude coordinates.
 *
 * @param {Object} coordinates - The latitude and longitude coordinates.
 * @param {number} coordinates.latitude - The latitude value.
 * @param {number} coordinates.longitude - The longitude value.
 * @returns {Promise<Object>} - A promise that resolves to the address data.
 * @throws {Error} - If there is an error retrieving the address.
 */
export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}

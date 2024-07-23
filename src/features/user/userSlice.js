import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

/**
 * Retrieves the current position of the user.
 * @returns {Promise<Position>} A promise that resolves with the user's position.
 */
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

/**
 * Fetches the user's address using geolocation and reverse geocoding.
 *
 * @async
 * @function fetchAddress
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's position and address.
 */
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);

/**
 * Initial state for the user slice.
 *
 * @typedef {Object} InitialState
 * @property {string} username - The username.
 * @property {string} status - The status of the user.
 * @property {Object} position - The position of the user.
 * @property {string} address - The address of the user.
 * @property {string} error - The error message, if any.
 */

/**
 * The initial state for the user slice.
 *
 * @type {InitialState}
 */
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

/**
 * Redux slice for managing user state.
 *
 * @typedef {Object} UserSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for updating the state.
 * @property {Function} extraReducers - Additional reducers for handling asynchronous actions.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

/**
 * Action creator for updating the user's name.
 * @function updateName
 * @param {string} newName - The new name to update.
 * @returns {object} - Redux action object with the type and payload.
 */
export const { updateName } = userSlice.actions;
/**
 * Reducer function for the user slice.
 * @module userSlice
 */
export default userSlice.reducer;

/**
 * Retrieves the username from the user state.
 *
 * @param {Object} state - The Redux state object.
 * @returns {string} The username value from the user state.
 */
export const getUsername = (state) => state.user.username;

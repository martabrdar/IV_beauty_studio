import { createSlice } from '@reduxjs/toolkit';

// Učitaj admina iz localStorage ako postoji
const adminFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;

const initialState = {
  adminInfo: adminFromStorage, // { _id, name, email, token, isAdmin: true }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Poziva se nakon uspešnog admin logina
    setAdmin: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    // Poziva se pri odjavljivanju admina
    adminLogout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setAdmin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

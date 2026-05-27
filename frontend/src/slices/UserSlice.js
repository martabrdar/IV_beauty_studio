import { createSlice } from '@reduxjs/toolkit';

// Učitaj korisnika iz localStorage ako postoji
const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userFromStorage, // { _id, name, email, token }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Poziva se nakon uspešnog logina/registracije
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Poziva se pri odjavljivanju
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

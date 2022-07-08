import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  statusBarTheme: 'light-content' | 'dark-content';
}

const INITIAL_STATE: ThemeState = {
  statusBarTheme: 'dark-content',
};

const themeStore = createSlice({
  initialState: INITIAL_STATE,
  name: 'theme',
  reducers: {},
});

export default themeStore;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER {
  displayName: string;
  photoUrl: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { 
      uid: "",
      photoUrl: "",
      displayName: "" 
    },
  },

  /* reducer : action & state を受け取る */
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        uid: "",
        photoUrl: "",
        displayName: ""
      };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

/* dispatch により action を実行するために export する */
export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

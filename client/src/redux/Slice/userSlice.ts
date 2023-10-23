import { createSlice, SerializedError } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userSliceProp } from '../../types/types'


export interface UserState {
  user: userSliceProp | null;
  token: string | null;
  isUser: boolean;
  errors: any;
}

const initialState: UserState = {
  user: null,
  token: null,
  isUser: false,
  errors: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<userSliceProp>) => {
      state.user = action.payload;
      state.token = action.payload.password;
      state.user == null ? state.isUser = false : state.isUser = true;
    },
    isUser: (state) => {
      state.user == null ? state.isUser = false : state.isUser = true
    },
    setErrors: (state,action: PayloadAction<any>) => {
      state.errors = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,isUser,setErrors } = userSlice.actions

export default userSlice.reducer
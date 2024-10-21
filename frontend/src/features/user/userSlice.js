import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: {id:1,name:"test", email:"test@mail.com", jobProfile:"sde"},
  },
  reducers: {
    updateUser:(state, action)=>{
        const user = {
            id:action.payload.id,
            name:action.payload.name,
             email:action.payload.email,
            jobProfile:action.payload.jobProfile
        }
        state.user = user;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer
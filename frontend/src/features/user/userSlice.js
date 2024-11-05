import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: {
      id: 1,
      name: "test",
      email: "test@mail.com",
      jobProfile: "sde",
      scoreData: [],
    },
  },
  reducers: {
    setUser: (state, action) => {
      const user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        jobProfile: action.payload.jobProfile,
        scoreData: action.payload.scoreData,
      };
      state.user = user;
    },
    updateUserScore: (state, action) => {
      const score = { date: new Date(), score: action.payload.score };
      state.user.scoreData.push(score);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, updateUserScore } = userSlice.actions;

export default userSlice.reducer;

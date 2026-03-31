import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachSkills: [],
  learnSkills: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addTeachSkill: (state, action) => {
      if (!state.teachSkills.includes(action.payload)) {
        state.teachSkills.push(action.payload);
      }
    },
    addLearnSkill: (state, action) => {
      if (!state.learnSkills.includes(action.payload)) {
        state.learnSkills.push(action.payload);
      }
    },
    removeTeachSkill: (state, action) => {
      state.teachSkills = state.teachSkills.filter(
        (skill) => skill !== action.payload
      );
    },
    removeLearnSkill: (state, action) => {
      state.learnSkills = state.learnSkills.filter(
        (skill) => skill !== action.payload
      );
    },
  },
});

export const {
  addTeachSkill,
  addLearnSkill,
  removeTeachSkill,
  removeLearnSkill,
} = profileSlice.actions;

export default profileSlice.reducer;
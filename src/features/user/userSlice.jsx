import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = {
        ...action.payload,
        teachSkills: [],
        learnSkills: [],
      };
      state.users.push(newUser);
      state.currentUser = newUser;
    },

    login: (state, action) => {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (user) {
        state.currentUser = user;
      } else {
        alert("Invalid email or password");
      }
    },

    logout: (state) => {
      state.currentUser = null;
      
    },

     addTeachSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      if (!state.currentUser.teachSkills.includes(skill)) {
        state.currentUser.teachSkills.push(skill);

        const index = state.users.findIndex(
          (u) => u.email === state.currentUser.email
        );
        state.users[index].teachSkills.push(skill);
      }
    },

    removeTeachSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      state.currentUser.teachSkills =
        state.currentUser.teachSkills.filter((s) => s !== skill);

      const index = state.users.findIndex(
        (u) => u.email === state.currentUser.email
      );
      state.users[index].teachSkills =
        state.users[index].teachSkills.filter((s) => s !== skill);
    },

    addLearnSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      if (!state.currentUser.learnSkills.includes(skill)) {
        state.currentUser.learnSkills.push(skill);

        const index = state.users.findIndex(
          (u) => u.email === state.currentUser.email
        );
        state.users[index].learnSkills.push(skill);
      }
    },

    removeLearnSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      state.currentUser.learnSkills =
        state.currentUser.learnSkills.filter((s) => s !== skill);

      const index = state.users.findIndex(
        (u) => u.email === state.currentUser.email
      );
      state.users[index].learnSkills =
        state.users[index].learnSkills.filter((s) => s !== skill);
    },

    changePassword: (state, action) => {
      const { email, newPassword } = action.payload;

      const user = state.users.find((u) => u.email === email);

      if (user) {
        user.password = newPassword;
      }
    },
  },
});

export const {
  registerUser,
  login,
  logout,
  addTeachSkill,
  removeTeachSkill,
  addLearnSkill,
  removeLearnSkill,
  changePassword,
} = userSlice.actions;

export default userSlice.reducer;
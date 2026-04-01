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
        requestsSent:[],
        requestsReceived:[],
        connections:[]
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

sendRequest: (state, action) => {
  if (!state.currentUser) return;

  const recipientEmail = action.payload;

  // cannot send request to yourself
  if (recipientEmail === state.currentUser.email) return;

  const recipientIndex = state.users.findIndex(u => u.email === recipientEmail);
  if (recipientIndex === -1) return;

  const recipient = state.users[recipientIndex];

  // prevent duplicate requests
  if (
    recipient.incomingRequests.includes(state.currentUser.email) ||
    state.currentUser.outgoingRequests.includes(recipientEmail) ||
    recipient.connections.includes(state.currentUser.email)
  ) return;

  // Add request
  recipient.requestsReceived.push(state.currentUser.email);
  state.currentUser.requestsSent.push(recipientEmail);
},

acceptRequest: (state, action) => {
  const senderEmail = action.payload;
  if (!state.currentUser) return;

  const senderIndex = state.users.findIndex(u => u.email === senderEmail);
  if (senderIndex === -1) return;

  const sender = state.users[senderIndex];

  // Remove pending requests
  state.currentUser.requestsReceived = state.currentUser.incomingRequests.filter(e => e !== senderEmail);
  sender.requestsSent = sender.outgoingRequests.filter(e => e !== state.currentUser.email);

  // Add to connections
  state.currentUser.connections.push(senderEmail);
  sender.connections.push(state.currentUser.email);
},

rejectRequest: (state, action) => {
  const senderEmail = action.payload;
  if (!state.currentUser) return;

  const senderIndex = state.users.findIndex(u => u.email === senderEmail);
  if (senderIndex === -1) return;

  const sender = state.users[senderIndex];

  // Remove pending requests only
  state.currentUser.requestsSent = state.currentUser.requestsSent.filter(e => e !== senderEmail);
  sender.requestsSent = sender.requestsSent.filter(e => e !== state.currentUser.email);
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
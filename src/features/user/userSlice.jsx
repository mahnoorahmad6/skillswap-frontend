import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

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
      const email=action.payload.email
      const existingUser = state.users.find(
    (u) => u.email === email
  );

  if (existingUser) {
    const navigate=useNavigate()
    alert("Email already registered");
    navigate("/register")
    return;
  }

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
    recipient.requestsReceived.includes(state.currentUser.email) ||
    state.currentUser.requestsSent.includes(recipientEmail) ||
    recipient.connections.includes(state.currentUser.email)
  ) return;

  // Add request
  recipient.requestsReceived.push({email:state.currentUser.email,name:state.currentUser.name});
  state.currentUser.requestsSent.push( {email: recipient.email,
  name: recipient.name});
},

acceptRequest: (state, action) => {
  const senderEmail = action.payload;
  if (!state.currentUser) return;

  const senderIndex = state.users.findIndex(u => u.email === senderEmail);
  if (senderIndex === -1) return;

  const sender = state.users[senderIndex];

  // Remove pending requests
  state.currentUser.requestsReceived = state.currentUser.requestsReceived.filter(e => e.email !== sender.email);
  sender.requestsSent = sender.requestsSent.filter(e => e.email !== state.currentUser.email);

  // Add to connections
  state.currentUser.connections.push({email:sender.email,name:sender.name});
  sender.connections.push({email:state.currentUser.email,name:state.currentUser.name});
},

rejectRequest: (state, action) => {
  const senderEmail = action.payload;
  if (!state.currentUser) return;

  const senderIndex = state.users.findIndex(u => u.email === senderEmail);
  if (senderIndex === -1) return;

  const sender = state.users[senderIndex];

  // Remove pending requests only
  state.currentUser.requestsSent = state.currentUser.requestsSent.filter(e => e.email !== sender.email);
  sender.requestsSent = sender.requestsSent.filter(e => e.email !== state.currentUser.email);
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
  acceptRequest,
  sendRequest,
  rejectRequest,
  changePassword,
} = userSlice.actions;

export default userSlice.reducer;
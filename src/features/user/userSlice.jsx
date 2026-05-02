import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  currentUser: null
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  }
);



export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Logout failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {

    addTeachSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      if (!state.currentUser.teachSkills.includes(skill)) {
        state.currentUser.teachSkills.push(skill);
      }
    },

    removeTeachSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      state.currentUser.teachSkills =
        state.currentUser.teachSkills.filter(
          (s) => s !== skill
        );
    },

    addLearnSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      if (!state.currentUser.learnSkills.includes(skill)) {
        state.currentUser.learnSkills.push(skill);
      }
    },

    removeLearnSkill: (state, action) => {
      if (!state.currentUser) return;

      const skill = action.payload;

      state.currentUser.learnSkills =
        state.currentUser.learnSkills.filter(
          (s) => s !== skill
        );
    },

    sendRequest: (state, action) => {
      console.log("Request sent");
    },

    acceptRequest: (state, action) => {
      console.log("Request accepted");
    },

    rejectRequest: (state, action) => {
      console.log("Request rejected");
    },

    changePassword: (state, action) => {
      const { email, newPassword } =
        action.payload;

      const user = state.users.find(
        (u) => u.email === email
      );

      if (user) {
        user.password = newPassword;
      }
    }
  },

  // THIS GOES OUTSIDE reducers
  extraReducers: (builder) => {
    builder.addCase(
      registerUser.fulfilled,
      (state, action) => {
        console.log(action.payload);

        state.currentUser =
          action.payload.user;

        state.users.push(
          action.payload.user
        );
      }
    );

    builder.addCase(
      registerUser.rejected,
      (state, action) => {
        console.log(
          "Registration failed:",
          action.payload
        );
      }
    );


    // LOGIN
  builder.addCase(
    loginUser.pending,
    (state) => {
      state.loading = true;
    }
  );

  builder.addCase(
    loginUser.fulfilled,
    (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;

      // if backend sends token
      localStorage.setItem(
        "token",
        action.payload.token
      );
    }
  );

  builder.addCase(
    loginUser.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  );


  // LOGOUT
  builder.addCase(
    logoutUser.fulfilled,
    (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
    }
  );
  }
});

export const {

  addTeachSkill,
  removeTeachSkill,
  addLearnSkill,
  removeLearnSkill,
  acceptRequest,
  sendRequest,
  rejectRequest,
  changePassword
} = userSlice.actions;

export default userSlice.reducer;
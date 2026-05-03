import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
};

const API = "http://localhost:5000/api";

// 🔹 REGISTER
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/register`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/login`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// 🔹 LOGOUT
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/logout`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// 🔹 ADD TEACH SKILL
export const addTeachSkillThunk = createAsyncThunk(
  "user/addTeachSkill",
  async (skillName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/user/add-teach-skill`,
        { skillName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add skill"
      );
    }
  }
);

// 🔹 REMOVE TEACH SKILL
export const removeTeachSkillThunk = createAsyncThunk(
  "user/removeTeachSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/user/remove-teach-skill`,
        { skillId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove skill"
      );
    }
  }
);

// 🔹 ADD LEARN SKILL ✅ FIXED TYPE
export const addLearnSkillThunk = createAsyncThunk(
  "user/addLearnSkill",
  async (skillName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/user/add-learn-skill`,
        { skillName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add learn skill"
      );
    }
  }
);

// 🔹 REMOVE LEARN SKILL ✅ FIXED TYPE
export const removeLearnSkillThunk = createAsyncThunk(
  "user/removeLearnSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/user/remove-learn-skill`,
        { skillId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove learn skill"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    sendRequest: () => console.log("Request sent"),
    acceptRequest: () => console.log("Request accepted"),
    rejectRequest: () => console.log("Request rejected")
  },

  extraReducers: (builder) => {
    builder

      // 🔹 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.users.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        localStorage.removeItem("token");
      })

      // 🔹 TEACH SKILLS
      .addCase(addTeachSkillThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(removeTeachSkillThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })

      // 🔹 LEARN SKILLS
      .addCase(addLearnSkillThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(removeLearnSkillThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      });
  }
});

export const {
  sendRequest,
  acceptRequest,
  rejectRequest
} = userSlice.actions;

export default userSlice.reducer;
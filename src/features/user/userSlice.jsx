import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
};

// 🔹 Helper
const getToken = () => localStorage.getItem("token");


// ================= AUTH =================

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
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// 🔹 LOAD USER (VERY IMPORTANT)
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      const res = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);


// ================= SKILLS =================

// 🔹 ADD TEACH SKILL
export const addTeachSkill = createAsyncThunk(
  "user/addTeachSkill",
  async (skillName, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/user/add-teach-skill`,
        { skillName },
        { headers: { Authorization: `Bearer ${getToken()}` } }
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
export const removeTeachSkill = createAsyncThunk(
  "user/removeTeachSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/user/remove-teach-skill`,
        { skillId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove skill"
      );
    }
  }
);

// 🔹 ADD LEARN SKILL
export const addLearnSkill = createAsyncThunk(
  "user/addLearnSkill",
  async (skillName, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/user/add-learn-skill`,
        { skillName },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add learn skill"
      );
    }
  }
);

// 🔹 REMOVE LEARN SKILL
export const removeLearnSkill = createAsyncThunk(
  "user/removeLearnSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/user/remove-learn-skill`,
        { skillId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove learn skill"
      );
    }
  }
);


// ================= ACCOUNT =================

// 🔹 CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/auth/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);


// ================= REQUESTS =================

// 🔹 SEND REQUEST
export const sendRequest = createAsyncThunk(
  "user/sendRequest",
  async ({ receiverId, skillOffered, skillWanted }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/request/send`,
        { receiverId, skillOffered, skillWanted },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send request"
      );
    }
  }
);

// 🔹 ACCEPT REQUEST
export const acceptRequest = createAsyncThunk(
  "user/acceptRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/request/accept`,
        { requestId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);

// 🔹 REJECT REQUEST
export const rejectRequest = createAsyncThunk(
  "user/rejectRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/request/reject`,
        { requestId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject request"
      );
    }
  }
);


// ================= SLICE =================

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

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

      // 🔹 LOAD USER
      .addCase(loadUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      // 🔹 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.error = null;
        state.loading = false;
        localStorage.removeItem("token");
      })

      // 🔹 SKILLS
      .addCase(addTeachSkill.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(removeTeachSkill.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(addLearnSkill.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(removeLearnSkill.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })

      // 🔹 CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 REQUESTS
      .addCase(sendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
  state.loading = false;
  if (action.payload.user) {
    state.currentUser = action.payload.user;
  }
})
      .addCase(sendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(acceptRequest.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.currentUser = action.payload.user;
        }
      })

      .addCase(rejectRequest.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.currentUser = action.payload.user;
        }
      });
  }
});

export default userSlice.reducer;
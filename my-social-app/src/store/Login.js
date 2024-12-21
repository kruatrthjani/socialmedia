 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { route } from "../routes/listRoute";

// Thunk to fetch user login details by userId
export const fetchUserLogIn = createAsyncThunk("fetch/login", async (userId) => {
  const response = await fetch(route.GETUSERASID + userId);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  const data = await response.json();
  return data.user;
});

// Thunk to update the user's follow status
// export const updateUserFollow = createAsyncThunk(
//   "updatefollow/login",
//   async ({ userId, isFollowing }) => {
//     const url = isFollowing
//       ? `${route.UNFOLOWUSER}${userId}`
//       : `${route.FOLLOWUSER}${userId}`;
//     const response = await fetch(url, { method: "POST" });
//     if (!response.ok) {
//       throw new Error("Failed to update follow status");
//     }
//     const data = await response.json();
//     return data.user;
//   }
// );

// Initial state
const initialState = {
  user: {}, // Holds the current user details
  currentUserId: JSON.parse(localStorage.getItem("user"))?.["_id"] || null, // Initialize from localStorage if available  
  status: "idle", // Status for API calls (idle, loading, succeeded, failed)
  error: null, // Holds error messages if any
};

// Slice definition
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Synchronous reducer to manually set user and currentUserId
    updateUserFollow(state, action) {
      const { userId, isFollowing } = action.payload;
      const updatedUser = { ...state.user };
      console.log(updatedUser)
      // Update the user's follow status
      if (isFollowing) {
        updatedUser.following = updatedUser.following.filter(followed => followed._id !== userId);
      } else {
        updatedUser.following.push({ _id: userId });
      }

      // Update the Redux state
      state.user = updatedUser;
      // localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist the updated user in localStorage
    },
    loginData(state, action) {
      state.user = action.payload;
      state.currentUserId = action.payload._id;
    },
    // Clear user and currentUserId on logout
    logout(state) {
      state.user = {};
      state.currentUserId = null;
      localStorage.removeItem("user"); // Remove from localStorage on logout
      localStorage.removeItem('loggedIn')
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserLogIn lifecycle
      .addCase(fetchUserLogIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLogIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.currentUserId = action.payload._id; // Update currentUserId
        localStorage.setItem("user", JSON.stringify(action.payload)); // Persist in localStorage
      })
      .addCase(fetchUserLogIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle updateUserFollow lifecycle
      // .addCase(updateUserFollow.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateUserFollow.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.user = action.payload;
      // })
      // .addCase(updateUserFollow.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
  },
});

// Export actions
export const { loginData, logout, updateUserFollow} = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;

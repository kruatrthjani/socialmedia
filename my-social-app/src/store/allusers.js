import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { route } from "../routes/listRoute";
// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  "allusers/fetchUsers",
  async (_, { rejectWithValue }) => {    
    try {
        
      const response = await fetch(route.ALLUSERS);
      
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();      
      return data.users; // Assuming the API returns an object with a `users` array      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allUsers: [], // Ensure this is initialized as an array
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const allUsersSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    updateBookmark: (state,action)=>{
      const {currentUserId,postId,Data}=action.payload;      
      const user=state.allUsers.find((user)=>user._id===currentUserId);
          
      if(!user) return;      
      if(!user.bookmarks){        
        user.bookmarks=[];
      }      
      const bookmarkData=user.bookmarks.some((post)=>post._id===postId);      
      
      if(bookmarkData){
          user.bookmarks=user.bookmarks.filter((post)=>post._id!==postId)
      }

      else{
        user.bookmarks.push(Data)                
      }
      

    },
    updateUser: (state, action) => {
      const { currentUserId, bio, website, avatarUrl } = action.payload;
      
      // Find the user to update by matching the currentUserId
      const user = state.allUsers.find((user) => user._id === currentUserId);
      
      if (!user) return; // If no user found, exit early
    
      // Only update the fields that are provided in the payload
      if (bio !== undefined) user.bio = bio;
      if (website !== undefined) user.website = website;
      if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    },
    
    updateFollow: (state, action) => {
      const { currentUserId, currentUsername } = action.payload;
    
      const users = state.allUsers;
      const findUser = users.find((user) => user._id === currentUserId);
      const toUser = users.find((user) => user.username === currentUsername);
    
      if (!findUser || !toUser) return;
    
      const isFollowing = findUser.following.some(
        (user) => user._id === toUser._id
      );
    
      if (isFollowing) {
        // Remove the relationship
        findUser.following = findUser.following.filter(
          (user) => user._id !== toUser._id
        );
        toUser.followers = toUser.followers.filter(
          (user) => user._id !== findUser._id
        );
      } else {
        // Add the relationship
        findUser.following.push(JSON.parse(JSON.stringify(toUser))); // Deep copy
        toUser.followers.push(JSON.parse(JSON.stringify(findUser))); // Deep copy
      }
    }
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";        
        state.allUsers = action.payload;
        
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setUsers,updateBookmark ,updateFollow,updateUser} = allUsersSlice.actions;

export default allUsersSlice.reducer;

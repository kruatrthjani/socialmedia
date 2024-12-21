import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { route } from "../routes/listRoute";
// Fetch all posts (no change needed)
export const allPostsFetch = createAsyncThunk("posts/allpostsfetch", async () => {
  const response = await fetch(route.POSTS);
  const data = await response.json();
  return data.posts;
});

// Slice for all posts
const allposts = createSlice({
  name: "allposts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updatePostLike(state, action) {
      const { postId, currentUserId, isLiked,userData } = action.payload;

      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        if (isLiked) {
          // Unlike post
          post.likes.likedBy = post.likes.likedBy.filter(
            (user) => user._id !== currentUserId
          );
          post.likes.likeCount -= 1;
        } else {
          // Like post
          
          post.likes.likedBy.push(userData);
          post.likes.likeCount += 1;
        }
      }
    },
    updatePostDelete(state, action) {
      const { postId } = action.payload;
      state.posts = state.posts.filter((post) => post._id !== postId);
    },
    updatePostContent(state, action) {
      const { postId, postData } = action.payload;
      const post = state.posts.find((pos) => pos._id === postId);
      if (post) {
        post.content = postData.content || post.content;
        post.mediaURL = postData.mediaURL || post.mediaURL;
      }
    },
    sortPostsByToggle(state, action) {
      const {filter} = action.payload;
      
      if (filter === "descending") {
        // Sort by createdAt from newest to oldest
        state.posts = state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filter === "ascending") {
        // Sort by createdAt from oldest to newest
        state.posts = state.posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filter === "trending") {
        // Sort by likeCount from highest to lowest
        state.posts = state.posts.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(allPostsFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allPostsFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(allPostsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  updatePostLike,
  updatePostDelete,
  updatePostContent,
  sortPostsByToggle,
} = allposts.actions;
export default allposts.reducer;

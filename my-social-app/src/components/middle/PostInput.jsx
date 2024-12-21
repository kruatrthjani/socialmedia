import React from "react";

const PostInput = ({
  postContent,
  setPostContent,
  postContentHandler,
  imagePreview,
  handleFileChange,
}) => {
  return (
    <div className="w-full bg-black text-white border-b pb-2">
      <p className="text-center">Home</p>
      <form onSubmit={postContentHandler} className="flex flex-col gap-y-4">
        {/* User Avatar and Text Input */}
        <div className="flex items-center gap-x-2 ml-2">
          <textarea
            className="text-xs font-light bg-transparent flex-1"
            placeholder="What's happening?"
            name="post"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)} // Update state on input change
            rows={3}
            cols={60}
          />
        </div>

        {/* File Upload */}
        <div className="flex items-center gap-x-2 px-2">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Selected preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-x-2 items-center mr-2 w-full">
            <label htmlFor="file-input">
              <i className="fa-regular fa-image text-gray-400 cursor-pointer text-xl"></i>{" "}
              {/* Icon for file selection */}
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden" // Hide the actual file input
              onChange={handleFileChange} // Trigger preview change on file selection
            />
            <button
              className="px-2 text-xs bg-pink-500 rounded-xl text-center pb-1"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostInput;

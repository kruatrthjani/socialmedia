import React from 'react';

const EditPostForm = ({
  profilePreview,
  postContent,
  setPostContent,
  imagePreview,
  handleFileChange,
  editPostHandler,
  editCancelHandler
}) => {
  return (
    <div className="bg-black w-1/2 centered-container flex justify-center opacity-80">
      {/* Form Container */}
      <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg opacity-90">
        <div className="flex items-center gap-x-4 mb-6">
          {/* User Avatar */}
          <img src={profilePreview} className="h-12 w-12 rounded-full object-cover" alt="User Avatar" />

          {/* Post Content Input */}
          <form onSubmit={editPostHandler} className="flex flex-col gap-y-4 w-full">
            <div className="relative w-full">
              <textarea
                className="w-full p-3 bg-transparent text-white text-lg font-light rounded-lg border border-gray-600 focus:ring-2 focus:ring-pink-500 resize-none"
                placeholder="What's happening?"
                name="post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)} // Update state on input change
                rows={3}
              />
            </div>

            {/* File Upload and Buttons */}
            <div className="flex justify-between items-center gap-x-4 mt-4">
              {/* Image Preview */}
              {imagePreview && (
                <div className="flex-shrink-0">
                  <img
                    src={imagePreview}
                    alt="Selected preview"
                    className="w-32 h-32 object-cover rounded-md shadow-md"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-x-4 items-center">
                <label htmlFor="file-input" className="text-gray-400 cursor-pointer text-xl hover:text-pink-500 transition">
                  <i className="fa-regular fa-image"></i> {/* Icon for file selection */}
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange} // Trigger preview change on file selection
                />
                <button
                  className="px-4 py-1 text-xs bg-gray-500 hover:bg-gray-600 rounded-lg text-white transition"
                  onClick={editCancelHandler}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 text-xs bg-pink-500 hover:bg-pink-600 rounded-lg text-white transition"
                  type="submit"
                >
                  Edit Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;

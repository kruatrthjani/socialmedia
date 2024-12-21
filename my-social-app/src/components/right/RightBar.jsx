import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateFollow, fetchUsers } from "../../store/allusers";
import { path } from "../../routes/navigatepath";
import { apiRequest } from "../../service/allservice";
import { fetchUserLogIn, updateUserFollow } from "../../store/Login";
import { route } from "../../routes/listRoute";

function RightBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const { user: userData = { following: [] }, status: userStatus, currentUserId } = useSelector((state) => state.login);
  const { allUsers = [], status: allUserStatus } = useSelector((state) => state.allUser);

  // Fetch logged-in user details
  useEffect(() => {
    if (userStatus === "idle" && currentUserId) {
      dispatch(fetchUserLogIn(currentUserId));
    }
  }, [userStatus]);

  // Handle search input change
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    if (value.length > 2 && Array.isArray(allUsers)) {
      const filtered = allUsers.filter(
        (user) =>
          user.username.includes(value) &&
          user._id !== currentUserId 
      );
      setSearchUsers(filtered);
    } else {
      setSearchUsers([]);
    }
  };

  async function handleFollow(user) {
    if (!currentUserId) return;

    try {
      const isFollowing = userData.following.some((followed) => followed._id === user._id);

      const url = isFollowing
        ? `${route.UNFOLOWUSER}${user._id}`
        : `${route.FOLLOWUSER}${user._id}`;

      const { success } = await apiRequest({ method: "POST", url });

      if (success) {
        dispatch(updateFollow({ currentUserId, currentUsername: user.username }));
        dispatch(updateUserFollow({userId:user._id, isFollowing}));
      }
    } catch (err) {
      console.error("Error in handleFollow:", err);
    }
  }

  const userDetailHandler = (username) => {
    // navigate(`/profile/${username}`);
    navigate(path.ACTUALUSERDETAIL+username);
  };

  if (userStatus === "loading" || allUserStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-600 h-full flex justify-start items-center flex-col px-4 py-2 z-20 relative">
      {/* Search Input */}
      <div className="relative w-full max-w-lg mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-xl text-slate-900 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={handleChange}
        />
        {search && (
          <button className="absolute right-4 top-2 text-gray-500" onClick={() => setSearch("")}>
            ✖️
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchUsers.length > 0 && (
        <div className="w-full max-w-lg mt-4 bg-slate-700 rounded-xl shadow-lg max-h-full overflow-y-auto absolute top-20 left-0 right-0 z-30">
          {searchUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center px-4 py-3 border-b border-slate-500 cursor-pointer hover:bg-slate-600"
              onClick={() => userDetailHandler(user.username)}
            >
              <img src={user.avatarUrl} alt={user.username} className="rounded-full w-10 h-10" />
              <div className="ml-4">
                <p className="text-white text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggested Users */}
      <div className="w-full max-w-lg mt-4 bg-black rounded-xl shadow-md z-10">
        <p className="text-white font-semibold mb-2 rounded-t-xl px-4 py-2 ">Suggested Users</p>
        {allUsers
          .filter(
            (user) =>
              user._id !== currentUserId &&
              !userData.following.some((followed) => followed._id === user._id)
          )
          .map((user, index) => (
            <ul
              key={user._id}
              className={`list-none flex items-center justify-between mb-2 px-4 py-2 ${
                index === allUsers.length - 1 ? "rounded-b-xl" : ""
              } bg-black hover:bg-gray-800 cursor-pointer`}
              onClick={() => userDetailHandler(user.username)}
            >
              <div className="flex items-center">
                <img src={user.avatarUrl} className="rounded-full w-12 h-12" alt="User avatar" />
                <div className="ml-4">
                  <p className="text-white text-sm">{user.firstName}</p>
                  <p className="text-xs text-gray-400">@{user.username}</p>
                </div>
              </div>

              <button
                className="bg-red-400 text-white text-xs py-1 px-4 rounded-xl hover:bg-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the parent click event
                  handleFollow(user);
                }}
              >
                Follow
              </button>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default RightBar;

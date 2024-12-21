import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../routes/navigatepath";
import { useDispatch,useSelector } from "react-redux";

const PostCard = ({
  post,
  editpop,    
  findProfile,
  editclick,
  userData,
  editViewHandler,
  deletePostHandler,
  likepostHandler,
  bookmarkPostHandler,
  
}) => {  
  
  const currentUserId=userData._id
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const userProfile = findProfile(post.username);
  
  const {allUsers,status:allUserStatus}=useSelector((state)=>state.allUser)
  const {posts,status:postsStatus}=useSelector((state)=>state.allPosts)
  
   useEffect(()=>{
    
     if(allUserStatus==="idle"||allUserStatus==="loading"){
         dispatch(fetchUsers())
     }
   },[allUserStatus,allUsers,dispatch])

  

 useEffect(()=>{
     if(postsStatus==="idle"|| postsStatus==="loading"){            
         dispatch(allPostsFetch())
     }
 },[postsStatus,posts,dispatch])


if (allUserStatus==="loading" ||allUserStatus==="idle"||!allUsers) return <p>loading data...</p>
if  (postsStatus==='loading'||postsStatus==="idle"||!posts) return <p>fetching posts...</p>
//if(status==="idle"||status==="loading"||!userData) return <p>fetching data</p>




  return (
    <div className="bg-black w-full rounded-lg shadow-md my-2  ml-2 ">
      {/* Edit/Delete options */}
      <div className=" flex flex-row-reverse -b-2 border-slate-300">
      <div className="flex justify-end pr-3  w-6/12 ">
        
          <div
           className={`bg-gray-500 text-white px-2 py-1 rounded-sm  ${editpop===post._id?'visible':'invisible'}`}
            onBlur={()=>editclick("")} tabIndex={-1} >              
            <button
              className="block w-full py-1 text-left"
              onClick={(e) =>
                editViewHandler(e, {
                  _id: post._id,
                  postUser: userData,
                  mediaURL: post.mediaURL,
                  content: post.content,
                })
                
              }
            >
              Edit
            </button>
            <button
              className="block w-full py-1 text-left "
              onClick={() => deletePostHandler(post._id, post.username)}
            >
              Delete
            </button>
          </div>
        
        {userData.username === post.username && (
          <button
            onClick={() => editclick(post._id)}            
            className="flex items-center"
          >
            <i className="fa-solid fa-ellipsis-vertical text-white" />
          </button>
        )}
      </div>

      {/* User Info and Post Date */}
      <div
        className="flex items-center gap-x-3 pl-3 cursor-pointer w-6/12  "
        tabIndex="0"
        onClick={() => navigate(path.ACTUALUSERDETAIL+post.username)}//navigate(`/profile/${post.username}`)
      >
        <img
          src={userProfile.avatarUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"c
        />
        <span>
          <p className="text-white text-md font-semibold">
            {userProfile.firstName} {userProfile.lastName}{" "}
            <span className="inline text-xs font-thin">
              {new Date(post.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-white text-sm font-light">@{post.username}</p>
        </span>
      </div>
        </div>
      {/* Post Content and Image */}
      <div
        className="w-full flex flex-col items-center py-2 gap-y-3  px-20"
        onClick={() =>navigate(path.ACTUALPOSTDETAIL+post._id)} //navigate(`/post/${post._id}`)}
      >
        <p className="text-white text-lg">{post.content}</p>
        {post.mediaURL && (
          <img
            src={post.mediaURL}
            alt="Post Media"
            className="h-60 w-6/12 rounded-md object-cover"
          />
        )}
      </div>

      {/* Post Interactions */}
      <div className="pl-5 flex gap-x-5 py-3 items-center">
        <button
          className="flex gap-x-1 items-center"
          onClick={() => likepostHandler(post._id, post.username)}
        >
          <i
            className={`fa-heart ${
              posts.some((curpos)=>curpos._id===post._id && curpos.likes.likedBy.some(
                (user) => user && user._id === currentUserId
              ))
                ? "fa-solid"
                : "fa-regular"
            } text-pink-500`}
          />
          <p className="text-white">{post.likes.likeCount}</p>
        </button>
        <i className="fa-comment fa-regular text-white" />
        <button onClick={() => bookmarkPostHandler(post._id, post)}>
          <i
            className={`fa-bookmark ${
              allUsers.some((user)=>user._id===currentUserId && user.bookmarks.some((bookmark) => bookmark._id === post._id))
                ? "fa-solid"
                : "fa-regular"
            } text-green-500`}
          />
        </button>
      </div>
    </div>
  );
};

export default PostCard;

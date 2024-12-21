import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { route } from "../../routes/listRoute";
import {apiRequest} from '../../service/allservice'
import { fetchUsers } from "../../store/allusers";
import { allPostsFetch } from "../../store/allPost";
import { updateBookmark } from "../../store/allusers";
import { updatePostLike } from "../../store/allPost";
import { fetchUserLogIn } from "../../store/Login";

function Bookmark() {
    
  const dispatch=useDispatch();
  
  
  const {user:userData,status,currentUserId}=useSelector((state)=>state.login)
  const {allUsers,post:allUserStatus}=useSelector((state)=>state.allUser)
  const {posts,status:postStatus} =useSelector((state)=>state.allPosts)


useEffect(()=>{
  dispatch(fetchUsers())
},[allUserStatus,currentUserId])

useEffect(()=>{  
  if(postStatus==="idle"){
    dispatch(allPostsFetch())  
  }
},[postStatus,currentUserId])

  
useEffect(()=>{
  if(status==="idle"||status==="loading"){
  dispatch(fetchUserLogIn(currentUserId))
  }
},[status,currentUserId])



  function getAvatarUrl(username){ 
    
      const profileimage=allUsers.find((user)=>( user.username===username))      
      return profileimage.avatarUrl
      
  }



 const likepostHandler = async (postId, username) => {
  const isLiked = posts.some(
    (post) => post._id === postId && post.likes.likedBy.some((user) => user._id === currentUserId)
  );

  let url = '';
  if (isLiked) {
    route.DISLIKEPOST+postId;
    console.log()
    url = route.DISLIKEPOST+postId;
  } else {
    url = route.LIKEPOST+postId;
  }

  

  try {
    // Perform API request to like or dislike
    const { success, data, error } = await apiRequest({ method: 'POST', url: url });

    

    if (success) {
      // If the request was successful, update the UI state (likes)
      dispatch(updatePostLike({
        postId,
        currentUserId,
        isLiked: isLiked, // Toggle the like status
        userData
      }));
    } else {
      console.error("Failed to like/unlike the post:", error || "Unknown error");
    }
  } catch (err) {
    console.error("Error in likepostHandler:", err);
  }
};


  


  async function bookmarkPostHandler(postId,posted){
    try{
      
      const url=route.UNBOOKMARKPOST+postId
      const {success,data}=await apiRequest({method:"POST",url:url})    

     if(success){      
      const Data=posted;
        dispatch(updateBookmark({currentUserId,postId,Data}))         
     }

  }
  catch(e){
    console.error(e)
  }
  }

  
  if(!userData ) return <p>fetching </p>
  return (

     <div className="p-4">
       <h1 className="text-2xl text-white font-bold mb-4">Bookmarks</h1>
       <div className="grid gap-4">
  {allUsers.find((user) => user._id === currentUserId) &&
  allUsers.find((user) => user._id === currentUserId)?.bookmarks.length > 0 ? (
    allUsers
      .filter((user) => user._id === currentUserId)
      .map((user) =>
        user.bookmarks.map((bookmark) => (
          <div
            key={bookmark._id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-2">
              <img
                src={getAvatarUrl(bookmark.username)}
                alt={bookmark.username}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{bookmark.username}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-2">{bookmark.content}</p>
            {bookmark.mediaURL && (
              <img
                src={bookmark.mediaURL}
                alt="Bookmark"
                className="rounded-lg"
              />
            )}
            <div className=" flex gap-x-3 pl-3">
              <span className="gap-x-1 flex">
              <button onClick={() => likepostHandler(bookmark._id, bookmark)}>
                <i
                  className={`fa-heart text-pink-500 ${
                    posts?.some(
                      (post) =>
                        post._id === bookmark._id &&
                        post.likes.likedBy.some(
                          (user) => user._id === currentUserId
                        )
                    )
                      ? 'fa-solid'
                      : 'fa-regular'
                  }`}
                ></i>
              </button>
              {posts.find((posted)=>posted.username ==bookmark.username).likes.likeCount}
              </span>
              <button>
                <i className="fa-regular fa-comment"></i>
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => bookmarkPostHandler(bookmark._id, bookmark)}
              >
                <i className="fa-solid fa-bookmark text-green-500"></i>
              </button>
            </div>
          </div>
        ))
      )
  ) : (
    <p className="text-gray-400">No bookmarks found.</p>
  )}
</div>

     </div>
    
  );
}

export default Bookmark;

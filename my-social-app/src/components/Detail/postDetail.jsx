import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { allPostsFetch ,updatePostLike} from "../../store/allPost";
import { route } from "../../routes/listRoute";
import Sidebar from "../left/Sidebar";
import RightBar from "../right/RightBar";
import { fetchUsers } from "../../store/allusers";
import { updateBookmark } from "../../store/allusers";
import { fetchUserLogIn } from "../../store/Login";
import { apiRequest } from "../../service/allservice";

function PostDetail() {
  
  

  const {user:userData,status,userStatus,currentUserId}=useSelector((state)=>state.login)
  const {allUsers,status:allUserStatus}=useSelector((state)=>state.allUser)  
  const {posts,status:postsStatus}=useSelector((state)=>state.allPosts)

  const dispatch = useDispatch();
  const { id: postId } = useParams();
  //const [editpop,setEditPop]=useState("")
  const navigate = useNavigate();

  useEffect(()=>{
    if(allUserStatus==="idle"||allUserStatus==="loading"){
        dispatch(fetchUsers())
    }
  },[dispatch,currentUserId,allUserStatus])

  useEffect(()=>{
      if(status==="idle"||status==="loading"){
          dispatch(fetchUserLogIn(currentUserId))
      }
  },[dispatch,userStatus,currentUserId])

useEffect(()=>{
    if(postsStatus==="idle"||postsStatus==="loading"){
        dispatch(allPostsFetch())
    }
},[dispatch,currentUserId,postsStatus])


  



  // Loading, Error, and Empty States
  //if here i can see data why not updated after page refresh
   function findprofile(username){
     console.log("name=",username)// why not find
     const data=allUsers.find((user)=>user.username===username)
     console.log(data.avatarUrl)
     return data.avatarUrl;
   }
  console.log(postId)
  

  
    
  



  
  const GoBackHandler = () => {
    navigate(-1);
  };


   const likepostHandler = async (postId, username) => {
  
     const isLiked=posts.some((posted)=>posted._id===postId && posted.likes.likedBy.some((user)=>user._id===currentUserId))
      
     let url = '';
     if (isLiked) {
       url = route.DISLIKEPOST+postId;
     } else {
       url = route.LIKEPOST+postId;
     }
     const { success, data } = await apiRequest({method:"POST",url});
  
     if (success) {
     
     dispatch(updatePostLike({
      postId,
      currentUserId,
      isLiked,  
      userData
    }));

    
     } else {
       console.error("Failed to like/unlike the post");
     }
   };

   const bookmarkPostHandler=async (postId,postData)=>{
    
    const isBookmarked=allUsers.some((user)=>user._id===currentUserId && user.bookmarks.some((post)=>post._id===postId))
    console.log("isbookmark=",isBookmarked)    
    
    let url='';
    if(isBookmarked){
      url=route.UNBOOKMARKPOST+postId
    }
    else{
      url=route.BOOKMARKPOST+postId
    }


    const {success,data}=await apiRequest({method:"POST",url:url})    
    
     const post=postData;
     console.log("scuuess=",success)
      if(success){      
        const Data=postData
        dispatch(updateBookmark({currentUserId,postId,Data}))         
          console.log(posts)//data is here     
      }
  }

 
 
const postData=posts.find((post)=>post._id ===postId)  
console.log(posts)
if (postsStatus === "loading") return <p>Loading posts...</p>;
if (postsStatus === "failed") return <p>Failed to load posts</p>;
if (!postData) return <p>Post not found</p>;
if(allUserStatus=="idle"||allUserStatus=="loading"||allUsers.length<0) return <p>fetching</p>
if(!posts) return<p>fetch posts</p>
console.log("postData=",postData)

  return (    
    <div className="w-full flex  ">
      <div className="flex flex-col items-end w-3/12  h-screen">
        <div className="h-screen  w-3/12 flex justify-end">
      <Sidebar/>
      </div>
      </div>      
    <div className=" mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-6  w-6/12 max-h-max ">
      {/* Header Section */}      
      <button
        className="bg-transparent pb-2 rounded-sm px-2"
        onClick={GoBackHandler}
      >
        <i class="fa-solid fa-arrow-left" style={{color: "#ffffff"}}></i>
      </button>
      <div className="flex items-center space-x-4 w-6/12 " tabIndex={-1} onClick={()=>navigate(`/profile/${postData.username}`)}>        
      
        <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold" >
          <img src={findprofile(postData.username)} className="w-full h-full rounded-full " alt={postData.username[0]}/>
        </div>
        <div>
          <p className="text-lg font-bold">{postData.username}</p>
          <p className="text-sm text-gray-400">
            {new Date(postData.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div >
        <p className="text-lg  text-center">{postData.content}</p>
      </div>

      {/* Media Section */}
      {postData.mediaURL && (
        <div className="flex justify-center mb-6">
          <img
            src={postData.mediaURL}
            alt="Post Media"
            className="rounded-lg w-full max-w-2xl"
          />
        </div>
      )}

      {/* Actions Section */}
      <div className="flex justify-around border-t border-gray-700 pt-4">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white" onClick={()=>likepostHandler(postId)}>
          <i className={`fa-heart text-xl ${postData.likes.likedBy.some((user)=>user._id===currentUserId)?'fa-solid':'fa-regular'} text-pink-500 `}></i>
          <p>{postData.likes.likeCount || 0}</p>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <i className="fa-regular fa-comment text-xl"></i>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white" onClick={()=>bookmarkPostHandler(postId,postData)}>
          <i className={`fa-bookmark text-xl  ${allUsers.some((user)=>user._id===currentUserId && user.bookmarks.some((post)=>post._id===postId))?'fa-solid':'fa-regular'} text-green-500`}></i>
        </button>
      </div>

     
    </div>
      
    <div className="w-3/12   flex justify-start ml-3 " >      
        <div className=" fixed w-3/12 " style={{
            position: "fixed",            
            
            top: 0,
          }}>
      <RightBar/>
      </div>
    </div>
    </div>
  );
}

export default PostDetail;

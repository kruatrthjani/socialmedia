import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUserLogIn } from "../../store/Login";
import { apiRequest } from "../../service/allservice";
import { updatePostLike,allPostsFetch,updatePostDelete, updatePostContent} from "../../store/allPost";
import { fetchUsers } from "../../store/allusers";
import { updateBookmark } from "../../store/allusers";
import { updateFollow } from "../../store/allusers";
import Sidebar from '../left/Sidebar'
import { updateUserFollow } from "../../store/Login";
import RightBar from "../right/RightBar";
import { updateUser } from "../../store/allusers";
import { route } from "../../routes/listRoute"
import PostCard from '../middle/PostCard';
import EditPostForm from "../middle/EditPostForm";


function UserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [editpop,setEditPop]=useState("")
  const[editingPost,setEditingPost]=useState(null)
  const [isDisabled,setIsDisabled]=useState(false)
  const [currentUser,setCurrentUser]=useState({
    bio:'',
    webiste:'',
    image:'',
  })
  const [userPosts,setUserPosts]=useState([])
  
  const [isFollowing, setIsFollowing] = useState(true);  
  const [editProfile,setEditProfile]=useState({
    image:'',
    website:'',
    bio:''
  })
  
  const[isEnabled,setIsEnabled]=useState(false)
  const [profilePreview,setProfilePreview]=useState("")
  
  const dispatch=useDispatch();
  const[postContent,setPostContent]=useState('')
  const [imagePreview,setImagePreview]=useState(null)  
  const {user:userData,status,userStatus,currentUserId}=useSelector((state)=>state.login)
  const {allUsers,status:allUserStatus}=useSelector((state)=>state.allUser)
  const {posts,status:postsStatus}=useSelector((state)=>state.allPosts)
  
  
  
  useEffect(()=>{
    if(allUserStatus==="idle"||allUserStatus==="loading"){
        dispatch(fetchUsers())
    }
  },[allUserStatus])

  useEffect(()=>{
      if(status==="idle"||status==="loading"){
          dispatch(fetchUserLogIn(currentUserId))
      }
  },[status])

useEffect(()=>{
    if(postsStatus==="idle"){
        dispatch(allPostsFetch())
    }
},[postsStatus])


useEffect(()=>{
  async function user(){
    let url=route.GETUSERASNAME+username
    const {data}=await apiRequest({method:"GET",url:url});    
    setCurrentUser(data.user)
  }
  user();
      
},[allUsers,posts,username])
  
useEffect(()=>{
  async function post(){
    let url=route.USERPOSTS+username
    const {success,data}=await apiRequest({method:"GET",url:url});
    
    setUserPosts(data.posts)
  }
  post()
},[username,posts,allUsers])

 
  
  





  async function toggleFollow() {
    if (!currentUserId) return;    
    try{    
    const doesFollowing=allUsers.some((user)=>user._id===currentUserId && user.following.some((users)=>users.username===currentUser.username))
    let url=''
    if(doesFollowing){
      url= route.UNFOLOWUSER+currentUser._id
    }
    else{
      url=route.FOLLOWUSER+currentUser._id
    }
    const {success,updatedData}=await apiRequest({method:"POST",url:url});
      if(success){
        const currentUsername=currentUser.username
        dispatch(updateFollow({currentUserId,currentUsername}))
        
        dispatch(updateUserFollow({userId:currentUser._id,isFollowing:doesFollowing}))
      }    
    } catch (err) {
      console.error("is outer catch=",err);      
    }
  }


  async function EditUserHandler(e) {    
    e.preventDefault();
    
    
  
    try {
      const userData = {
        bio: editProfile.bio,
        avatarUrl: editProfile.image,
        website: editProfile.website,
      };
      let url = route.EDITUSER;

      const { success, data } = await apiRequest({ method:"POST", url: url, body: {userData}});
      console.log("data=",data)
      
      if (success) {
        // Check if any field has changed and update accordingly
        const updatedUser = {
          ...currentUser, // Keep the existing currentUser data
          ...(editProfile.bio !== currentUser.bio && { bio: data.user.bio }), // Only update if bio has changed
          ...(editProfile.website !== currentUser.website && { website: data.user.website }), // Only update if website has changed
          ...(editProfile.image && editProfile.image !== currentUser.avatarUrl && { avatarUrl: data.user.avatarUrl }), // Only update if avatarUrl has changed
        };
      
        


        // Update the local state (currentUser) with the new values if they have changed
        setCurrentUser(updatedUser);
        // Dispatch the action to update the user in the Redux store
        dispatch(updateUser({ 
          currentUserId, 
          bio: updatedUser.bio, 
          website: updatedUser.website, 
          avatarUrl: updatedUser.avatarUrl 
        }));
        
        
  
        // Disable the editing mode
        setIsEnabled(false);
      }
    } catch (e) {
      console.error("Error editing user:", e);
    }
  }
  
  async function editCancelHandler(){
    setIsDisabled(false);
    setImagePreview(null)
    setPostContent("")
    setEditPop("")
 }
  function handleFileChange(event){
      const file=event.target.files[0];
      if(file){
        const reader=new FileReader();
        reader.onloadend=()=>{
            setEditProfile((prev)=>({
              ...prev,
              image:reader.result,
        }));
        
        };
      reader.readAsDataURL(file); 
      }      
  };

  const postLikeHandler = async (postId) => {
    
    const isLiked = posts.some(
      (post) => post._id === postId && post.likes.likedBy.some((user) => user._id === currentUserId)
    );
    let url = '';
  if (isLiked) {
    url =route.DISLIKEPOST+postId;
  } else {
    url = route.LIKEPOST+postId;
  }

  

  const { success, data } = await apiRequest({method:"POST",url:url});    
        
  
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

  function findProfile(username){
    const data=allUsers.find((user)=>user.username===username);
    return data;
  }


  async function previewEditHandler(bio,website,image){
    
    
    setEditProfile({
      bio:bio,
      website:website,
      image:image,
    })    
    setIsEnabled(true);
  }


  const editViewHandler = async (e, {_id, postUser, mediaURL, content}) => {
    e.preventDefault();
    setImagePreview(mediaURL);
    setPostContent(content);
    setProfilePreview(postUser?.avatarUrl);
    setEditingPost(_id);
    setEditPop(_id);
    console.log("anything happened",_id); // this is printed
    setIsDisabled(true);
};
  const bookmarkHandler=async(postId)=>{    
    try{       
      const a=allUsers.find((user)=>user._id===currentUserId );
      console.log("booka rks=",a)
        const isBookmarked=allUsers.some((user)=>user._id ===currentUserId && user.bookmarks.some((post)=>post._id ===postId))
        console.log("isbookmark=",isBookmarked)
        const post=posts.find((post)=>post._id===postId)
        
        let url='';
        if(isBookmarked){
          url=route.UNBOOKMARKPOST+postId
        }
        else{
          url=route.BOOKMARKPOST+postId
        }
    
    
        const {success,data}=await apiRequest({method:"POST",url:url})    
    
    
         if(success){
          console.log(post)//data is here  
          const Data=post;
             dispatch(updateBookmark({currentUserId,postId,Data}))
             
         }
        
          
  }catch(e){
    console.error(e)  
  }
}
const editPostHandler=async(e)=>{
  setIsDisabled(true)
  e.preventDefault();
  
  console.log(editpop)
  console.log(editingPost)
       try {
         const fileInput = document.querySelector("input[type='file']");
         const file = fileInput?.files[0];
                   let base64Image = null;
         if (file) {
          const reader = new FileReader();
          base64Image = await new Promise((resolve, reject) => {
             reader.onload = () => resolve(reader.result);
             reader.onerror = () => reject(reader.error);
             reader.readAsDataURL(file); // Convert file to base64
           });
         }
  
         const postData = {
           content: postContent,
           mediaURL: base64Image || imagePreview, // Add base64-encoded image (optional)
         };
        console.log("postdata=",postData)
        const url=route.EDITPOST+editingPost;
         const {success}=await apiRequest({method:"POST",url:url,body:postData})
         if(success){
          console.log("edited post=",postData)
          setPostContent(""); 
          setImagePreview(null);
          setProfilePreview("")
          setIsDisabled(false)
          setEditPop("")


          if (fileInput) {
            fileInput.value = ''; // This clears the file input
          }


          const postId=editingPost;
          dispatch(updatePostContent({postId,postData}))
         }
        
        
 }        
catch(e){

}
}
 
function editclick(postId){        
  if(editpop=="")       {
    setEditPop(postId)                     
  }
  else{
    setEditPop("")
  }
         
     } 
     const deletePostHandler = async (postId,userId) => {
      try {
        console.log("postId=",postId)
        
        const url=route.DELETEPOST+postId
       const {success}=await apiRequest({method:"delete",url:url})
         
         if(success){            
           console.log("hereid=",postId)
           dispatch(updatePostDelete({postId}));             
         }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };
 
if (allUserStatus==="loading" ||allUserStatus==="idle"||!allUsers) return <p>loading data...</p>
if  (postsStatus==='loading'||postsStatus==="idle"||!posts) return <p>fetching posts...</p>
if(status==="idle"||status==="loading"||!userData) return <p>fetching data</p>
if(currentUser.bio=="") return <p>loading.valueOf..</p>
if (Object.keys(currentUser).length === 0) {
  return <p>Loading user data...</p>;
}

  
return (
  <div className="flex w-full min-h-screen text-gray-200">
    {/* Sidebar */}
    
    <div className={`w-3/12 ${isEnabled ? 'disabled-container ' : ''}    fixed `} >
      <div className={`   w-full flex justify-end  h-screen W-3/12`}>
      <Sidebar />
      </div>
    </div>
    {isDisabled && <EditPostForm
        
        profilePreview={profilePreview}
        postContent={postContent}
        setPostContent={setPostContent}
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
        editPostHandler={editPostHandler}
        editCancelHandler={editCancelHandler}
      />
   }
    {/* Edit Profile Form */}
    {isEnabled && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <form
      onSubmit={EditUserHandler}
      className="flex flex-col items-center gap-4 bg-gray-700 p-6 rounded-lg shadow-lg w-96"
    >
      <input
        type="text"
        name="bio"
        placeholder="Your bio"
        value={editProfile.bio}
        onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
        className="p-2 w-full rounded bg-gray-600 border-gray-500 text-gray-200"
      />
      <input
        type="url"
        name="portfolio"
        placeholder="Portfolio URL"
        value={editProfile.website}
        onChange={(e) => setEditProfile({ ...editProfile, website: e.target.value })}
        className="p-2 w-full rounded bg-gray-600 border-gray-500 text-gray-200"
      />
      {editProfile.image && (
        <img
          src={editProfile.image}
          alt="Avatar Preview"
          className="w-16 h-16 rounded-full"
        />
      )}
      <label htmlFor="file-input" className="cursor-pointer text-pink-500">
        <i className="fa-regular fa-image text-2xl"></i>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <div className="flex gap-2">
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Save
        </button>
        <button
          onClick={() => setIsEnabled(false)}
          className="bg-gray-500 text-gray-200 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}


    {/* Main Content */}
    <div className={`w-6/12 ${isEnabled ? 'disabled-container' : ''} flex flex-col items-center static ` } style={{marginLeft:"25%"}}>
      {/* User Profile */}
      <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md ">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-200">
            ← Back
          </button>
          <h1 className="text-xl font-bold">
            {currentUser?.firstName} {currentUser?.lastName}
          </h1>
          <p className="text-gray-500">{currentUser?.posts} posts</p>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <img
            src={currentUser?.avatarUrl}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{currentUser?.username}</h2>
            <p className="text-gray-400 mt-2">{currentUser?.bio}</p>
            {currentUser?.website && (
              <a
                href={currentUser?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {currentUser?.website}
              </a>
            )}
          </div>
          {currentUser._id !== currentUserId ? (
            <button
              onClick={toggleFollow}
              className={`px-4 py-2 rounded ${
                allUsers.some(
                  (user) =>
                    user._id === currentUserId &&
                    user.following.some((u) => u.username === currentUser.username)
                )
                  ? 'bg-gray-600 text-white'
                  : 'bg-pink-600 text-white hover:bg-pink-700'
              }`}
            >
              {allUsers.some(
                (user) =>
                  user._id === currentUserId &&
                  user.following.some((u) => u.username === currentUser.username)
              )
                ? 'Unfollow'
                : 'Follow'}
            </button>
          ) : (
            <button
              onClick={() =>
                previewEditHandler(currentUser.bio, currentUser.website, currentUser.avatarUrl)
              }
              className="border border-pink-500 text-pink-500 px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
    
      </div>
      <div className="bg-black w-full flex">
      <div className="flex-1 flex flex-col items-center font-bold text-2xl"><p>Followers </p><p>{allUsers.find((user)=>user.username===username).followers.length}</p></div>
            <div className="flex-1 flex flex-col items-center font-bold text-2xl"><p>Following </p><p>{allUsers.find((user)=>user.username===username).following.length}</p></div>
        </div>
      {/* Posts Section */}
      <h2 className="text-2xl font-bold mb-4 rounded-sm">Latest Posts</h2>
      {posts.map((post) => 
  post.username === username && (
    // <div
    //   key={post._id}
    //   className="w-full bg-gray-800 p-4 rounded-lg shadow-sm mb-4 flex flex-col"
    // >
    //   <div className="flex items-center gap-4">
    //     <img
    //       src={currentUser.avatarUrl}
    //       alt="Avatar"
    //       className="w-12 h-12 rounded-full object-cover"
    //     />
    //     <div>
    //       <h3 className="font-bold">
    //         {currentUser.firstName} {currentUser.lastName}
    //       </h3>
    //       <p className="text-gray-500 text-sm">
    //         {new Date(post.createdAt).toLocaleDateString()}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-center">
    //     <p className="mt-4">{post.content}</p>
    //     {post.mediaURL && (            
    //       <img src={post.mediaURL} alt="Post Media" className="mt-4 rounded-lg h-52 w-52" />            
    //     )}
    //   </div>
    //   <div className="flex gap-4 mt-4">
    //     <span className="flex gap-x-2">
    //       <button onClick={() => postLikeHandler(post._id)} className="text-pink-500">
    //         <i
    //           className={`fa-heart ${
    //             post.likes.likedBy.some((user) => user._id === currentUserId)
    //               ? 'fa-solid'
    //               : 'fa-regular'
    //           }`}
    //         ></i>
    //       </button>
    //       <p>{post.likes.likeCount}</p>
    //     </span>
    //     <i className="fa-regular fa-comment"></i>
    //     <button onClick={() => bookmarkHandler(post._id)} className="text-green-500">
    //       <i
    //         className={`fa-bookmark ${
    //           allUsers.some(
    //             (user) =>
    //               user._id === currentUserId &&
    //               user.bookmarks.some((p) => p._id === post._id)
    //           )
    //             ? 'fa-solid'
    //             : 'fa-regular'
    //         }`}
    //       ></i>
    //     </button>
    //   </div>      
    // </div>        
    <PostCard 
    key={post._id}
      editpop={editpop}
      currentUserId={currentUserId}
      editclick={editclick}
      editViewHandler={editViewHandler}
      allUser={allUsers}
      posts={posts}
      post={post}
      findProfile={findProfile}
      likepostHandler={postLikeHandler}
      deletePostHandler={deletePostHandler}
      bookmarkPostHandler={bookmarkHandler}
      userData={userData}
    />
  )
)}

      
    </div>

    {/* Right Sidebar */}
    <div className={`w-3/12 px-4 ${isEnabled ? 'disabled-container' : ''} fixed `} style={{right:"25px"}}>
      <RightBar />
    </div>
  </div>
);


}

export default UserDetail;

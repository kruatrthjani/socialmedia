import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiRequest } from "../../service/allservice";
import { allPostsFetch, updatePostDelete, updatePostLike,updatePostContent,sortPostsByToggle} from "../../store/allPost";
import { loginData,fetchUserLogIn } from "../../store/Login";
import { fetchUsers } from "../../store/allusers";
import { updateBookmark } from "../../store/allusers";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { route } from "../../routes/listRoute";
import PostCard from "./PostCard";
import PostInput from "./PostInput";
import EditPostForm from "./EditPostForm";


function HomePage() {
  // const userDatalogged=JSON.parse(localStorage.getItem('user'))
  // const currentUserId=userDatalogged._id;
  
  const location=useLocation();
  const dispatch=useDispatch()
  const[postContent,setPostContent]=useState('')
  const [imagePreview,setImagePreview]=useState(null)  
  const [editpop,setEditPop]=useState("")
  const [profilePreview,setProfilePreview]=useState("")
  const [isDisabled,setIsDisabled]=useState(false)
  const[editingPost,setEditingPost]=useState(null)
  const {user:userData,status,userStatus,currentUserId}=useSelector((state)=>state.login)
  const {allUsers,status:allUserStatus}=useSelector((state)=>state.allUser)
  const {posts,status:postsStatus}=useSelector((state)=>state.allPosts)
  
  
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(allUserStatus==="idle"||allUserStatus==="loading"){
        dispatch(fetchUsers())
    }
  },[allUserStatus])

  useEffect(()=>{
      if(status==="idle"||status==="loading"){        
          dispatch(fetchUserLogIn(currentUserId))
      }
  },[status,userData,dispatch])

useEffect(()=>{
    if(postsStatus==="idle"|| postsStatus==="loading"){            
        dispatch(allPostsFetch())
    }
},[postsStatus])






function profilePostHandler(username){
    const data=allUsers.find((user)=>user.username===userData.username)    
    return{
        avatarUrl:data.avatarUrl,
        firstname:data.firstName,
        lastname:data.lastName,                
    };
    
}


const likepostHandler = async (postId, username) => {
  
  const isLiked = posts.some(
    (post) => post._id === postId && post.likes.likedBy.some((user)=>user && user._id === currentUserId)
  );
  
  let url = '';
  if (isLiked) {
    url = route.DISLIKEPOST+postId;
  } else {
    url = route.LIKEPOST+postId;
  }

  

  const { success, data } = await apiRequest({method:"POST",url:url});    
  if (success) {
    const userData=allUsers.find((user)=>user._id===currentUserId)
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




const bookmarkPostHandler=async (postId,posted)=>{        
    const isBookmarked=allUsers.some((user)=>user._id===currentUserId && user.bookmarks.length>0 && user.bookmarks.some((post)=>post._id===postId))
    console.log("isbookmark=",isBookmarked)
    const post=posts.find((post)=>post._id===postId)
    let url='';
    if(isBookmarked){
      url=route.UNBOOKMARKPOST+postId;
    }
    else{
      url=route.BOOKMARKPOST+postId;
    }


    const {success,data}=await apiRequest({method:"POST",url:url})    

     if(success){      
      const Data=posts.find((post)=>post._id===postId);
        dispatch(updateBookmark({currentUserId,postId,Data}))         
        console.log("success")
     }
 }


 
 const handleFileChange = (event) => {
       const file = event.target.files[0];
       if (file) {
         const reader = new FileReader();
         console.log("reader=",reader)
         reader.onloadend = () => {
           setImagePreview(reader.result); // Set image preview URL
         };
         reader.readAsDataURL(file); // Convert file to base64
       }
     };




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
const postContentHandler=async(e)=>{
  e.preventDefault(); // Prevent page reload

       try {
         const fileInput = document.getElementById('file-input');
         const file = fileInput?.files[0];
  
         let base64Image = null;
         if (file) {
           const reader = new FileReader();
           base64Image = await new Promise((resolve, reject) => {
             reader.onload = () => resolve(reader.result);
             reader.onerror = () => reject(reader.error);
             reader.readAsDataURL(file);
           });
         
         }
  
         const postData = {
           content: postContent,
           mediaURL: base64Image, 
         };
         const url=route.CREATEPOST
         const {success,data}=await apiRequest({method:"POST",url:url,body:{postData}})
         if(success){            
            dispatch(allPostsFetch())
            setPostContent("")
            setImagePreview(null)
         }
        } catch (error) {
            console.error("Error creating post:", error);
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
  


     async function editCancelHandler(){
        setIsDisabled(false);
        setImagePreview(null)
        setPostContent("")
        setEditPop("")
     }

     function editclick(postId){        
      if(editpop=="")       {
        setEditPop(postId)                     
      }
      else{
        setEditPop("")
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

    

      function findProfile(username){
        const data=allUsers.find((user)=>user.username===username);
        return data;
      }
      function handleOption(e)
      {
        console.log("value=",e.target.value)
        const filter=e.target.value;
        dispatch(sortPostsByToggle({filter}))
      }

if (allUserStatus==="loading" ||allUserStatus==="idle"||!allUsers) return <p>loading data...</p>
if  (postsStatus==='loading'||postsStatus==="idle"||!posts) return <p>fetching posts...</p>
if(status==="idle"||status==="loading"||!userData) return <p>fetching data</p>



return(
  <div>    
  {location.pathname === "/home" && (
      <PostInput
        postContent={postContent}
        setPostContent={setPostContent}
        postContentHandler={postContentHandler}
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
      />
    )}
<div>

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
  <div className={`${isDisabled?'disabled-container':''}`}>
    <div className="w-full  flex justify-end ">      
    <label className="relative inline-flex items-center">
  {/* Icon inside the select */}
  <i className="fa-solid fa-filter absolute left-3 text-white"></i>

  {/* Custom select with padding to accommodate the icon */}
  <select
    onChange={(e) => handleOption(e)}
    className="bg-pink-500 text-white p-2 pl-10 rounded-md appearance-none cursor-pointer"
  >
    <option value="descending">Descending</option>
    <option value="ascending">Ascending</option>
    <option value="trending">Trending</option>
  </select>
</label>

  </div>
  {posts &&
      posts.map((post) => (
        <PostCard
          key={post._id}          
          editpop={editpop}
          currentUserId={currentUserId}
          editclick={editclick}
          editViewHandler={editViewHandler}
          allUser={allUsers}
          posts={posts}
          userData={userData}                              
          post={post}
          findProfile={findProfile}                    
          deletePostHandler={deletePostHandler}
          likepostHandler={likepostHandler}
          bookmarkPostHandler={bookmarkPostHandler}
        />
      ))}
  </div>

</div>
  

</div>  
)}

export default HomePage;

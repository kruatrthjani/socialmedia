import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation
import { fetchUsers } from '../../store/allusers';
import { fetchUserLogIn } from '../../store/Login';
import { path } from '../../routes/navigatepath';
import { logout } from '../../store/Login';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  // Access current path using useLocation()
  const {user:userData,status,userStatus,currentUserId}=useSelector((state)=>state.login)



 


  // Parse the token and get the user ID
  
  
  // Check if user data is present
  

//  const currentUserId = currentUserId._id;
  const { allUsers, status: allUserStatus } = useSelector((state) => state.allUser);
  useEffect(()=>{
    if(status==="idle"||status==="loading"){
        dispatch(fetchUserLogIn(currentUserId))
    }
},[status,currentUserId])


  // Redux state
  useEffect(() => {
    if (allUserStatus === "idle" || allUserStatus === "loading") {
      dispatch(fetchUsers());
    }
  }, [ currentUserId, allUserStatus]);
  

  const handleNavigation = (section) => {
    switch (section) {
      case 'home':
        navigate('/home');
        break;
      case 'explore':
        navigate('/home/explore');
        break;
      case 'bookmark':
        navigate('/home/bookmarks');
        break;
      default:
        break;
    }
  };
  function findProfile(id){    
    
    const data=allUsers.find((user)=>user._id===id);
    return data.avatarUrl;
  }

  if (allUserStatus === "idle" || allUserStatus === "loading") return <p>Fetching details</p>;
  if(userStatus==="idle"||userStatus==="loading"||!userData) return <p>fetching data</p>
  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Navigation */}
      <ul className="bg-slate-600 h-full text-white px-20">
        <li
          onClick={() => handleNavigation('home')}
          className={`cursor-pointer ${location.pathname === "/home" ? '' : 'pl-2'}`}
        >
          <p className={`${location.pathname === "/home" ? 'font-medium text-white px-2 rounded-2xl bg-slate-800 inline-block' : 'font-light'}`}>
            Home
          </p>
        </li>
        <li
          onClick={() => handleNavigation('explore')}
          className={`cursor-pointer ${location.pathname === "/home/explore" ? '' : 'pl-2'}`}
        >
          <p className={`${location.pathname === "/home/explore" ? 'font-medium text-white px-2 rounded-2xl bg-slate-800 inline-block' : 'font-light'}`}>
            Explore
          </p>
        </li>
        <li
          onClick={() => handleNavigation('bookmark')}
          className={`cursor-pointer ${location.pathname === "/home/bookmarks" ? '' : 'pl-2'}`}
        >
          <p className={`${location.pathname === "/home/bookmarks" ? 'font-medium text-white px-2 rounded-2xl bg-slate-800 inline-block' : 'font-light'}`}>
            Bookmark
          </p>
        </li>
        <li className="cursor-pointer">
          <button
            onClick={() => {              
              dispatch(logout())
              navigate("/login")
            }}
            className="font-medium text-white px-2 rounded-2xl bg-red-500 inline-block"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* User Info */}
      <div className="flex w-full items-center px-10 gap-x-2 bg-slate-600">
        <img 
          src={userData.avatarUrl} 
          alt="User Avatar" 
          className="h-8 w-8 rounded-full" 
          onClick={() => navigate(path.ACTUALUSERDETAIL+userData.username)}//navigate(`/profile/${userData.username}`)} 
        />
        <span>
          <span className="flex">
            <p className="font-medium text-white">{userData.firstName}</p>
            <p className="font-medium text-white">{userData.lastName}</p>
          </span>
          <p className="font-light text-sm text-white">@{userData.username}</p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './Login'
//import usersReducer from './userSlice'
//import postReducer from './postSlice'
import allUsersReducer from './allusers'
//import userDetailReducer from './userDetailSlice'
import allPostsReducer from './allPost'
//import  oneUser  from "./oneuserSlice";
//import userPosts from './userPostsSlice';
//import onepostslice from './onePost'
//import tempUserSlice from './tempUserSlice'

const store=configureStore({
        reducer:{
            login:loginReducer,                                     
            allPosts:allPostsReducer,            
            allUser: allUsersReducer,                        
        }
    })
export default store;
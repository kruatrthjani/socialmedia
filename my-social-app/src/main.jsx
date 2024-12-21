import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Allroutes.jsx'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { makeServer } from "./server";

makeServer();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>      
      <RouterProvider router={router} />
    </Provider>    
  </StrictMode>,
)

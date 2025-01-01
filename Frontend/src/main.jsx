import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId='663102204485-qvc2ij3vk6rl6isap52bdn9np7n25pci.apps.googleusercontent.com'>
    <App />
 </GoogleOAuthProvider>
)

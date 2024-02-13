import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { AuthProvider } from './Context/authContext.jsx'

axios.defaults.baseURL="http://localhost:5000"
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
<App />
  </AuthProvider>
)


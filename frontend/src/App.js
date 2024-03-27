import React from 'react'

import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'


import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'

import Navbar from './views/Navbar'

import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import SearchUsers from './views/SearchUsers'



function App() {
  return (
    <Router>
      <AuthProvider>
        < Navbar/>
        <Routes>
          
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />

          {/* Wrap the routes you want to protect with PrivateRoute logic */}
          <Route element={<PrivateRoute />}>
         
            <Route path="/inbox" element={<Message />} />
            <Route path="/inbox-message/:id" element={<MessageDetail />} />
            <Route path="/search/:username" element={<SearchUsers />} />
            {/* Add any other routes you want to protect here */}
          </Route>

          {/* You can add more public routes here if needed */}
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { Outlet } from 'react-router-dom'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "")

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='min-h-screen bg-background'>
      <ToastContainer />
      
      {token === "" ? (
        <div className="flex items-center justify-center min-h-screen">
          <Login setToken={setToken} />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar setToken={setToken} />
            
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/' element={<div className="text-center py-12">
                    <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
                    <p className="text-gray-600 mt-2">Select an option from the sidebar to get started</p>
                  </div>} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
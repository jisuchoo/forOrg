import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login.jsx"
import Search from "./pages/Search.jsx"

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem("empno")
    if(saved) setUser({ empno: saved })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/search" replace /> : <Login onLogin={setUser} />
        } />
        <Route path="/search" element={
          user ? <Search currentUser={user.empno} /> : <Navigate to="/" replace/>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

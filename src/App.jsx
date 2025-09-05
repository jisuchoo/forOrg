write(f"{root}/src/App.jsx", textwrap.dedent("""
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login.jsx"
import Search from "./pages/Search.jsx"
import AdminLogs from "./pages/AdminLogs.jsx"

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem("empno")
    if(saved){
      setUser({ empno: saved })
    }
  }, [])

  return (
    <BrowserRouter>
      <section className="screen">
        <div className="app-title">한화손보 동창원 SI 인수 가이드</div>
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/search" replace /> : <Login onLogin={setUser} />
          } />
          <Route path="/search" element={
            user ? <Search currentUser={user.empno}/> : <Navigate to="/" replace/>
          } />
          <Route path="/admin" element={<AdminLogs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}
")))

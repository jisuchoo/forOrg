import { useState, useEffect } from "react"
import Login from "./pages/Login.jsx"
import Search from "./pages/Search.jsx"

export default function App(){
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    const saved = localStorage.getItem('hwg_current_user')
    const savedAdmin = localStorage.getItem('hwg_is_admin') === 'true'
    if(saved){
      setUser(saved)
      setIsAdmin(savedAdmin)
    }
  },[])

  if(!user){
    return <Login onLogin={(empno, admin)=>{ setUser(empno); setIsAdmin(admin) }}/>
  }

  return <Search currentUser={user} isAdmin={isAdmin} onLogout={()=>{setUser(null); setIsAdmin(false)}}/>
}

import { useState, useEffect } from "react"
import Login from "./pages/Login.jsx"
import Search from "./pages/Search.jsx"

export default function App() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // 앱 처음 로드될 때 세션 값 확인
  useEffect(() => {
    const saved = sessionStorage.getItem('hwg_current_user')
    const savedAdmin = sessionStorage.getItem('hwg_is_admin') === 'true'
    if (saved) {
      setUser(saved)
      setIsAdmin(savedAdmin)
    }
  }, [])

  // 로그아웃 함수
  const handleLogout = () => {
    sessionStorage.removeItem('hwg_current_user')
    sessionStorage.removeItem('hwg_is_admin')
    setUser(null)
    setIsAdmin(false)
  }

  if (!user) {
    return (
      <Login
        onLogin={(empno, admin) => {
          setUser(empno)
          setIsAdmin(admin)
        }}
      />
    )
  }

  return (
    <Search
      currentUser={user}
      isAdmin={isAdmin}
      onLogout={handleLogout}
    />
  )
}

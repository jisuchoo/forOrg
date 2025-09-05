import { useState, useEffect } from "react"

export default function Login({ onLogin }){
  const [empno, setEmpno] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const [employees, setEmployees] = useState([])
  useEffect(()=>{
    fetch("/data/employees.json?t="+Date.now(), { cache:"no-store" })
      .then(r=>r.json()).then(setEmployees).catch(()=>setMsg("데이터 로드 실패"))
  }, [])

  const handleLogin = ()=>{
    const ok = employees.find(u=>u.empno === empno.trim() && u.password === password.trim())
    if(ok){
      localStorage.setItem("empno", empno.trim())
      onLogin({ empno: empno.trim() })
    } else {
      setMsg("사번 또는 비밀번호 오류")
    }
  }

  return (
    <div className="login-card">
      <h1>신주안지점 SI 인수 가이드</h1>
      <input placeholder="사번" value={empno} onChange={e=>setEmpno(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}

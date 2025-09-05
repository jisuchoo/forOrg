write(f"{root}/src/pages/Login.jsx", textwrap.dedent("""
import { useEffect, useState } from "react"

export default function Login({ onLogin }){
  const [employees, setEmployees] = useState([])
  const [empno, setEmpno] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    // fetch employees.json from public/data
    async function load(){
      try{
        const res = await fetch(`/data/employees.json?t=${Date.now()}`, { cache:"no-store" })
        const data = await res.json()
        setEmployees(data)
      }catch(e){
        setMsg("데이터 로드 실패")
      }
    }
    load()
  }, [])

  const handleLogin = ()=>{
    if(!employees.length){
      setMsg("데이터가 로드되지 않았습니다.")
      return
    }
    const ok = employees.find(u => String(u.empno).trim()===empno.trim() && String(u.password).trim()===password.trim())
    if(ok){
      localStorage.setItem("empno", empno.trim())
      setMsg("")
      onLogin({ empno: empno.trim() })
    }else{
      setMsg("사번 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <div className="card">
      <h2>로그인</h2>
      <div className="row">
        <input placeholder="사번 입력" value={empno} onChange={e=>setEmpno(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
      </div>
      <div className="row">
        <input type="password" placeholder="비밀번호 입력" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
        <div className="hint">사번과 비밀번호는 승인된 목록에 있어야 합니다.</div>
      </div>
      <button onClick={handleLogin}>로그인</button>
      {msg && <div className="error" role="alert" aria-live="polite">{msg}</div>}
      <div className="meta">데이터: 승인사번 {employees.length}건</div>
    </div>
  )
}
")))

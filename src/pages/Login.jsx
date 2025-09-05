import { useEffect, useState } from "react"

const EMP_URL = "/data/employees.json"
const ADMIN = { empno: "8092960", password: "cjs1110" }

export default function Login({ onLogin }){
  const [empno, setEmpno] = useState("")
  const [password, setPassword] = useState("")
  const [employees, setEmployees] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    fetch(EMP_URL+"?t="+Date.now(),{cache:"no-store"})
      .then(r=>r.json()).then(setEmployees).catch(()=>setMsg("데이터 로드 실패"))
  },[])

  const handleLogin = ()=>{
    if(!empno||!password){ setMsg("코드와 비밀번호를 입력하세요."); return }

    if(empno===ADMIN.empno && password===ADMIN.password){
      localStorage.setItem("hwg_current_user", empno)
      localStorage.setItem("hwg_is_admin","true")
      onLogin(empno,true)
      return
    }

    const ok = employees.find(e=>e.empno===empno && e.password===password)
    if(ok){
      localStorage.setItem("hwg_current_user", empno)
      localStorage.removeItem("hwg_is_admin")
      onLogin(empno,false)
    }else{
      setMsg("코드 또는 비밀번호 오류")
    }
  }

  return (
    <section className="screen">
      <div className="app-title">신주안지점 SI 인수 가이드</div>
      <div className="card">
        <h2>로그인</h2>
        <div className="row"><input placeholder="코드 입력" value={empno} onChange={e=>setEmpno(e.target.value)} /></div>
        <div className="row"><input type="password" placeholder="비밀번호 입력" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button onClick={handleLogin}>로그인</button>
        {msg && <div className="error">{msg}</div>}
        <div className="meta">승인사번 {employees.length}건</div>
      </div>
    </section>
  )
}

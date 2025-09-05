import { useEffect, useState } from "react"

const EMP_URL = "/data/employees.json"
const ADMIN = { empno: "8091768", password: "dcw8091" }

export default function Login({ onLogin }) {
  const [empno, setEmpno] = useState("")
  const [password, setPassword] = useState("")
  const [employees, setEmployees] = useState([])
  const [msg, setMsg] = useState("")

  // 직원 데이터 로드
  useEffect(() => {
    fetch(EMP_URL + "?t=" + Date.now(), { cache: "no-store" })
      .then(r => r.json())
      .then(setEmployees)
      .catch(() => setMsg("데이터 로드 실패"))
  }, [])

  // 로그인 처리
  const handleLogin = () => {
    if (!empno || !password) {
      setMsg("코드와 비밀번호를 입력하세요.")
      return
    }

    // 관리자 계정
    if (empno === ADMIN.empno && password === ADMIN.password) {
      sessionStorage.setItem("hwg_current_user", empno)   // localStorage → sessionStorage
      sessionStorage.setItem("hwg_is_admin", "true")
      onLogin(empno, true)
      return
    }

    // 일반 직원 계정
    const ok = employees.find(e => e.empno === empno && e.password === password)
    if (ok) {
      sessionStorage.setItem("hwg_current_user", empno)   // localStorage → sessionStorage
      sessionStorage.removeItem("hwg_is_admin")
      onLogin(empno, false)
    } else {
      setMsg("코드 또는 비밀번호 오류")
    }
  }

  return (
    <section className="screen">
      <div className="app-title">한화손보 유병자 인수 가이드</div>
      <div className="card">
        <h2>로그인</h2>
        <div className="row">
          <input
            placeholder="코드 입력"
            value={empno}
            onChange={e => setEmpno(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>로그인</button>
        {msg && <div className="error">{msg}</div>}
        <div className="meta">승인사번 {employees.length}건</div>
        <div className="meta">Copyright 2025 하세봉</div>
      </div>
    </section>
  )
}

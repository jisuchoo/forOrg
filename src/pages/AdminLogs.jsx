import { useState } from "react"
import { loadLogs } from "../utils/storage.js"
import { useNavigate } from "react-router-dom"

export default function AdminLogs(){
  const [pw, setPw] = useState("")
  const [err, setErr] = useState("")
  const [logs, setLogs] = useState([])
  const nav = useNavigate()

  const onLoad = ()=>{
    if(pw !== "admin123"){
      setErr("관리자 비밀번호가 올바르지 않습니다.")
      return
    }
    setErr("")
    setLogs(loadLogs())
  }

  return (
    <div className="card container-narrow">
      <h2>사용자 활동 로그</h2>
      <div className="row">
        <input type="password" placeholder="관리자 비밀번호 입력" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onLoad()}/>
      </div>
      <div style={{display:'flex', gap:'8px'}}>
        <button onClick={onLoad}>로그 불러오기</button>
        <button className="secondary" onClick={()=>nav('/search')}>검색화면으로</button>
      </div>
      {err && <div className="error">{err}</div>}
      <div className="results">
        {logs.length===0 && <div className="hint">로그 데이터가 없습니다.</div>}
        {logs.map((log, i)=>(
          <div key={i} className="log-card">
            <div className="log-header">사번: {log.empno} - {log.action==='login'?'로그인':'검색'}</div>
            <div className="log-time">{log.date}</div>
            {log.details && <div className="log-search">검색어: "{log.details}"</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

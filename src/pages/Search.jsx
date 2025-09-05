import { useEffect, useMemo, useState } from "react"
import ResultCard from "../components/ResultCard.jsx"
import { saveLog } from "../utils/storage.js"
import { useNavigate } from "react-router-dom"

function normalize(str){
  return String(str || "").toLowerCase().replace(/[\\s·,\\-\\.]/g, "")
}

export default function Search({ currentUser }){
  const [q, setQ] = useState("")
  const [all, setAll] = useState([])
  const [filtered, setFiltered] = useState([])
  const nav = useNavigate()

  useEffect(()=>{
    async function load(){
      const res = await fetch(`/data/diseases.json?t=${Date.now()}`, { cache:"no-store" })
      const data = await res.json()
      setAll(Array.isArray(data)? data : [])
    }
    load()
  }, [])

  const onSearch = ()=>{
    if(!q.trim()){
      setFiltered([])
      return
    }
    saveLog(currentUser, 'search', q)
    const tokens = q.split(/[\\s·,\\-\\.]+/).filter(Boolean).map(normalize)
    const matched = all.filter(d=>{
      const name = normalize(d.name)
      if(tokens.every(t=>name.includes(t))) return true
      if(tokens.length===1){
        const token=tokens[0]
        if(token.length>=3){
          for(let i=2;i<=token.length-2;i++){
            const left=token.substring(0,i), right=token.substring(i)
            if(left.length>=2 && right.length>=2){
              const lp=name.indexOf(left), rp=name.indexOf(right)
              if(lp>=0 && rp>=0 && lp<rp) return true
            }
          }
        }
      }
      return false
    })
    setFiltered(matched)
  }

  const logout = ()=>{
    localStorage.removeItem('empno')
    nav('/')
  }

  return (
    <div className="card container-narrow">
      <div className="nav">
        <button className="secondary" onClick={()=>nav('/admin')}>관리자 로그</button>
        <button className="secondary" onClick={logout}>로그아웃</button>
      </div>
      <h2 style={{marginBottom:'.5rem'}}>질병명 검색</h2>
      <div className="row">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="예시: 용종, 골절, 당뇨 등" onKeyDown={e=>e.key==='Enter'&&onSearch()}/>
      </div>
      <button onClick={onSearch} title="검색">검색</button>
      <div className="results">
        {q && filtered.length===0 && <div className="hint">검색 결과가 없습니다.</div>}
        {filtered.map((d, idx)=> <ResultCard key={idx} d={d} />)}
      </div>
      <div className="meta">질병데이터 {all.length}건</div>
    </div>
  )
}


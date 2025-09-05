import { useState, useEffect } from "react"
import ResultCard from "../components/ResultCard.jsx"
import InsuranceContacts from "../components/InsuranceContacts.jsx"

const DIS_URL = "/data/diseases.json"

function normalize(str){
  return String(str||"").toLowerCase().replace(/[\s·,\-\.]/g,"")
}

export default function Search({ currentUser, isAdmin, onLogout }){
  const [q,setQ] = useState("")
  const [diseases,setDiseases] = useState([])
  const [results,setResults] = useState([])
  const [msg,setMsg] = useState("")

  useEffect(()=>{
    fetch(DIS_URL+"?t="+Date.now(),{cache:"no-store"})
      .then(r=>r.json()).then(setDiseases).catch(()=>setMsg("데이터 로드 실패"))
  },[])

  const onSearch = ()=>{
    if(!q){ setResults([]); return }
    const tokens = q.split(/[\s·,\-\.]+/).filter(Boolean).map(normalize)
    const matched = diseases.filter(d=>{
      const name=normalize(d.name)
      if(tokens.every(t=>name.includes(t))) return true
      if(tokens.length===1){
        const t=tokens[0]
        if(t.length>=3){
          for(let i=2;i<=t.length-2;i++){
            const l=t.substring(0,i), r=t.substring(i)
            if(l.length>=2&&r.length>=2){
              const lp=name.indexOf(l), rp=name.indexOf(r)
              if(lp>=0&&rp>=0&&lp<rp) return true
            }
          }
        }
      }
      return false
    })
    setResults(matched)
    if(!matched.length) setMsg("검색 결과가 없습니다."); else setMsg("")
  }

  return (
    <section className="screen">
      <div className="user-info">
        로그인: {currentUser}{isAdmin?" (관리자)":""}
        <button className="logout" onClick={onLogout}>로그아웃</button>
      </div>
      <div className="app-title">한화손보 유병자 인수 가이드</div>
      <div className="card container-narrow">
        <h2>질병명 검색</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="예시: 용종, 골절, 당뇨 등" onKeyDown={e=>e.key==='Enter'&&onSearch()}/>
        <button onClick={onSearch}>검색</button>
        {msg && <div className="hint">{msg}</div>}
        {results.length>0 ? (
          results.map((d,i)=><ResultCard key={i} d={d}/>)
        ):(
          <InsuranceContacts/>
        )}
        <div className="meta">질병데이터 {diseases.length}건</div>
      </div>
    </section>
  )
}

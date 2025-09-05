import { useState, useEffect } from "react"
import ResultCard from "../components/ResultCard.jsx"

export default function Search({ currentUser }){
  const [q, setQ] = useState("")
  const [diseases, setDiseases] = useState([])
  const [results, setResults] = useState([])

  useEffect(()=>{
    fetch("/data/diseases.json?t="+Date.now(), { cache:"no-store" })
      .then(r=>r.json()).then(setDiseases)
  }, [])

  const onSearch = ()=>{
    const token = q.trim().toLowerCase()
    const matched = diseases.filter(d => d.name.includes(token))
    setResults(matched)
  }

  return (
    <div className="search-page">
      <h1>질병명 검색</h1>
      <input placeholder="예: 고혈압" value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={onSearch}>검색</button>
      <div className="results">
        {results.map((d,i)=><ResultCard key={i} d={d} />)}
        {q && results.length===0 && <p>검색 결과가 없습니다.</p>}
      </div>
    </div>
  )
}

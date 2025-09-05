export default function ResultCard({ d }){
  return (
    <div className="result-card">
      <div className="result-title">{d.name}</div>
      <div className="result-sub">인수기준: {d.acceptance||"-"}</div>
      <div className="result-sub">시그니처355: {d.signature355||"-"}</div>
      <table className="info-table">
        <thead><tr><th>치료일수</th><th>수술여부</th><th>재발여부</th></tr></thead>
        <tbody>
          <tr>
            <td>{d.treatmentDays||"-"}</td>
            <td>{d.surgery||"-"}</td>
            <td>{d.recurrence||"-"}</td>
          </tr>
        </tbody>
      </table>
      <div className="restrictions">제한사항: {d.restrictions||"없음"}</div>
    </div>
  )
}

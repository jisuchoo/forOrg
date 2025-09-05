const COMPANIES = [
  { company:"한화손해보험", callCenter:"1566-8000", fax:"0502-779-1004", termsUrl:"https://www.hwgeneralins.com/notice/ir/product-ing01.do" },
  { company:"삼성화재", callCenter:"1588-5114", fax:"0505-162-0872", termsUrl:"https://www.samsungfire.com/vh/page/VH.HPIF0103.do" },
  // ... (나머지 동일하게 추가)
]

export default function InsuranceContacts(){
  return (
    <div className="insurance-section">
      {COMPANIES.map((c,i)=>(
        <div key={i} className="insurance-card small">
          <div className="insurance-logo small">{c.company}</div>
          <div className="insurance-info small">
            <div className="contact-item small">📞 <a href={`tel:${c.callCenter.replace(/-/g,"")}`}>{c.callCenter}</a></div>
            <div className="contact-item small">📄 {c.fax}</div>
            <div className="contact-item small">📚 <a href={c.termsUrl} target="_blank">바로가기</a></div>
          </div>
        </div>
      ))}
    </div>
  )
}

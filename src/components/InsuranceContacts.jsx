import { useEffect, useState } from "react"

export default function InsuranceContacts(){
  const [list,setList] = useState([])

  useEffect(()=>{
    fetch("/data/insurances.json?t="+Date.now(),{cache:"no-store"})
      .then(r=>r.json()).then(setList)
  },[])

  const grouped = {
    손해보험: list.filter(c=>c.type==="손해보험" && !c.highlight),
    생명보험: list.filter(c=>c.type==="생명보험"),
    공제: list.filter(c=>c.type==="공제")
  }
  const hanwha = list.find(c=>c.highlight)

  return (
    <div className="insurance-section">
      {hanwha && (
        <div className="insurance-card hanwha">
          <div className="insurance-logo">{hanwha.company}</div>
          <div className="insurance-info">
            <div className="insurance-contact">
              <div className="contact-item">📞 콜센터<a href={`tel:${hanwha.callCenter.replace(/-/g,"")}`}>{hanwha.callCenter}</a></div>
              <div className="contact-item">📄 보험금청구{hanwha.fax}</div>
              <div className="contact-item">📚 공시실<a href={hanwha.termsUrl} target="_blank">바로가기</a></div>
            </div>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([cat, items])=>(
        <div key={cat} className="insurance-category">
          <h3>{cat}</h3>
          <div className="insurance-grid">
            {items.map((c,i)=>(
              <div key={i} className="insurance-card small">
                <div className="insurance-logo small">{c.company}</div>
                <div className="insurance-info small">
                  <div className="contact-item small">📞 콜센터<a href={`tel:${c.callCenter.replace(/-/g,"")}`}>{c.callCenter}</a></div>
                  <div className="contact-item small">📄 보험금청구{c.fax}</div>
                  <div className="contact-item small">📚 공시실<a href={c.termsUrl} target="_blank">바로가기</a></div>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

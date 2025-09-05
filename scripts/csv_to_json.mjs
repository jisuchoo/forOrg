import fs from 'fs'

// Usage: node scripts/csv_to_json.mjs input.csv output.json
const [,, inFile, outFile] = process.argv
if(!inFile || !outFile){
  console.error('Usage: node scripts/csv_to_json.mjs input.csv output.json')
  process.exit(1)
}

const raw = fs.readFileSync(inFile, 'utf-8')
const lines = raw.split(/\r?\n/).filter(Boolean)
const header = lines[0].split(',').map(h=>h.trim())

const getIdx = (regex) => header.findIndex(h=>regex.test(h))
const nameIdx = getIdx(/name|질병명/i)
const acceptanceIdx = getIdx(/acceptance|인수/i)
const sigIdx = getIdx(/signature355|시그니처/i)
const treatIdx = getIdx(/treatmentDays|치료일수/i)
const surgeryIdx = getIdx(/surgery|수술/i)
const recurIdx = getIdx(/recurrence|재발/i)
const restrIdx = getIdx(/restrictions|제한/i)

const toRow = (line)=>{
  const cells = []
  let cur = '', inQuotes = false
  for(const ch of line){
    if(ch === '"'){ inQuotes = !inQuotes; continue }
    if(ch === ',' && !inQuotes){ cells.push(cur); cur = ''; continue }
    cur += ch
  }
  cells.push(cur)
  const pick = (idx)=> idx>=0 && idx<cells.length ? cells[idx].trim() : ''
  return {
    name: pick(nameIdx),
    acceptance: pick(acceptanceIdx),
    signature355: pick(sigIdx),
    treatmentDays: pick(treatIdx),
    surgery: pick(surgeryIdx),
    recurrence: pick(recurIdx),
    restrictions: pick(restrIdx)
  }
}

const out = lines.slice(1).map(toRow).filter(r=>r.name)
fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf-8')
console.log(`Wrote ${out.length} records to ${outFile}`)

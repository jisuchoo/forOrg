export function saveLog(empno, action, details = '') {
  const log = {
    empno,
    action,
    details,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleString('ko-KR')
  };
  const logs = JSON.parse(localStorage.getItem('userLogs') || '[]');
  logs.push(log);
  if(logs.length > 500) logs.splice(0, logs.length - 500);
  localStorage.setItem('userLogs', JSON.stringify(logs));
}

export function loadLogs() {
  const logs = JSON.parse(localStorage.getItem('userLogs') || '[]');
  return logs.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp));
}

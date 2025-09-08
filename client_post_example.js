// File: client_post_example.js
async function sendBackstoryToSheet(payload){
  try{
    const res = await fetch(YOUR_APPS_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const j = await res.json().catch(()=>({ ok:false, error:'Invalid JSON response' }));
    if(!j.ok){ throw new Error(j.error || 'Unknown sheet error'); }
    console.log('Backstory saved');
  }catch(err){
    console.warn('Backstory error:', err.message);
    const diag = document.getElementById('sheetDiag');
    if (diag) diag.textContent = 'Backstory error: ' + err.message;
  }
}
// Example call:
// sendBackstoryToSheet({ sheetId:'YOUR_SHEET_ID', tab:'Backstories', name:userName, number:inputNumber, tone:tone, finalBase:finalBase, reading:longReadingText, backstory:generatedBackstoryText });

// File: GSHEETS_WEBAPP.gs
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.openById(data.sheetId || PropertiesService.getScriptProperties().getProperty('SHEET_ID'));
    var sh = ss.getSheetByName(data.tab || 'Backstories');
    if (!sh) throw new Error('Sheet "Backstories" not found');
    var headers = ['Timestamp','Name','Number','Tone','FinalBase','Reading','Backstory','ClientIP','UserAgent'];
    var firstRow = sh.getRange(1,1,1,headers.length).getValues()[0];
    var needHeaders = false;
    for (var i=0;i<headers.length;i++) if (firstRow[i] !== headers[i]) { needHeaders = true; break; }
    if (needHeaders) sh.getRange(1,1,1,headers.length).setValues([headers]);
    var row = [
      new Date(),
      data.name || '',
      data.number || '',
      data.tone || '',
      data.finalBase || '',
      (data.reading || '').toString().slice(0, 50000),
      (data.backstory || '').toString().slice(0, 50000),
      (e.parameter['X-Forwarded-For'] || e.parameter['ip'] || ''),
      (e.parameter['ua'] || '')
    ];
    sh.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

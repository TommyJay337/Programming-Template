function createMaxList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const target = ss.getSheetByName('Rep PR Data');
  const sheets = ss.getSheets(); //gets all the sheets in a spreadsheet 
  const results = [['Week', 'Exercise', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10','e1RM']];

  // Syntax: forEach((element) => {})
  sheets.forEach(s => { 
    const name = s.getName() //Name of every tab in the spreadsheet
    if (!name.match(/Week[\s\S]\d/)) { //if name=false
    // forward slash opens and closes RegExp
    // [] specifies matches for characters inside the brackets 
    // Metacharacters \s:Global search for whitespace characters,\S:Global search for non-space characters,\d:Global search for digits
      return; //return value of forEach is always discarded
    }
    const tableCol = s.getRange("RepPrTracking").getColumn();
    s.getRange(3,tableCol, s.getLastRow() - 2, 12).getValues()
      .forEach((row) => {
        const [exc] = row
        if (exc == "" || exc == "Reps:" || !exc) {
          return;
        }
        results.push([name, ...row])
      })
  })

  target.getDataRange().clearContent() //clears 'Rep PR Data' tab
  target.getRange(1, 1, results.length, results[0].length).setValues(results) //places data in 'Rep PR Data'

}

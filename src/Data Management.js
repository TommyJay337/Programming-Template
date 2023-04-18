function mainDataUpdate(){ //the function associated with the 'Dashboard' button
  createMaxList();
  updateDataTab();
  SpreadsheetApp.getUi().alert("Data updated")
}

function updateDataTab() {
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName("Data");
  let range = sheet.getRange(4, 2, 52, 55);
  let formulas = range.getFormulas();
  range.clearContent();
  SpreadsheetApp.flush();
  range.setFormulas(formulas);
}

function updateRepPrLut() {
  let ss = SpreadsheetApp.getActive();
  let sheet2 = ss.getSheetByName("Rep PR LUT");
  let range2 = sheet2.getRange(1, 1, 60, 156);
  let formulas2 = range2.getFormulas();
  range2.clearContent();
  SpreadsheetApp.flush();
  range2.setFormulas(formulas2);
  SpreadsheetApp.getUi().alert("Rep PR Table Updated")
}

/*
// adds a dropdown menu to the Google Sheets Interface
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Scripts")
    .addItem("Update Data","mainDataUpdate")
    .addToUi();

}
*/
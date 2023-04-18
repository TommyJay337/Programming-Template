function onEdit() {

  dynamicDropdown();
  checkBox();

// This function allows for dynamic dependent dropdowns on the tabs that include "Week" in the name
function dynamicDropdown(){
    var tabLists = "Exercise Index";
    var spreadsheet = SpreadsheetApp;
    var activeSheet = spreadsheet.getActiveSpreadsheet().getActiveSheet();
    var data = spreadsheet.getActiveSpreadsheet().getSheetByName(tabLists);
    
    var activeCell = activeSheet.getActiveCell();
    
    if(activeCell.getColumn() == 1 && activeCell.getRow() > 3 && activeSheet.getSheetName().includes("Week")){
      
      activeCell.offset(0, 1).clearDataValidations(); //Clears data validation 1 column over
      
      var exerciseCat = data.getRange(1, 1, 1, data.getLastColumn()).getValues();
      
      var catIndex = exerciseCat[0].indexOf(activeCell.getValue()) + 1;
      
      if(catIndex != 0){
      
          var validationRange = data.getRange(2, catIndex, data.getLastRow());
          var validationRule = spreadsheet.newDataValidation().requireValueInRange(validationRange).build();
          activeCell.offset(0, 1).setDataValidation(validationRule);
    
      }  
        
    }
    
  }

// This function checks the box next to the weekly tab title once complete, and then sends an e-mail
function checkBox(){
  var spreadsheet = SpreadsheetApp;
  var sheet = spreadsheet.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(4,2); //B4
  var row = (range.getNextDataCell(SpreadsheetApp.Direction.DOWN).getLastRow())-3; //gets the last row with data
  var excCol = sheet.getRange("excRange").getColumn(); //references the column of a named range "excRange" (B)
  var completedCol = sheet.getRange("completedRange").getColumn(); //references named range "completedRange"(V)
  var firstRange = sheet.getRange(4,excCol,row).getValues().flat(); //gets the values present in column B
  var secondRange = sheet.getRange(4,completedCol,row,4).getValues().flat(); // gets the values in column A
  var target = sheet.getRange(1,31); // AE1 where the checkbox is present

  //Logger.log(completedCol)

  //If the firstRange AND secondRange do not include blanks AND the sheet name includes "Week"
  if (!firstRange.includes('') && !secondRange.includes('') && sheet.getSheetName().includes("Week")) {

    target.setValue("true"); //set checkbobx in AE1 to "true" aka checkmark
    console.log("target set to true")

    var activeSpreadsheet = spreadsheet.getActiveSpreadsheet();
    var activeSheet = activeSpreadsheet.getActiveSheet();
    var checkboxRange = activeSheet.getRange(1,31); // 'AE1'
    var checkbox = checkboxRange.getValue(); // true
    var title = activeSheet.getRange(1,4).getValue();
    var recipientRange = activeSpreadsheet.getSheetByName("DASHBOARD").getRange(8,4);
    var recipient = recipientRange.getValue();

    if(checkbox == true && activeSheet.getSheetName().includes("Week")) {

      var templ = HtmlService.createTemplateFromFile('index').evaluate();
      var htmlMessage = templ.getContent();
      var message = {
        to: recipient,
        subject: "Congrats on finishing" + ": " + title,
        htmlBody: htmlMessage,
        replyTo: "thomas.strengthcoach@gmail.com",
        name: "Coach Thomas"

      }

      console.log("email sent");
      MailApp.sendEmail(message);

    } else {

      console.log("email not sent");

      }


  //If the firstRange OR the secodRange include a blank, AND the sheet name includes "Week"
  } else if ((firstRange.includes('') || secondRange.includes('')) && sheet.getSheetName().includes("Week")) {
    
    target.setValue("false"); //set checkbobx in AE1 to "false" aka uncheck

  }

}

}
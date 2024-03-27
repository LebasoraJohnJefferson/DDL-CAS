function getData() {
  const ss= SpreadsheetApp.getActiveSpreadsheet();
  const ws=ss.getSheetByName("Customer");
  const dataRange= ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();
  const headers = data.shift();


  const jsonData = data.map(row=>{
    const tempObject = {}
    headers.forEach((header,index) =>{
      tempObject[header] = row[index];
    })
    return tempObject;
  })

  jsonData.sort((a, b) => {
    const arrA = a["Id"].split("-");
    const arrB = b["Id"].split("-");
    const joinA = arrA.join("");
    const joinB = arrB.join("");
    return parseInt(joinB) - parseInt(joinA)
  });

  

  
  
  return {"data":jsonData,"headers":headers};
}


function editCell(props){
  const ss= SpreadsheetApp.getActiveSpreadsheet();
  const ws=ss.getSheetByName("Customer");
  const idCellMatched =  ws.getRange("A2:A").createTextFinder(props.id).matchEntireCell(true).findNext();
  const coulmnCellMatched =  ws.getRange("1:1").createTextFinder(props.field).matchCase(true).matchEntireCell(true).findNext();
  
  if(idCellMatched === null) throw new Error("No matching records");
  if(coulmnCellMatched ===null )throw new Error("Invalid field");



  const recordRowNumber = idCellMatched.getRow();
  const cellIndex = coulmnCellMatched.getColumn();
  ws.getRange(recordRowNumber,cellIndex).setValue(props.value);

}


function addRecord(){
  const ss= SpreadsheetApp.getActiveSpreadsheet();
  const ws=ss.getSheetByName("Customer");

  const timestamp = new Date().getTime().toString();
  const newId = timestamp.substring(0,5)+"-"+timestamp.substring(5);
  ws.appendRow([newId])
  return newId;
}


function deleteRecord(props){
  const ss= SpreadsheetApp.getActiveSpreadsheet();
  const ws=ss.getSheetByName("Customer");
  const idCellMatched =  ws.getRange("A2:A").createTextFinder(props.id).matchEntireCell(true).findNext();
  if(idCellMatched === null) throw new Error("No Record Found");

  const recordRowNumber = idCellMatched.getRow();
  ws.deleteRows(recordRowNumber);
}





function getPersonnel() {
  const ss= SpreadsheetApp.getActiveSpreadsheet();
  const ws=ss.getSheetByName("Customer");
  const dataRange= ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();
  const headers = data.shift();


  const jsonData = data.map(row=>{
    const tempObject = {}
    if(row[row.length-1] === "BSF"){
      headers.forEach((header,index) =>{
        tempObject[header] = row[index];
      })
      return tempObject;
    }
  })

  jsonData.sort((a, b) => {
    const arrA = a["Id"].split("-");
    const arrB = b["Id"].split("-");
    const joinA = arrA.join("");
    const joinB = arrB.join("");
    return parseInt(joinB) - parseInt(joinA)
  });

  return jsonData
}







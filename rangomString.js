function randomStringWithIfColumn(worksheetName, stringColumnTitle, ifColumnTitle, separator) {
  const ws = SpreadsheetApp.getActive().getSheetByName(worksheetName)
  const columnTitles = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues();
  stringColumnIndex = getColumnIndex(stringColumnTitle, columnTitles)
  ifColumnIndex = getColumnIndex(ifColumnTitle, columnTitles)
  let oldStringArr = ws.getRange(3, stringColumnIndex, ws.getLastRow(), 1).getValues()
  let ifArr = ws.getRange(3, ifColumnIndex, ws.getLastRow(), 1).getValues()
  let newStringArr = []

  for (i = 0; i <= oldStringArr.length - 1; i++) {
    let result = oldStringArr[i][0]
    if (String(ifArr[i][0]).length > 0) {
      tempArr = String(oldStringArr[i][0]).split(separator)
      let currentIndex = tempArr.length
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        tempValue = tempArr[currentIndex]
        tempArr[currentIndex] = tempArr[randomIndex]
        tempArr[randomIndex] = tempValue
      }
      result = tempArr.join(separator)
    }
    newStringArr.push(result)
  }
  newStringArr = newStringArr.map(function(element) {
    return [element]
  })
  ws.getRange(3, stringColumnIndex, newStringArr.length, 1).setValues(newStringArr)
}

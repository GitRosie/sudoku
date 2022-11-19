function getGroup(row, col) {
    //get parent: https://www.geeksforgeeks.org/jquery-parent-parents-with-examples/#:~:text=The%20parent()%20is%20an,element%20and%20return%20that%20element.&text=Here%20selector%20is%20the%20selected%20elements%20whose%20parent%20need%20to%20find.
    let cellID = "#cell_" + row + "_" + col
    //console.log(cellID)
    let parent = "#" + $(cellID).parent().attr("id")
    //console.log(parent) //DEBUG

    //Get children: https://stackoverflow.com/questions/9151729/how-to-get-children-array-of-an-element-in-jquery
    let coordinates = [];
    
    let i=0
    $(parent).children().each(function(){
        coordinates[i] = []
        //console.log(this.id)
        let split = this.id.split("_")
        //console.log(split[0] + ", " + split[1] + ", " + split[2])
        
        coordinates[i].push(split[1], split[2])
        i++
    })
    //console.log(coordinates) //DEBUG
    return coordinates
}

//BUG in highlightCell - Hardcoded board size due to limitations on variables
function highlightCell(row, col, neighbourColour, selectedColour){
    //reset all cells to default
    for (let r=0; r<9; r++){
        for(let c = 0; c < 9; c++){
            $("#cell_" + r + "_" + c).css("background-color", "");
        }
    }
    //Highlight row
    for(let c=0; c < 9; c++) {
        $("#cell_" + row + "_" + c).css("background-color", neighbourColour);
    }
    //Highlight column
    for (let r=0; r<9; r++){
        $("#cell_" + r + "_" + col).css("background-color", neighbourColour);
    }
    //Highlight group
    let groupCoord = getGroup(row, col);

    for (let i=0; i<9; i++) {
            let groupRow = groupCoord[i][0]
            let groupCol = groupCoord[i][1]
            $("#cell_" + groupRow + "_" + groupCol).css("background-color", neighbourColour);
    }
    //Highlight Selected Cell
    $("#cell_" + row + "_" + col).css("background-color", selectedColour);
}

function updateCell(selectedCell, input){
    $("#" + selectedCell).html(input)
}

function getCoordinates(selectedCell){
    //split selected cell in to x and y coordinates: https://www.w3schools.com/jsref/jsref_split.asp
    let coordinates = [];
    coordinates = selectedCell.split("_");
    return coordinates
}

function rowCoordinate(selectedCell){
    let coordinates = getCoordinates(selectedCell)
    row = coordinates[1]
    return row
}
function colCoordinate(selectedCell){
    let coordinates = getCoordinates(selectedCell)
    col = coordinates[2]
    return col
}
function arrayDuplicates(array, isValid){
    //Check if array contains duplicates
    let isDuplicate = array.length != new Set(array).size
    //console.log(isDuplicate)
    if (isDuplicate == true) {
        isValid = false
    }
    return isValid
}
function checkCells(game, row, col){
    let isValid = game.isValid(row, col)
    if (isValid== true) {
        $("#cell_" + row + "_" + col).css("background-color", "#00ff00");
    }
    if (isValid== false) {
        $("#cell_" + row + "_" + col).css("background-color", "#ff0000");
    }   
}
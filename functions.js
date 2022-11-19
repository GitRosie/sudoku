function getGroup(x, y) {
    //get parent: https://www.geeksforgeeks.org/jquery-parent-parents-with-examples/#:~:text=The%20parent()%20is%20an,element%20and%20return%20that%20element.&text=Here%20selector%20is%20the%20selected%20elements%20whose%20parent%20need%20to%20find.
    let cellID = "#cell_" + x + "_" + y
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
function highlightCell(x, y, neighbourColour, selectedColour){
    //reset all cells to default
    for (let i=0; i<9; i++){
        for(let j = 0; j < 9; j++){
            $("#cell_" + i + "_" + j).css("background-color", "");
        }
    }
    //Highlight row
    for(let y=0; y < 9; y++) {
        $("#cell_" + x + "_" + y).css("background-color", neighbourColour);
    }
    //Highlight column
    for (let x=0; x<9; x++){
        $("#cell_" + x + "_" + y).css("background-color", neighbourColour);
    }
    //Highlight group
    let groupCoord = getGroup(x,y);

    for (let i=0; i<9; i++) {
            let gx = groupCoord[i][0]
            let gy = groupCoord[i][1]
            $("#cell_" + gx + "_" + gy).css("background-color", neighbourColour);
    }
    //Highlight Selected Cell
    $("#cell_" + x + "_" + y).css("background-color", selectedColour);
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

function xCoordinate(selectedCell){
    let coordinates = getCoordinates(selectedCell)
    x = coordinates[1]
    return x
}
function yCoordinate(selectedCell){
    let coordinates = getCoordinates(selectedCell)
    y = coordinates[2]
    return y
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
function checkCells(game, x, y){
    let isValid = game.isValid(x,y)
    if (isValid== true) {
        $("#cell_" + x + "_" + y).css("background-color", "green");
    }
    if (isValid== false) {
        $("#cell_" + x + "_" + y).css("background-color", "red");
    }   
}
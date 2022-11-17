function getGroup(x,y) {
    //get parent: https://www.geeksforgeeks.org/jquery-parent-parents-with-examples/#:~:text=The%20parent()%20is%20an,element%20and%20return%20that%20element.&text=Here%20selector%20is%20the%20selected%20elements%20whose%20parent%20need%20to%20find.
    let cellID = "#cell_" + x + "_" + y
    let parent = $(cellID).parent()
    //console.log(parent) //DEBUG

    //Get children: https://stackoverflow.com/questions/9151729/how-to-get-children-array-of-an-element-in-jquery
    let coordinates = [];
    let i=0

    $(parent).children().each(function(){
        let split = this.id.split("_")
        coordinates[i] = []
        coordinates[i].push(split[1],split[2])
        i++
    })
    console.log(coordinates) //DEBUG
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
    let group = getGroup(x,y);

    for (let i=0; i<9; i++) {
            let gx = group[i][0]
            let gy = group[i][1]
            $("#cell_" + gx + "_" + gy).css("background-color", neighbourColour);
    }
    //Highlight Selected Cell
    $("#cell_" + x + "_" + y).css("background-color", selectedColour);
}
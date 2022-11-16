// Class/function definitions go here.
let testboard = [   // A valid board.
[6, 5, 8, 4, 2, 7, 9, 1, 3],
[4, 3, 2, 9, 1, 5, 6, 8, 7],
[9, 1, 7, 6, 8, 3, 2, 5, 4],
[8, 6, 5, 1, 3, 2, 4, 7, 9],
[3, 7, 4, 5, 9, 8, 1, 6, 2],
[1, 2, 9, 7, 6, 4, 5, 3, 8],
[2, 9, 6, 8, 7, 1, 3, 4, 5],
[7, 4, 3, 2, 5, 6, 8, 9, 1],
[5, 8, 1, 3, 4, 9, 7, 2, 6]
]

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

//EVENT LISTENERS
$(window).on("load", function() {
    let game = new Game(testboard);
    //console.log(game.board); //DEBUG

    game.displayGame(game.board, game.boardSize);

    //Event listeners
    $(".cell").click(function(event) {
        let coordinates = [];
        //get id of selected cell: https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
        let selectedCell = event.target.id;
        console.log(selectedCell); //DEBUG
        //split selected cell in to x and y coordinates: https://www.w3schools.com/jsref/jsref_split.asp
        coordinates = selectedCell.split("_");

        let group = getGroup(coordinates[1], coordinates[2])
        highlightCell(coordinates[1], coordinates[2], game.neighbourColour, game.selectedColour)
    })
    $("#checkCell").click(function() {
        checkCell();
    });

    $("#help").click(function() {

    });

    $("#clear").click(function() {
        $("#message").html("");
    });

    $("#update").click(function() {
        let number = $("#number").val();
                    
        if (number == "") {
            $("#message").html("You have not entered a value!");
        }
        else {
            updateCell()
        }
    });
                
});
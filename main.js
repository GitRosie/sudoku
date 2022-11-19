let testboard = [[],[],[],[],[],[],[],[],[]] 
let selectedCell;
let row;
let col;

$(window).on("load", function() {
    let game = new Game(testboard);
    game.createCells();
    //console.log(game.board); //DEBUG
    game.displayGame();

    //Event listeners
    $(".cell").click(function(event) {
        
        //get id of selected cell: https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
        selectedCell = event.target.id;        
        //console.log(selectedCell); //DEBUG

        row = rowCoordinate(selectedCell)
        col = colCoordinate(selectedCell)

        highlightCell(row, col, game.neighbourColour, game.selectedColour)
    })
    $("#checkCell").click(function() {
        if (selectedCell == undefined){
            $("#message").html("You have not selected a cell!");
        } else {
            checkCells(game, row, col);
        }
    });

    $("#help").click(function() {

    });

    $("#clear").click(function() {
        $("#message").html("");
    });

    $("#update").click(function() {
        let number = $("#number").val();
        //console.log("number:" + number) //DEBUG
        //console.log("cell:" + selectedCell) //DEBUG
                    
        if (selectedCell == undefined){
            $("#message").html("You have not selected a cell!");
        }
        if (selectedCell != undefined && (number > 9 || number < 1)) {
            if (number == "") {
                $("#message").html("You have not entered a value!");
            }
            else{$("#message").html("Numbers must be between 1 and 9!");}            
        }
        if (number != "" && number <= 9 && number >= 1 && selectedCell != undefined) {
            $("#message").html("Cell updated to " + number);
            updateCell(selectedCell, number)
        }
    });
                
});
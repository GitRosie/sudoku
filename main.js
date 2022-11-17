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
let selectedCell;
let x;
let y;

$(window).on("load", function() {
    let game = new Game(testboard);
    //console.log(game.board); //DEBUG

    game.displayGame(game.board, game.boardSize);

    //Event listeners
    $(".cell").click(function(event) {
        
        //get id of selected cell: https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
        selectedCell = event.target.id;        
        //console.log(selectedCell); //DEBUG

        x = xCoordinate(selectedCell)
        y = yCoordinate(selectedCell)

        highlightCell(x, y, game.neighbourColour, game.selectedColour)
    })
    $("#checkCell").click(function() {
        checkCells(game, x, y);
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
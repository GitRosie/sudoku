let board = [[],[],[],[],[],[],[],[],[]] 
let selectedCell;
let row;
let col;

$(window).on("load", function() {
    let game = new Game(board);
    //console.log(game.board); //DEBUG
    game.displayGame();

    //Event listeners
    $("body").on("click", ".cell", function(event) {        
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
        //No cell chosen error
        if (selectedCell == undefined){
            $("#message").html("You have not selected a cell!");
        }

        let suggestions = game.suggest(row, col);
        //console.log(suggestions.length) //DEBUG
        if(suggestions.length >= 1 && selectedCell != undefined){
            $("#message").html("Possible value(s) of cell: " + suggestions);
        } 
        if(suggestions.length = 0 && selectedCell != undefined) {
            $("#message").html("No suggestions found");
        }
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
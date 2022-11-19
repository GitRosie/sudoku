class Game {
    constructor(loadedBoard){
        let boardSize = 9; //number of rows/columns (square)
        //let groupSize = Math.sqrt(boardSize) //grid size of groups
        let selectedColour = "#6699ff"
        let neighbourColour = "#aaccff"

        this.boardSize = boardSize;
        this.selectedColour = selectedColour;
        this.neighbourColour = neighbourColour;

        //Create 2D Array: https://jsfiddle.net/matasoy/oetw73sj/
        this.board = new Array(boardSize); //1D Array
        for (let i = 0; i < boardSize; i++) {
            this.board[i] = new Array(boardSize);    //2D Array
        }

        this.loadGame(this.board, loadedBoard, this.boardSize)
    }

    //Class methods: https://www.w3schools.com/js/js_classes.asp
    loadGame(board, loadedBoard, boardSize){
        //Load board into game
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = loadedBoard[i][j];
            }
        }
        return board
    }

    createCells(){
        let groupId;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                groupId="#g0_0"
                // append div into group class: https://api.jquery.com/append/
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=0; i<3; i++){
            for(let j=3; j<6; j++){
                groupId="#g0_1"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=0; i<3; i++){
            for(let j=6; j<9; j++){
                groupId="#g0_2"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=3; i<6; i++){
            for(let j=0; j<3; j++){
                groupId="#g1_0"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=3; i<6; i++){
            for(let j=3; j<6; j++){
                groupId="#g1_1"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=3; i<6; i++){
            for(let j=6; j<9; j++){
                groupId="#g1_2"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=6; i<9; i++){
            for(let j=0; j<3; j++){
                groupId="#g2_0"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=6; i<9; i++){
            for(let j=3; j<6; j++){
                groupId="#g2_1"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
        for(let i=6; i<9; i++){
            for(let j=6; j<9; j++){
                groupId="#g2_2"
                let contents = "<div class=\"cell\" id=\"cell_" + i + "_" + j + "\"></div>"
                $(groupId).append(contents);
            }
        }
    }
    
    displayGame(board, boardSize){
        // display the board in a grid on the page
        //each cell has class cell and id cell_i_j where i is the row and j is the column
        for (let i=0; i<boardSize;i++){
            for (let j=0; j< boardSize; j++) {
                $("#cell_" + i + "_" + j).html(board[i][j])
            }
        }
    }

    isValid(row, col) {
        let selectedCellVal = $("#cell_" + row + "_" + col).html()
        let isValid = true
        //Check column for same value
        isValid = this.validCol(row, col, selectedCellVal, isValid)
        //console.log(isValid) //DEBUG
        //Check row for same value
        isValid = this.validRow(row, col, selectedCellVal, isValid)
        //console.log(isValid) //DEBUG
        //Check group for same value
        isValid = this.validGroup(row, col, isValid)
        //console.log(isValid) //DEBUG
        //return value if haven't already
        return isValid
    }

    validCol(row, col, selectedCellVal, isValid){
        for(let i=0; i < 9; i++) {
            let compareTo = "#cell_" + i + "_" + col
            let compareCellVal = $(compareTo).html()
            if(i != row){
                //console.log("column " + i) //DEBUG
                if (selectedCellVal == compareCellVal) {
                    isValid = false
                }
            }
        }
        return isValid
    }
    validRow(row, col, selectedCellVal, isValid){
        let rowCoods = [];

        for(let i=0; i < 9; i++) {
            rowCoods[i] = []
            //rowCoords[]
            let compareTo = "#cell_" + row + "_" + i
            let compareCellVal = $(compareTo).html()
            if(i != col){
                console.log("row " + i) //DEBUG
                if (selectedCellVal == compareCellVal) {
                    isValid = false
                }
            }
        }
        return isValid
    }
    validGroup(row, col, isValid){
        let groupCoords = getGroup(row,col);
        let groupValues = [];

        for (let i=0; i<9; i++) {
            let groupRow = groupCoords[i][0]
            let groupCol = groupCoords[i][1]
            let compareTo = "#cell_" + groupRow + "_" + groupCol
            groupValues.push($(compareTo).html())           
        }
        isValid = arrayDuplicates(groupValues, isValid)
        console.log(isValid) //DEBUG
        return isValid
    }
}
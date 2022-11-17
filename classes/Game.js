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

        this.board = this.loadGame(this.board, loadedBoard, boardSize)
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

    //NICE TO HAVE HERE: use js to create the cell divs
    
    displayGame(board, boardSize){
        // display the board in a grid on the page
        //each cell has class cell and id cell_i_j where i is the row and j is the column
        for (let i=0; i<boardSize;i++){
            for (let j=0; j< boardSize; j++) {
                $("#cell_" + i + "_" + j).html(board[i][j])
            }
        }
    }

    isValid(x,y) {
        let selectedCellVal = $("#cell_" + x + "_" + y).html()
        let isValid = true
        //Check column for same value
        isValid = this.validCol(x, y, selectedCellVal, isValid)
        //console.log(isValid) //DEBUG
        //Check row for same value
        isValid = this.validRow(x, y, selectedCellVal, isValid)
        //console.log(isValid) //DEBUG
        //Check group for same value
        isValid = this.validGroup(x, y, selectedCellVal, isValid)
        //console.log(isValid) //DEBUG
        //return value if haven't already
        return isValid
    }

    validCol(x, y, selectedCellVal, isValid){
        for(let i=0; i < 9; i++) {
            let compareTo = "#cell_" + i + "_" + y
            let compareCellVal = $(compareTo).html()
            if(i != x){
                //console.log("column " + i) //DEBUG
                if (selectedCellVal == compareCellVal) {
                    isValid = false
                    return isValid
                }
            }
        }
        return isValid
    }
    validRow(x, y, selectedCellVal, isValid){
        for(let i=0; i < 9; i++) {
            let compareTo = "#cell_" + x + "_" + i
            let compareCellVal = $(compareTo).html()
            if(i != y){
                //console.log("row " + i) //DEBUG
                if (selectedCellVal == compareCellVal) {
                    isValid = false
                    return isValid
                }
            }
        }
        return isValid
    }
    validGroup(x, y, selectedCellVal, isValid){
        let group = getGroup(x,y);
        let groupValues = [];

        for (let i=0; i<9; i++) {
            let gx = group[i][0]
            let gy = group[i][1]
            let compareTo = "#cell_" + gx + "_" + gy
            groupValues.push($(compareTo).html())           
        }
        isValid = arrayDuplicates(groupValues)
        //console.log(groupValues) //DEBUG
        return isValid
    }
}
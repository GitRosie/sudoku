class Game {
    constructor(loadedBoard){
        let boardSize = 9;
        this.selectedColour = "#6699ff"
        this.neighbourColour = "#aaccff"

        //Create 2D Array: https://jsfiddle.net/matasoy/oetw73sj/
        this.board = []; //1D Array
        for (let i = 0; i < boardSize; i++) {
            this.board[i] = [];    //2D Array
        }

        this.loadGame(this.board, loadedBoard, boardSize)
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

    displayGame(){
        this.teardown();
        this.createCells();
        // display the board in a grid on the page
        //each cell has class cell and id cell_i_j where i is the row and j is the column
        for (let i=0; i<9;i++){
            for (let j=0; j< 9; j++) {
                $("#cell_" + i + "_" + j).html(this.board[i][j])
            }
        }
    }

    teardown(){
        // Clear the board.
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                $("#g" + i + "_" + j).empty();
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
                //console.log("row " + i) //DEBUG
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
        //console.log(isValid) //DEBUG
        return isValid
    }

    suggest(row, col){
        //The values that can appear in any row, col or group
        const valuesSet = new Set(["1","2","2","3","4","5","6","7","8","9"]);
        let neighboursSet = new Set();
        
        //add row values
        for (let i=0; i<9; i++){
            let rowCell = "#cell_" + row + "_" + i
            let cellVal = $(rowCell).html()
            if(cellVal != ""){
                neighboursSet.add(cellVal)
            }
        }
        //add col vals
        for (let i=0; i<9; i++){
            let colCell = "#cell_" + i + "_" + col
            let cellVal = $(colCell).html()
            if(cellVal != ""){
                neighboursSet.add(cellVal)
            }
        }
        //add group vals
        let groupCoords = getGroup(row, col)
        for (let i=0; i<groupCoords.length; i++){
            let x = groupCoords[i][0]
            let y = groupCoords[i][1]
            let groupCell = "#cell_" + x + "_" + y
            let cellVal = $(groupCell).html()
            if(cellVal != ""){
                neighboursSet.add(cellVal)
            }
        }
        console.log(valuesSet)
        console.log(neighboursSet)
        
        let mySet = new Set([...valuesSet].filter(elem => !neighboursSet.has(elem)))
        console.log(mySet)
        let suggestions = Array.from(mySet)
        console.log(suggestions)
        return suggestions

        //https://blog.greenroots.info/everything-you-need-to-know-about-javascript-set
        //https://stackoverflow.com/questions/20069828/how-to-convert-set-to-array
    }
}
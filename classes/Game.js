class Game {
    constructor(loadedBoard){
        let boardSize = 9; //number of rows/columns (square)
        let groupSize = Math.sqrt(boardSize) //grid size of groups
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

    //NICE TO HAVE: use js to create the cell divs
    //addCells() {
        // append div into group class: https://api.jquery.com/append/
        //let cellId = "cell_" + i + "_" + j
        //let contents = "<div class=\"cell\" id=\"" + cellId + "\"></div>"
        
        //$(groupId).append(contents);
        //$("#cell_" + i + "_" + j).html(board[i][j])
    //}
    
    displayGame(board, boardSize){
        // display the board in a grid on the page
        //each cell has class cell and id cell_i_j where i is the row and j is the column
        for (let i=0; i<boardSize;i++){
            for (let j=0; j< boardSize; j++) {
                $("#cell_" + i + "_" + j).html(board[i][j])
            }
        }
    }
}
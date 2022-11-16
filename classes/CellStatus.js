class CellStatus {
    static Given = new CellStatus("given")
    static Empty = new CellStatus("empty")
    static Incorrect = new CellStatus("incorrect")
    static Correct = new CellStatus("correct")

    constructor(status) {
        this.status = status
    }
}
function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}

function rgb2hex(color) {
    var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) {
        digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    }
    var red = parseInt(digits[2],10);
    var green = parseInt(digits[3],10);
    var blue = parseInt(digits[4],10);
    var rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}


suite("HTML tests", function() {

    test("1.1: Check that the page title is 'Sudoku App'", function() {
        chai.assert.equal($("title").text(), "Sudoku App", "Page title is incorrect");
    });


    test("1.2: Add a level 1 heading with ID 'heading' to the page with the contents 'Sudoku'", function() {
        chai.assert.equal($("#heading").prop("nodeName"), "H1", "'heading' element has wrong tag type");
        chai.assert.equal($("#heading").text(), "Sudoku", "'heading' element should say 'Sudoku'");
    });


    test("1.3: Add a div to the page with the ID 'board'", function () {
        chai.assert.equal($("#board").prop("nodeName"), "DIV", "div with ID 'board' not found in page");
    });


    test("1.4: Check that page contains divs, each with the class 'group' and an ID of the form gi_j, where i is the group's row and j is the column", function() {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                let groupId = "#g" + i + "_" + j;
                chai.assert.equal($(groupId).prop("nodeName"), "DIV", "div with ID '" + groupId + "' not found in page");
                chai.assert.isTrue($(groupId).hasClass("group"), "div with ID '" + groupId + "' has the wrong class");
            }
        }
    });


    test("1.5: Check the page contains a button with ID checkCell and the value Check Cell", function() {
        chai.assert.equal($("#checkCell").prop("nodeName"), "BUTTON", "Element with ID 'checkCell' has the wrong type");
        chai.assert.equal($("#checkCell").text(), "Check Cell", "'checkCell' button has wrong value");
    });


    test("1.6: Check the page contains an input of type number. It should have the ID 'number'", function() {
        chai.assert.equal($("#number").prop("nodeName"), "INPUT", "Element with ID 'number' has the wrong type");
        chai.assert.equal($("#number").prop("type"), "number", "Element with ID 'number' has the wrong type");
    });


    test("1.7: Check the page contains a paragraph. Within it add a span with ID 'message'", function() {
        chai.assert.equal($("#message").prop("nodeName"), "SPAN", "Element with ID 'message' has the wrong type");
        chai.assert.equal($("#message").parent().prop("nodeName"), "P", "'message' element is not within a 'p' element");
    });


    test("1.8: Check the page contains a button with the ID 'help' and the value 'Help'", function() {
        chai.assert.equal($("#help").prop("nodeName"), "BUTTON", "Element with ID 'help' has the wrong type");
        chai.assert.equal($("#help").text(), "Help", "'help' button has wrong value");
    });


    test("1.9: Check the page contains a button with the ID 'clear' and the value 'Clear'", function() {
        chai.assert.equal($("#clear").prop("nodeName"), "BUTTON", "Element with ID 'clear' has the wrong type");
        chai.assert.equal($("#clear").text(), "Clear", "'clear' button has wrong value");
    });


    test("1.10: Check the page contains a button to the page with the ID 'update' and the value 'Update'", function() {
        chai.assert.equal($("#update").prop("nodeName"), "BUTTON", "Element with ID 'clear' has the wrong type");
        chai.assert.equal($("#update").text(), "Update", "'update' button has wrong value");
    });

});



suite("CSS tests", function() {

    setup(function() {
        $("#g0_0").append("<div id=\"test_cell\" class=\"cell\">1</div>");
        $("#message").html("Test Message");
    });

    teardown(function() {
        $("#test_cell").remove();
        $("#message").html("");
    });

    test("2.1: Set the body background colour to be #fcfcfc", function() {
        let bgColour = rgb2hex($("body").css("background-color"));
        chai.assert.equal(bgColour, "#fcfcfc", "Body element has wrong background colour");
    });
    

    test("2.2: Set the body to display text in Verdana font.", function() {
        let font = $("body").css("font-family").toLowerCase();
        chai.assert.equal(font, "verdana", "Body element has wrong font");
    });
    

    test("2.3: The text in the level one heading should be 36px", function() {
        let fontSize = $("#heading").css("font-size");
        chai.assert.equal("36px", fontSize, "Level one heading has the wrong font size");
    });
    

    test("2.4: The board should be 435px", function() {
        // Check the board width.
        let boardWidth = $("#board").css("width");
        chai.assert.equal("435px", boardWidth, "Board has the wrong width");
    });
    

    test("2.5: The group class should be 141px wide with a 2px border coloured #969696.", function() {
        // Check the group width.
        let groupWidth = $(".group").css("width");
        chai.assert.equal("141px", groupWidth, "Group has the wrong width");

        // Check the board border.
        let groupBorderWidth = $(".group").css("border-width");
        chai.assert.equal("2px", groupBorderWidth, "Group border is the wrong width");
        let groupBorderColour = rgb2hex($(".group").css("border-color"));
        chai.assert.equal("#969696", groupBorderColour, "Group border is the wrong colour");
    });
    

    test("2.6: The cell class should be 35px wide, have 3px of padding, 0 margin and a 1px border coloured #CFCFCF", function() {
        // Cell width.
        let cellWidth = $(".cell").css("width");
        chai.assert.equal("35px", cellWidth, "Cell class has the wrong width");

        // Cell padding/margin.
        let cellMargin = $(".cell").css("margin");
        chai.assert.equal("0px", cellMargin, "Cell class has the wrong margin");
        let cellPadding = $(".cell").css("padding");
        chai.assert.equal("3px", cellPadding, "Cell class has the wrong padding");

        // Cell border.
        let cellBorderWidth = $(".cell").css("border-width");
        chai.assert.equal("1px", cellBorderWidth, "Cell border has the wrong width");
        let cellBorderColour = rgb2hex($(".cell").css("border-color"));
        chai.assert.equal("#cfcfcf", cellBorderColour, "Cell border has the wrong colour");
    });
    

    test("2.7: The cell class should be floated left and its text centrally aligned", function() {
        let float = $(".cell").css("float");
        chai.assert.equal(float, "left", "Cell class has wrong float value");
        let textAlign = $(".cell").css("text-align");
        chai.assert.equal(textAlign, "center", "Cell text is not properly aligned");
    });
    

    test("2.8: The cell class should have 28px text", function() {
        let fontSize = $(".cell").css("font-size");
        chai.assert.equal(fontSize, "28px", "Cell class has wrong font size");
    });
    

    test("2.9: The cell class should have a minimum height of 35px", function() {
        let minHeight = $(".cell").css("min-height");
        chai.assert.equal(minHeight, "35px", "Cell class has wrong minimum height");
    });
    

    test("2.10: The notok class should have red text. The ok class should have green text", function() {
        $("#message").addClass("notok");
        let colour = rgb2hex($("#message").css("color"))
        chai.assert.equal(colour, "#ff0000", ".notok class has the wrong text colour");
        $("#message").removeClass("notok");

        $("#message").addClass("ok");
        colour = rgb2hex($("#message").css("color"))
        chai.assert.equal(colour, "#00ff00", ".ok class has the wrong text colour");
        $("#message").removeClass("ok");
    });

});



suite("JavaScript tests", function() {

    suiteSetup(function() {
        this.BOARDS = [
            [   // A valid board.
                [6, 5, 8, 4, 2, 7, 9, 1, 3],
                [4, 3, 2, 9, 1, 5, 6, 8, 7],
                [9, 1, 7, 6, 8, 3, 2, 5, 4],
                [8, 6, 5, 1, 3, 2, 4, 7, 9],
                [3, 7, 4, 5, 9, 8, 1, 6, 2],
                [1, 2, 9, 7, 6, 4, 5, 3, 8],
                [2, 9, 6, 8, 7, 1, 3, 4, 5],
                [7, 4, 3, 2, 5, 6, 8, 9, 1],
                [5, 8, 1, 3, 4, 9, 7, 2, 6]
            ],
            [   // An invalid board.
                [6, 5, 8, 4, 2, 7, 9, 1, 3],
                [4, 5, 2, 9, 1, 5, 6, 8, 7],
                [9, 1, 7, 6, 8, 3, 2, 5, 4],
                [8, 6, 5, 1, 3, 2, 4, 7, 9],
                [3, 7, 4, 5, 9, 8, 1, 6, 2],
                [1, 2, 9, 7, 6, 4, 5, 3, 8],
                [2, 9, 6, 8, 7, 1, 3, 4, 5],
                [7, 4, 3, 2, 5, 6, 8, 9, 1],
                [5, 8, 1, 3, 4, 9, 7, 2, 6]
            ],
        ];

        this.GAMES = [
            new Game(this.BOARDS[0]),
        ];

        this.HIGHLIGHTED = [
            [ // (1,4)
                [1,0], [1,1], [1,2], [1,3], [1,5], [1,6], [1,7], [1,8], // Row
                [0,4], [2,4], [3,4], [4,4], [5,4], [6,4], [7,4], [8,4], // Col
                [0,3], [0,5], [2,3], [2,5]                       // Group
            ],
            [ // (5,5)
                [5,0], [5,1], [5,2], [5,3], [5,4], [5,6], [5,7], [5,8],
                [5,0], [5,1], [5,2], [5,3], [5,4], [5,6], [5,7], [5,8],
                [3,3], [3,4], [4,3], [4,4]
            ]
        ]

        this.NOT_HIGHLIGHTED = [[]]
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                let found = false;
                for (let k=0; k<this.HIGHLIGHTED[0].length; k++) {
                    if ((i == this.HIGHLIGHTED[0][k][0] && j == this.HIGHLIGHTED[0][k][1]) || (i == 1 && j == 4)) {

                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.NOT_HIGHLIGHTED[0].push([i, j]);
                }
            }
        }
    });

    teardown(function() {
        // Clear the number input.
        $("#number").val("");
    });


    test("3.1: Game state is stored within a class.", function() {
        for (let i=0; i<this.BOARDS.length; i++) {
            let game = new Game(this.BOARDS[i]);
            chai.assert.ok(game.board, "Could not find board attribute");

            for (let j=0; j<9; j++) {
                for (let k=0; k<9; k++) {
                    chai.assert.equal(this.BOARDS[i][j][k], game.board[j][k], "Element (" + j + ", " + k + ") has wrong value");
                }
            }
        }
    });


    test("3.2: A given board is displayed in a grid", function() {
        // Display the game.
        this.GAMES[0].displayGame();

        // Assert that each element has the correct value.
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                let value = $("#cell_" + i + "_" + j).html();
                chai.assert.equal(value, this.BOARDS[0][i][j], "Cell (" + i + ", " + j + ") has wrong value");
            }
        }
    });


    test("3.3: getGroup function returns the coordinates of each cell in the group containing the currently selected cell", function() {
        let correct = [[0,3], [0,4], [0,5], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5]];
        
        let group = getGroup(1, 4);
        chai.assert.equal(group.length, 9, "Group array has wrong number of elements");

        for (let i=0; i<correct.length; i++) {
            chai.assert.equal(correct[i][0], group[i][0], "group element " + i + " has wrong x value");
            chai.assert.equal(correct[i][1], group[i][1], "group element " + i + " has wrong y value");
        }
    });


    test("3.4: When a cell is selected all of the other cells in its row, column and group are highlighted using the highlighted class", function() {
        // When a cell is selected all of the other cells in its row, column and group should be highligted in #aaccff. The cell itself should
        // be highlighted in #6699ff.
        this.GAMES[0].displayGame();
        highlightCell(1, 4, "#aaccff", "#6699ff");

        // Check the background colour of the selected cell.
        let col = rgb2hex($("#cell_1_4").css("background-color"));
        chai.assert.equal(col, "#6699ff", "selected cell has wrong colour");

        for (let k=0; k<this.HIGHLIGHTED[0].length; k++) {
            let x = this.HIGHLIGHTED[0][k][0];
            let y = this.HIGHLIGHTED[0][k][1];

            col = rgb2hex($("#cell_" + x + "_" + y).css("background-color"));
            chai.assert.equal(col, "#aaccff", "cell (" + x + ", " + y + ") has wrong colour");
        }

        // Click a cell.
        $("#cell_5_5").click();
        col = rgb2hex($("#cell_5_5").css("background-color"));
        chai.assert.equal(col, "#6699ff", "selected cell has wrong colour");

        for (let k=0; k<this.HIGHLIGHTED[1].length; k++) {
            let x = this.HIGHLIGHTED[1][k][0];
            let y = this.HIGHLIGHTED[1][k][1];

            col = rgb2hex($("#cell_" + x + "_" + y).css("background-color"));
            chai.assert.equal(col, "#aaccff", "cell (" + x + ", " + y + ") has wrong colour");
        }
    });


    test("3.5: Clicking update button adds new value to the correct cell", function() {
        let cases = [ // number to enter, x coord, y coord.
            [7, 5, 1],
            [2, 3, 8],
            [5, 1, 2]
        ];

        // Enter a value into the number input and click the update button.
        for (let i=0; i<cases.length; i++) {
            let x = cases[i][1];
            let y = cases[i][2];
            $("#number").val(cases[i][0]);
            clickElement($("#cell_" + x + "_" + y));
            let updateBtn = $("#update");
            while (updateBtn === undefined) {
                updateBtn = $("#update");        
            }
            clickElement(updateBtn);
            chai.assert.equal($("#cell_" + x + "_" + y).html(), cases[i][0], "Board cell (" + x + ", " + y + ") has wrong value");
        }
    });
    

    test("3.6: isValid takes a cell coordinate and returns true if there are no invalid entries in the cell's corresponding row, column or group", function() {
        // Check an invalid case. Cell (0,0) contains a duplicate value, so checking (1,0) should find an invalid
        // row, (0,1) should find an invalid column, and (2,2) should find an invalid group.
        let game = this.GAMES[0];
        game.board[1][1] = 5;
        chai.assert.isFalse(game.isValid(0,1), "Row contains invalid entry so should be false");
        chai.assert.isFalse(game.isValid(1,0), "Column contains invalid entry so should be false");
        chai.assert.isFalse(game.isValid(2,2), "Group contains invalid entry so should be false");

        // Check any valid cell - (8,8) should work.
        chai.assert.isTrue(game.isValid(8,8), "Cell has no neighbouring problems so should be true");
    });
    

    test("3.7: The checkCell button renders cells in green if they're valid", function() {
        // Clear the board.
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                $("#g" + i + "_" + j).empty();
            }
        }

        // Render the game.
        this.GAMES[0].displayGame();
        
        // Click on a cell and click the "Check Cell" button.
        clickElement($("#cell_1_1"));
        clickElement($("#checkCell"));

        // Check that the cell has the correct colour.
        let col = rgb2hex($("#cell_1_1").css("background-color"));
        chai.assert.equal(col, "#ff0000", "Cell (1,1) is invalid and should have a red background");
    });
    

    test("3.8: The checkCell button renders cells in red if they're invalid", function() {
        // Clear the board.
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                $("#g" + i + "_" + j).empty();
            }
        }

        // Render the game.
        let game = this.GAMES[0];
        game.board[1][1] = 5;
        game.displayGame();
        
        // Click on a cell and click the "Check Cell" button.
        clickElement($("#cell_8_8"));
        clickElement($("#checkCell"));

        // Check that the cell has the correct colour.
        let col = rgb2hex($("#cell_8_8").css("background-color"));
        chai.assert.equal(col, "#00ff00", "Cell (8,8) is valid and should have a green background");
    });
    

    test("3.9: 9.	A method is implemented called suggest that provides an array of elements the might be the correct value for a selected cell. The method takes the x and y coordinate of the cell as arguments.", function() {
        // Set up the board.
        let game = this.GAMES[0];
        game.board[1][1] = null;
        game.board[4][1] = null;
        game.board[1][8] = null;
        game.board[2][2] = null;

        let suggestions = game.suggest(1,1);
        chai.assert.lengthOf(suggestions, 2, "Should only be two suggestions");
        chai.assert.includeMembers(suggestions, [3, 7], "Should only contain 3 and 7");
        chai.assert.notIncludeMembers(suggestions, [1, 2, 4, 5, 6, 8, 9], "Should only contain 3 and 7");
    });
    

    test("3.10: Clicking the clear button clears the message box", function() {
        // Set a test value.
        $("#message").html("This is a test message");

        // Click the clear button.
        clickElement($("#clear"));

        // Check that the event handler removed the message.
        let message = $("#message").html();
        chai.assert.equal(message, "", "#message span contains wrong value");
    });

});
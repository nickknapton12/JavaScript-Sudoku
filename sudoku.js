class thePuzzle{
    constructor(){


        // This array represents the puzzle at any given time
        this.puzzle = [['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','','']];

        /*
        This array is used to hold "safe values", these are values the user puts in that are deemed safe (true), the algorithm
        cannot change safe values and will skip over them.
        */
        this.restrictedValues = [[false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false]]


        //This represents the current position of the solver, rows are first followed by columns
        this.currentSquare = [0,0]
    }


    /* 
    The changeCell function is responsible for changing the values of the puzzle to value passed in at the row and column passed
    in, it also changes the value of the restrictedValues to true at that position, signifying a "safe value"
    */
    changeCell(value, row, column){
        this.puzzle[row][column] = value
        this.restrictedValues[row][column] = true
    }

    clear(){
        this.puzzle = [['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','','']];
                        

        this.restrictedValues = [[false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false],
                       [false,false,false,false,false,false,false,false,false]];
    
        this.currentSquare = [0,0]

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let row = i.toString();
                let column = j.toString();
                let id = row + column;
                document.getElementById(id).value = this.puzzle[i][j];
            }
        }
    }

    clearSol(){
        this.currentSquare = [0,0];
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.restrictedValues[i][j] == false){
                    this.puzzle[i][j] = '';
                    this.updateDisplay(i,j,'');
                }
            }
        }
    }

    examplePuzz(){

    }


    /*
    This is where the backtracking algorithm is, it is called everytime the interval is run and simply increases the value at the current
    position (currentSquare) so long as the value is below 9. It then updates the cell and makes sure at the current position that the 3 
    rules of sudoku game are followed. If the 3 rules are followed we use nextSquare() to go to the next non restricted square then end 
    the function to await the interval. 

    In the case the current position is 9, we set it to 0 and use previousSquare() to go back to the previous non restricted square. 
    */
    solve(){
        if(this.currentSquare[0] == 0 && this.currentSquare[1] == 0 && this.restrictedValues[0][0] == true){
            this.nextSquare();
        }
        if(this.puzzle[this.currentSquare[0]][this.currentSquare[1]] < 9){
            this.puzzle[this.currentSquare[0]][this.currentSquare[1]]++;
        }else{
            this.puzzle[this.currentSquare[0]][this.currentSquare[1]] = 0;
            this.previousSquare();
            this.updateDisplay(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]);
            return;
        }

        this.updateDisplay(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]);

        if(this.verifyRow(this.currentSquare[0], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]) && 
        this.verifyColumn(this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]) && 
        this.verifyBox(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]])){
            this.nextSquare();
        }

        return;

    }

    /*
    Because of browser restriction on interval delays being no less than 4ms, this function is needed to solve puzzles instantly. It works
    virtually the same however uses loops to go through the puzzle solving it as it goes.
    */
    solveInstant(){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(this.restrictedValues[this.currentSquare[0]][this.currentSquare[1]] == false){
                    if(this.puzzle[this.currentSquare[0]][this.currentSquare[1]] < 9){
                        this.puzzle[this.currentSquare[0]][this.currentSquare[1]]++;
                        if(this.verifyRow(this.currentSquare[0], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]) && 
                        this.verifyColumn(this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]) && 
                        this.verifyBox(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]])){
                        //this.updateDisplay(this.currentSquare[i],this.currentSquare[1],this.puzzle[i][j]);
                        this.nextSquare();
                        i = this.currentSquare[0];
                        j = this.currentSquare[1];
                        }
                    }else{
                        this.puzzle[this.currentSquare[0]][this.currentSquare[1]] = 0;
                        //this.updateDisplay(this.currentSquare[0],this.currentSquare[1],this.puzzle[i][j]);
                        this.previousSquare();
                        i = this.currentSquare[0];
                        j = this.currentSquare[1];
                    }
                }else{
                    this.nextSquare();
                    i = this.currentSquare[0];
                    j = this.currentSquare[1];
                }
            }
        }
        this.updateWholeDisplay();
    }

    /*
    This function is responsible to moving the current position (currentSquare) to the next availible (non restricted) position on the board.
    */
    nextSquare(){
    let lastRow = this.currentSquare[0].toString();
    let lastColumn = this.currentSquare[1].toString();
    let id = lastRow + lastColumn;
    document.getElementById(id).style.color = "white";

    do{
        if(this.currentSquare[1] < 8){
            this.currentSquare[1]++;   
        }
        else{
            this.currentSquare[1] = 0;
            this.currentSquare[0]++;
        }
    }while(this.restrictedValues[this.currentSquare[0]][this.currentSquare[1]]);
    lastRow = this.currentSquare[0].toString();
    lastColumn = this.currentSquare[1].toString();
    id = lastRow + lastColumn;
    document.getElementById(id).style.color = "blue";
    }


    /*
    This function is responsible to moving the current position (currentSquare) to the previous availible (non restricted) position on the board.
    */
    previousSquare(){
        let lastRow = this.currentSquare[0].toString();
        let lastColumn = this.currentSquare[1].toString();
        let id = lastRow + lastColumn;
        document.getElementById(id).style.color = "white";
        do{
            if(this.currentSquare[1] > 0){
                this.currentSquare[1]--;   
            }
            else{
                this.currentSquare[1] = 8;
                this.currentSquare[0]--;
            }
        }while(this.restrictedValues[this.currentSquare[0]][this.currentSquare[1]]);
        lastRow = this.currentSquare[0].toString();
        lastColumn = this.currentSquare[1].toString();
        id = lastRow + lastColumn;
        document.getElementById(id).style.color = "blue";
    }


    /*
    verifyColumn takes a column number and a value to be checked and returns true if its the only of that value in the column
    and returns false if there is more then one of that value in the column.
    */
    verifyColumn(column, value){
        let n = 0
        for(var i = 0; i < 9; i++){
            if(this.puzzle[i][column] == value){
                n++
            }
        }
        if(n < 2){
            return true
        }
        else{
            return false
        }
    }

    /*
    verifyRow takes a row number and a value to be checked and returns true if its the only of that value in the row
    and returns false if there is more then one of that value in the row.
    */
    verifyRow(row, value){
        let n = 0
        for(var i = 0; i < 9; i++){
            if(this.puzzle[row][i] == value){
                n++
            }
        }
        if(n < 2){
            return true
        }
        else{
            return false
        }
    }

    /*
    verifyBox takes in a row and column and a value to check, and returns true if its the only of that value in the box
    and false if not. 
    */
    verifyBox(row, column, value){
        let box = parseInt(row/3)
        if(box == 0){row = 0}
        if(box == 1){row = 3}
        if(box == 2){row = 6}

        box = parseInt(column/3)
        if(box == 0){column = 0}
        if(box == 1){column = 3}
        if(box == 2){column = 6}

        let duplicate = 0

        for(var i = 0; i < 3;i++){
            for(var j = 0; j < 3; j++){
                if(this.puzzle[row+i][column+j] == value){
                    duplicate++
                }
            }
        }

        if(duplicate < 2){
            return true
        }
        else{
            return false
        }
    }

    solved(){
        if(this.currentSquare[0] >= 9){
            return true;
        }
        else{
            return false;
        }
    }


    /*
    updateDisplay takes in a row, column and value and updates that cell with the new value, from a performance view
    this is much better then updating the whole puzzle everytime.
    */
    updateDisplay(row, column, value){
        row = row.toString();
        column = column.toString();
        let id = row + column;
        document.getElementById(id).value = value;
    }

    updateWholeDisplay(){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let row = i.toString();
                let column = j.toString();
                let id = row + column;
                document.getElementById(id).value = this.puzzle[i][j];
            }
        }
    }
}

var slider = document.getElementById('myRange')
var speed = slider.value;

cell = document.querySelectorAll('input')
solveButton = document.querySelector('button')

clearSol = document.getElementById('clearSol')
clearPuzz = document.getElementById('clearPuzz')
examplePuzz = document.getElementById('examplePuzz')

var puzz = new thePuzzle()
var interval = 0;

/* This section checks for new inputs in any cell and makes sure if its a valid number (0 < x <= 9), if its valid,
it takes the id of the input cell and calls change cell with the row being the first number of the id, and the 
column being the second number of the id. For example the first cell has id="00" denoting row 0 and column 0,
or the bottom right cell has id="88" denoting row 8 and column 8.
*/
cell.forEach(input => {
    input.addEventListener('input', () => {
        if(input.value > '0' && input.value <= '9'){
            puzz.changeCell(input.value, input.getAttribute('id').charAt(0), input.getAttribute('id').charAt(1))
        }
        else{
            input.value = ''
        }
    })
});

/*
Listens for a button presson the "solve" button and then calls the puzzles solve function.
solveButton.addEventListener('click', () => { 
*/
solveButton.addEventListener('click', repeat);

clearPuzz.addEventListener('click', clearPuzzle);
clearSol.addEventListener('click', clearSolution);
examplePuzz.addEventListener('click', puzz.examplePuzz);

slider.oninput = function(){
    slider = this.value;
    speed = 100 - slider;
}

function repeat(){
    interval = setInterval( () => puzz.solve(), speed);
}

function clearPuzzle(){
    clearInterval(interval);
    puzz.clear();
}

function clearSolution(){
    clearInterval(interval);
    puzz.clearSol();
}

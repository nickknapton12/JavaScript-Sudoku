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

        //This is an array of example puzzles to be loaded in
        this.examplePuzzles = [[['','','','2','6','','7','','1'],
                                ['6','8','','','7','','','9',''],
                                ['1','9','','','','4','5','',''],
                                ['8','2','','1','','','','4',''],
                                ['','','4','6','','2','9','',''],
                                ['','5','','','','3','','2','8'],
                                ['','','9','3','','','','7','4'],
                                ['','4','','','5','','','3','6'],
                                ['7','','3','','1','8','','','']],

                                [['','7','','','','','','','9'],
                                ['5','1','','4','2','','6','',''],
                                ['','8','','3','','','7','',''],
                                ['','','8','','','1','3','7',''],
                                ['','2','3','','8','','','4',''],
                                ['4','','','9','','','1','',''],
                                ['9','6','2','8','','','','3',''],
                                ['','','','','1','','4','',''],
                                ['7','','','2','','3','','9','6']],

                                [['1','','6','','','2','3','',''],
                                ['','5','','','','6','','9','1'],
                                ['','','9','5','','1','4','6','2'],
                                ['','3','7','9','','5','','',''],
                                ['5','8','1','','2','7','9','',''],
                                ['','','','4','','8','1','5','7'],
                                ['','','','2','6','','5','4',''],
                                ['','','4','1','5','','6','','9'],
                                ['9','','','8','7','4','2','1','']],

                                [['','3','','','8','','','','1'],
                                ['','','7','4','','1','','5',''],
                                ['9','','','','5','','2','',''],
                                ['','','2','','','5','','1',''],
                                ['3','','','2','1','','5','',''],
                                ['5','9','','','6','','','','2'],
                                ['','','6','5','','2','','',''],
                                ['','','9','6','','','','2','7'],
                                ['','','','','','8','','6','5']]];

        
        //this is an array of the restricted values for each of the example puzzles
        this.restrictedForExamples =[[[false,false,false,true,true,false,true,false,true],
                                    [true,true,false,false,true,false,false,true,false],
                                    [true,true,false,false,false,true,true,false,false],
                                    [true,true,false,true,false,false,false,true,false],
                                    [false,false,true,true,false,true,true,false,false],
                                    [false,true,false,false,false,true,false,true,true],
                                    [false,false,true,true,false,false,false,true,true],
                                    [false,true,false,false,true,false,false,true,true],
                                    [true,false,true,false,true,true,false,false,false]],

                                    [[false,true,false,false,false,false,false,false,true],
                                    [true,true,false,true,true,false,true,false,false],
                                    [false,true,false,true,false,false,true,false,false],
                                    [false,false,true,false,false,true,true,true,false],
                                    [false,true,true,false,true,false,false,true,false],
                                    [true,false,false,true,false,false,true,false,false],
                                    [true,true,true,true,false,false,false,true,false],
                                    [false,false,false,false,true,false,true,false,false],
                                    [true,false,false,true,false,true,false,true,true]],

                                    [[true,false,true,false,false,true,true,false,false],
                                    [false,true,false,false,false,true,false,true,true],
                                    [false,false,true,true,false,true,true,true,true],
                                    [false,true,true,true,false,true,false,false,false],
                                    [true,true,true,false,true,true,true,false,false],
                                    [false,false,false,true,false,true,true,true,true],
                                    [false,false,false,true,true,false,true,true,false],
                                    [false,false,true,true,true,false,true,false,true],
                                    [true,false,false,true,true,true,true,true,false]],

                                    [[false,true,false,false,true,false,false,false,true],
                                    [false,false,true,true,false,true,false,true,false],
                                    [true,false,false,false,true,false,true,false,false],
                                    [false,false,true,false,false,true,false,true,false],
                                    [true,false,false,true,true,false,true,false,false],
                                    [true,true,false,false,true,false,false,false,true],
                                    [false,false,true,true,false,true,false,false,false],
                                    [false,false,true,true,false,false,false,true,true],
                                    [false,false,false,false,false,true,false,true,true]]];

                                    
    }


    /* 
    The changeCell function is responsible for changing the values of the puzzle to value passed in at the row and column passed
    in, it also changes the value of the restrictedValues to true at that position, signifying a "safe value"
    */
    changeCell(value, row, column){
        this.puzzle[row][column] = value
        this.restrictedValues[row][column] = true
    }


    /*
    This function is responsible for clearing the puzzle when the clear button is pressed. It simply resets all current values and updates the display
    */
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


    /*
    This function is responsible for clearing the puzzles solution, it goes through and replaces any "non restricted values" to blank and leaves 
    restricted values as is, restricted values being pieces of the original puzzle.
    */
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


    /* 
    This is for loading example puzzles for users to be able to try the solver without the nead to find a puzzle online and enter it all in, just
    a click of a button and one loads in! Number of puzzles is to be set to the current amount of example puzzles in this.examplePuzzles, we then
    choose a randompuzzle and replace all of this.puzzle 's values and this.restrictedValues 's values with the example puzzles values.
    */
    loadexamplePuzz(){
        let numberOfPuzzles = 4;
        let rand = Math.floor(Math.random()*numberOfPuzzles);

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                this.puzzle[i][j] = this.examplePuzzles[rand][i][j];
                this.restrictedValues[i][j] = this.restrictedForExamples[rand][i][j];
                this.updateDisplay(i,j,this.puzzle[i][j]);
            }
        }
    }


    /*
    This is where the backtracking algorithm is, it is called everytime the interval is run and simply increases the value at the current
    position (currentSquare) so long as the value is below 9. It then updates the cell and makes sure at the current position that the 3 
    rules of sudoku game are followed. If the 3 rules are followed we use nextSquare() to go to the next non restricted square then end 
    the function to await the interval. 

    In the case the current position is 9, we set it to 0 and use previousSquare() to go back to the previous non restricted square. 
    */
    solve(){
        if(this.currentSquare[0] == -1){
            clearInterval(interval);
            alert("Sorry, this puzzle is unsolvable by using the backtracking algorithm! There is select few puzzles that the method of backtracking cannot solve (more info on my github). Please try inputting another puzzle or try one of the example pupzzles.");
            return;
        }
        if(this.currentSquare[0] == 9){
            this.finishAnimation();
            clearInterval(interval);
            return;
        }

        if(this.currentSquare[0] == 0 && this.currentSquare[1] == 0 && this.restrictedValues[0][0] == true){
            this.nextSquare();
        }
        if(this.puzzle[this.currentSquare[0]][this.currentSquare[1]] < 9){
            this.puzzle[this.currentSquare[0]][this.currentSquare[1]]++;
        }else{
            this.puzzle[this.currentSquare[0]][this.currentSquare[1]] = '';
            this.updateDisplay(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]);
            this.previousSquare();
            //this.updateDisplay(this.currentSquare[0], this.currentSquare[1], this.puzzle[this.currentSquare[0]][this.currentSquare[1]]);
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
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
           if(this.restrictedValues[i][j] == false){
               this.puzzle[i][j]++

               this.updateDisplay(i, j, this.puzzle[i][j])

               if(this.puzzle[i][j] > 9){
                   this.puzzle[i][j] = 0
                   this.updateDisplay(i, j, this.puzzle[i][j])
                   if(j == 0){
                       i--
                       j = 9
                   }
                   j--
                   while(this.restrictedValues[i][j] == true){
                       if(j == 0){
                           i--
                           j = 8
                       }
                       else{
                           j--
                       }
                   }
                   j--
               }
               else if(this.verifyRow(i,this.puzzle[i][j]) == false || this.verifyColumn(j,this.puzzle[i][j]) == false || this.verifyBox(i,j,this.puzzle[i][j]) == false){
                   j--
                }
                }
            }
        }   
        this.finishAnimation();
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


    //This function changes every spot to an inputted color.
    updateWholeDisplayColor(color){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let row = i.toString();
                let column = j.toString();
                let id = row + column;
                document.getElementById(id).style.color = color;
            }
        }
    }


    //This function is responsible for the 'finish' animation, it flashes all the board green for 350ms
    finishAnimation(){
        this.updateWholeDisplayColor('green');

        setTimeout("puzz.updateWholeDisplayColor('white')", 350)
    }
}

var slider = document.getElementById('myRange')
var speed = 16;

cell = document.querySelectorAll('input')
solveButton = document.querySelector('button')

clearSolutionButton = document.getElementById('clearSol')
clearPuzzleButton = document.getElementById('clearPuzz')
examplePuzzleButton = document.getElementById('examplePuzz')

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
solveButton.addEventListener('click', solver);

clearPuzzleButton.addEventListener('click', clearPuzzle);
clearSolutionButton.addEventListener('click', clearSolution);
examplePuzzleButton.addEventListener('click', examplePuzz);


//This is responsible for changing the speed of the solve function
slider.oninput = function(){
    slider = this.value;
    speed = 79 - (parseInt(slider, 10));
}


//responsible for starting the solve function
function solver(){
    if(speed < 4){
        puzz.solveInstant();
    }else{
        interval = setInterval( () => puzz.solve(), speed);
    }
}


//responsible for calling the clear function and stopping the solve function
function clearPuzzle(){
    clearInterval(interval);
    puzz.clear();
}


//responsible for calling clearSol and stopping the solve function
function clearSolution(){
    clearInterval(interval);
    puzz.clearSol();
}


//responsible for calling the clear and loadexamplePuzz function aswell as stopping the solve function
function examplePuzz(){
    clearInterval(interval);
    puzz.clear();
    puzz.loadexamplePuzz();
}

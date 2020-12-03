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
                       ['','','','','','','','','']]


        /*This array is used to hold "safe values", these are values the user puts in that are deemed safe (true), the algorithm
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
    }

    /* The changeCell function is responsible for changing the values of the puzzle to value passed in at the row and column passed
       in, it also changes the value of the restrictedValues to true at that position, signifying a "safe value"
    */
    changeCell(value, row, column){
        this.puzzle[row][column] = value
        this.restrictedValues[row][column] = true
    }

    /*  This is where the backtracking algorithm is, it goes through each row checking each value to see if first it is not a
        restricted value (safe value), then the value is incrimented up by 1, and if the value is greater than 9 it is set back
        to 0 and we move back to the last restricted value to repeat. If the value is not greater than 9, it calls verifyRow,
        verifyColumn, and verifyBox to check if that value follows the rules of sudoku. If it does we move to next value, if 
        not we stay at the current value to incriment again.
    */
    solve(){
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
    }

    // verifyColumn takes a column number and a value to be checked and returns true if its the only of that value in the column
    // and returns false if there is more then one of that value in the column.
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

    // verifyRow takes a row number and a value to be checked and returns true if its the only of that value in the row
    // and returns false if there is more then one of that value in the row.
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

    // verifyBox takes in a row and column and a value to check, and returns true if its the only of that value in the box
    // and false if not. 
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

    //updateDisplay takes in a row, column and value and updates that cell with the new value, from a performance view
    //this is much better then updating the whole puzzle everytime.
    updateDisplay(row, column, value){
        row = row.toString()
        column = column.toString()
        let id = row + column
        document.getElementById(id).value = value
    }
}




cell = document.querySelectorAll('input')
solveButton = document.querySelector('button')

const puzz = new thePuzzle()


// This section checks for new inputs in any cell and makes sure if its a valid number (0< x <=9), if its valid,
// it takes the id of the input cell and calls change cell with the row being the first number of the id, and the 
// column being the second number of the id. For example the first cell has id="00" denoting row 0 and column 0,
// or the bottom right cell has id="88" denoting row 8 and column 8.
cell.forEach(input => {
    input.addEventListener('input', () => {
        if(input.value > '0' && input.value <= '9'){
            puzz.changeCell(input.value, input.getAttribute('id').charAt(0), input.getAttribute('id').charAt(1))
        }
        else{
            input.value = ''
        }
    })
})

//Listens for a button presson the "solve" button and then calls the puzzles solve function.
solveButton.addEventListener('click', () => { 
    puzz.solve()
})

class thePuzzle{
    constructor(){
        this.puzzle = [['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','',''],
                       ['','','','','','','','','']]

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

    changeCell(value, row, column){
        this.puzzle[row][column] = value
        this.restrictedValues[row][column] = true
    }

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

solveButton.addEventListener('click', () => { 
    puzz.solve()
})



















































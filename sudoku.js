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
    }

    changeCell(value, row, column){
        this.puzzle[row][column] = value
    }
    
    solve(){

    }

    verifyColumn(){

    }

    verifyRow(){

    }

    verifyBox(){

    }

    solve(){

    }

    updateScreen(){

    }

}




cell = document.querySelectorAll('input')

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

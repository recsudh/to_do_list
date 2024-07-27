const bcryptjs= require('bcryptjs')

const check=  bcryptjs.compare('anand1122344',"$2a$08$MvpfbStxteW7Tl0bwIye7OnUBPSiNymiZ8oW0K4L/LM.fuS1eWt3e").then(res=>{
    console.log(res)
})

console.log(check);
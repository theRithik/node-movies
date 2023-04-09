function sendMail(i){
    console.log(moviesList[i])
    //jQuery Ajax call we are making / api call
    $.post('http://localhost:4000/sendMail',moviesList[i],(data,status)=>{
        console.log(`Data:${data}, status:${status}`)
    })
}

const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const { default: axios } = require('axios');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send('this is from nodejs 8 class')
})

app.get('/hello',(req,response)=>{
    const url = 'http://localhost:3000/movies'
    // fetch(url,{method:'GET'})
    // .then((req)=>{req.json()})
    // .then((res)=>{ console.log(res)})
    // .catch((err)=>{console.log(err)})
    axios.get(url)
        .then((res)=>{
        const result = res.data
        for(let i=0; i<result.lenght; i++){
            response.send(result[i].name)
        }
        
        })
       
    
   
})
app.listen(4000,()=>{
    console.log('in port 4000')
})
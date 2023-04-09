const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const { default: axios } = require('axios');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send('this is from nodejs 8 class')
})

app.get('/list',(req,response)=>{
    const url = 'http://localhost:3000/movies'
    axios.get(url)
        .then((res)=>{
        const result = res.data
        const finalResult = []
        for(let i=0; i<result.length; i++){
            const time = new Date()
            const release = new Date(result[i].date)            
            const timediff = time.getTime() - release.getTime()
            const diff = timediff/(1000*60*60*24)

            if(diff>3){
                result[i].status = 'expired'
            }
            else if(diff>=1){
                result[i].status ='running'
            }
            else{
                result[i].status ='just released'
            }
            finalResult.push(result[i])
        }
      
            response.render('homepage.ejs',{movies:finalResult})
        })
        .catch((err)=>{console.log(err)})
   
})


app.post('/postData',(req,response)=>{
    const date = new Date()
    const url = " http://localhost:3000/movies"
    req.body.date = date

    axios.post(url, req.body,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((res)=>{
        response.redirect('/list')
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.listen(4000,()=>{
    console.log('in port 4000')
})

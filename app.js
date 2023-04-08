import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/sign-up',(req,res)=>{
    const {username , avatar} = req.body
    servUsers.push({username,avatar})
    res.send('OK')
})

app.post('/tweets',(req,res)=>{
    const {username,tweet} = req.body
    const registeredUser = servUsers.find((user)=> user.username === username )
    
    if(!registeredUser){
        return res.send('UNAUTHORIZED')
    }

    savedTweets.splice(0,0,{username,tweet})
    if(savedTweets.length > 10){
        savedTweets.pop()
    }

    res.send('OK')
})

app.get('/tweets',(req,res)=>{
    if(savedTweets.length === 0){
        return res.send(savedTweets)
    }

})

const servUsers = []
const savedTweets = []

app.listen(5000)
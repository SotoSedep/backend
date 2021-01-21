const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =require('cors')
const routing = require('./routing/index')
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection',(socket)=>{
  console.log('user connected');

  socket.on('disconnect',function(){
    console.log('user DC')
  })
})


app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routing)

const port = 3005
http.listen(port, () => {
  console.log(`socket telah tersambung pada port : ${port}`)
});

 app.listen(port, () => {
   console.log(`telah tersambung pada port : ${port}`)
 });

 
 module.exports=io
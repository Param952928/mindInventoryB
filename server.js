const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/taskRoutes')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))

mongoose.connect('mongodb+srv://paramjeetrtr:rtzcJBGJqtY0GFi0@cluster0.wtgnyxg.mongodb.net/Primary?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("Connected"))
.catch(err => console.log(err))

app.use('/api/v1/task', routes)

app.listen(5000, ()=>{
    console.log("Server is running on 5000")
})
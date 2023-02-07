require('dotenv').config()
const express = require ('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/workouts', workoutRoutes)
// only goes to workoutRotes if whats before is added to url



mongoose.connect(process.env.DBURI)
.then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log('listening')
    })

})
.catch((err) => {
    console.log(err)
})




const Workout = require('../models/workoutModel')
const mongoose = require ('mongoose')



// get all workouts
const getWorkouts = async (req, res) => {
const workouts = await Workout.find({}).sort({createdAt: -1})

res.status(200).json(workouts)
}



//get single workout
const getWorkout = async (req, res) => {
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({}) // if id is not valid
}
const workout = await Workout.findById(id)
if (!workout) {
    return res.status(404).json({error: 'no such workout'})  // if id is valid but no workout
}
res.status(200).json(workout)    
}





// create
const createWorkout = async (req, res) => {

    const {exercise, reps, weight} = req.body

    let emptyFields = []

    if(!exercise) {
        emptyFields.push('exercise')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!weight) {
        emptyFields.push('weight')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
      }



try {
 const workout = await Workout.create({
    exercise, reps, weight})
    res.status(200).json(workout)
}
catch (error) {
    res.status(400).json({error: error.message})


}
}




// delete
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({}) }
    
     const workout = await Workout.findByIdAndDelete({
        _id: id   //  delete document where _id = id 
     })   

     if (!workout) {
        return res.status(404).json({error: 'no such workout'})
     }
     res.status(200).json(workout) 
}

// update

const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({}) }

    const workout = await Workout.findByIdAndUpdate({ _id: id},{...req.body} )   

    if (!workout) {
        return res.status(404).json({error: 'no such workout'})
     }
     res.status(200).json(workout) 


}



module.exports = {
getWorkouts,
 createWorkout,
 getWorkout,
 deleteWorkout,
 updateWorkout   

}
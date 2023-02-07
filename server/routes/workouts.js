const express = require ('express')
const {createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkout}  = require ('../controllers/workoutController')

const router = express.Router()

// all workouts
router.get('/', getWorkouts)

// get single
router.get('/:id', getWorkout)

// post a new workout
router.post('/', createWorkout)

// delete
router.delete('/:id', deleteWorkout)

// update
router.patch('/:id', updateWorkout)

module.exports = router
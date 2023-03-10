import { useState } from "react"
import { Form } from "react-router-dom"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [exercise , setExercise] = useState('')
    const [reps, setReps] = useState('')
    const [weight , setWeight] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {exercise, reps, weight}

        const response = await fetch('/api/workouts' , {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {'Content-Type': 'application/json'}

        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setExercise('')
            setReps('')
            setWeight('')
            setError(null)
            setEmptyFields([])
            console.log('added')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


return (
    
<form className="create" onSubmit={handleSubmit}>
    <h3> Add a new Workout</h3>


    <label>Exercise </label>
    <input
    type="text"
    onChange={(e) => setExercise(e.target.value)}
    value={exercise}
    className={emptyFields.includes('exercise') ? 'error' : ''}
    />

<label>reps</label>
    <input
    type="text"
    onChange={(e) => setReps(e.target.value)}
    value={reps}
    className={emptyFields.includes('reps') ? 'error' : ''}
    />

<label>weight(in kg)</label>
    <input
    type="text"
    onChange={(e) => setWeight(e.target.value)}
    value={weight}
    className={emptyFields.includes('weight') ? 'error' : ''}
    />

    <button> Add workout </button>
     {error && <div className="error">{error}</div>}
</form>
    )
}

export default WorkoutForm


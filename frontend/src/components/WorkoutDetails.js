import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date format
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workoute}) => {
    const { dispatch } = useWorkoutsContext()


    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workoute._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
          }
    }


    return (
        <div className = "workout-details">
            <h4>{workoute.exercise} </h4>
            <p><strong>Weight (kg): </strong>{workoute.weight}</p>
            <p><strong>reps: </strong>{workoute.reps}</p>
            <p> { formatDistanceToNow(new Date(workoute.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>

        </div>
    )
 
}

export default WorkoutDetails
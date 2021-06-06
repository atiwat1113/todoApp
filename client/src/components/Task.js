import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.done ? 'done' : ''}`} onDoubleClick = {() => onToggle(task)}>
            <h3>{task.name} 
            <FaTimes 
                style={{color: 'red', cursor:'pointer'}} 
                onClick={() => onDelete(task._id.toString())} 
            />
            </h3>
            <p>{task.dueDate}</p>
        </div>
    )
}

export default Task

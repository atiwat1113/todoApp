import Task from './Task'
import {Link} from 'react-router-dom'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
            <p><Link to="/" style={{float: 'right'}}>Log out</Link></p>
        </>
    )
}

export default Tasks

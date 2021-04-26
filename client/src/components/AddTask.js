import {useState} from 'react'

const AddTask = ({onAdd}) => {
    const [name, setText] = useState('')
    const [dueDate, setDay] = useState('')
    const [done, setDone] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please add a task')
            return
        }

        onAdd({ name, dueDate, done })

        setText('')
        setDay('')
        setDone(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={name} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Due to</label>
                <input type='text' placeholder='Add Day' value={dueDate} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask

//import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'

const App = () => { 
  const [showAddTask, setShowAddTask] = useState(true)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  //login
  const checkValidUser = async ({username,password}) => {
    const res = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username,password}) // javascript to json
    })

    const data = await res.json();

    if (data.username===username && data.password===password) {
      console.log("true");
      <Route render={props => 
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } />
    } else {
      alert("Invalid username or password");
      console.log("false");
      
    }
  }

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) // javascript to json
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random()*10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Done
  const toggleDone = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, done:!taskToToggle.done}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, done : data.done} : task))
  }

  return (
    <Router>
      <div className = 'container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route exact path='/' render={(props) => (
          <Login onLogin={checkValidUser} />
        )} />
        <Route path='/todo' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}  {/* if showAddTask === true -> show AddTask */}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleDone}/> : 'No Tasks To Show' }
            <p><Link to="/" style={{float: 'right'}}>Log out</Link></p>
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;

//import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'
import Axios from "axios";

const App = () => { 
  const [showAddTask, setShowAddTask] = useState(true)

  const [tasks, setTasks] = useState([])

  const [user, setUser] = useState('');
  
  // useEffect(() => {
  //   if (!user) {
  //     const getTasks = async () => {
  //       const taskFromServer = await fetchTasks()
  //       setTasks(taskFromServer)
  //     }
  //     getTasks()
  //   }
  // }, [])

  //register
  const register = ({username,password}) => {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: false,
      url: "http://localhost:5000/user/register",
    }).then((res) => console.log(res));
    setUser(username);
  };

  //login
  const login = ({username,password}) => {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: false,
      url: "http://localhost:5000/user/login",
    }).then((res) => {
      console.log(res.data);
      if (res.data === "") {
        alert("Invalid user");
        console.log('false');
      } else {
        setUser(username);
        console.log('true');
        setTasks(res.data.task);
        console.log(tasks);
      }
    })
    // setUser(username);
    // .then((res) => console.log(res))
  };
 

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res

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
    Axios({
      method: "PUT",
      data: {
        name: task.name,
        dueDate: task.dueDate,
        done: task.done
      },
      withCredentials: false,
      url: "http://localhost:5000/tasks/add",
    }).then((res) => setTasks([...tasks, res]));
    // const res = await fetch('http://localhost:5000/tasks/add', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(task) // javascript to json
    // })
    // console.log('aaa');
    // const data = await res;
    // setTasks([...tasks, data]);
  }

  //Delete Task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/delete`, {
      method: 'PUT'
    })
    
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Done
  const toggleDone = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, done:!taskToToggle.done}

    const res = await fetch(`http://localhost:5000/tasks/update`, {
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
          <Login onLogin={login} onRegister={register} />
        )} />
        {user? <Redirect to = '/todo' /> : null}
        <Route path='/todo' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}  {/* if showAddTask === true -> show AddTask */}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleDone}/> : 'No Tasks To Show' }
            <p><Link to="/" style={{float: 'right'}} onClick={()=> setUser('')} >Log out</Link></p>
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;

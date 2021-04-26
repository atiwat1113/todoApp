const express = require('express');
const userRouter = require('./routes/user'); 
const taskRouter = require('./routes/task');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(express.json()); //allowed to read json
app.use(express.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send('todoapp server');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

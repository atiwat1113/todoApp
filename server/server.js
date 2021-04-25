const express = require('express');
const userRouter = require('./routes/user'); 
const taskRouter = require('./routes/task');
const app = express();
const port = 8080;

app.use(express.json()); //allowed to read json
app.use(express.urlencoded({ extended: true})); 

app.use('/user', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

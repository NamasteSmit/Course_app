const express = require('express');
const port = 3001;
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(express.json());

app.use('/user' , userRoutes);
// app.use('/admin' , );



app.listen(port,()=>[
    console.log(`Server is running on port ${port}`)
])
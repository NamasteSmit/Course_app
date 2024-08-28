 const express = require('express');
 const app = express();
 const port = 3000;
 const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

//middleware
app.use(express.json());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/user',userRoutes);


 app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
 })
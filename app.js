 const express = require('express');
 const app = express();
 const port = 3000;
 const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');

//middleware
app.use(express.json());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);


 app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
 })
const express = require('express')
const app = express();
const cors = require('cors')
const mysql = require('mysql')

app.use(cors());

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '1234',
    database        : 'iulian'
});

app.get('/', (req,res) => {
});

app.listen(3000, () =>{
    console.log('Server listening on port 3000')
})
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '172.21.91.203',
  user: 'iulianserver', 
  port: '3306',
  password: '1234',
  database: 'iulian',
});

connection.connect((error) => {
  if (error) {
    throw new Error('Error connecting to the MySQL Database: ' + error.message);
  }
  console.log('Connection established successfully');
});

connection.query('SELECT * FROM listuser', function(err, rows, fields)   
{  
  if (err) throw err;  

  console.log(rows[0]);  

});  

connection.end((error) => {
  if (error) {
    console.log('Error closing the connection: ' + error.message);
    return;
  }
  console.log('Connection closed successfully');
});

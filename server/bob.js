const mysql = require('mysql');
const fs = require('fs');
const printData = require('./printData.js');

// Your MySQL connection configuration
const connection = mysql.createConnection({
    host: '172.21.91.203',
    user: 'iulianserver',
    port: '3306',
    password: '1234',
    database: 'iulian',
});

// Connect to MySQL
connection.connect((error) => {
    if (error) {
        throw new Error('Error connecting to the MySQL Database: ' + error.message);
    }
    console.log('Connection established successfully');

    // Perform the database query
    connection.query('SELECT * FROM listuser', (err, rows) => {
        if (err) throw err;

        // Pass the data to the printData module
        printData.print(rows);

        // Close the MySQL connection
        connection.end((error) => {
            if (error) {
                console.log('Error closing the connection: ' + error.message);
                return;
            }
            console.log('Connection closed successfully');
        });
    });
});

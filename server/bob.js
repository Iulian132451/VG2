const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');

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

        // Render the HTML template with the dynamic data
        const templateData = {
            rows: rows
        };
        const html = ejs.render(fs.readFileSync('template.ejs', 'utf8'), templateData);

        // Write the generated HTML into a file
        fs.writeFileSync('output.html', html);

        console.log('HTML file generated successfully');
    });

    // Close the MySQL connection
    connection.end((error) => {
        if (error) {
            console.log('Error closing the connection: ' + error.message);
            return;
        }
        console.log('Connection closed successfully');
    });
});

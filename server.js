//"psql -d postgres -f database.sql" to refresh the database
//"node server.js" to start server

import express from 'express';
import cors from 'cors';
import postgres from 'postgres';

//Create express application and get the postgres database
const app = express();
const sql = postgres('postgres://localhost:5432/postgres');

//Add cross origin resource sharing to connect application to server
app.use(cors());
//Allow it to parse JSON requests
app.use(express.json());

//Connect getAllStudents async function when called from frontend
app.get('/getAllStudents', async (req, res) => {
    try {
        //Run SELECT query in sql to get all students
        const students = await sql
        `SELECT * FROM students;`;
        res.json(students);
    }
    //Catch error if one occurs
    catch(error) {
        res.status(500).json({
            error: error.message 
        });
    }
});

//Connect addStudent async function when called from frontend
app.get('/addStudent', async (req, res) => {
    try {
        //Get the variables needed so can pass into the sql query
        const first_name = req.query.first_name;
        const last_name = req.query.last_name;
        const email = req.query.email;
        const enrollment_date = req.query.enrollment_date;

        //Run the INSERT query to insert the new student into the database
        const students = await sql
        `INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
        (${first_name}, ${last_name}, ${email}, ${enrollment_date})`;

        res.json({ success: true });
    }
    //Catch error if one occurs
    catch(error) {
        res.status(500).json({
            error: error.message 
        });
    }
});

//Connect updateStudentEmail async function when called from frontend
app.get('/updateStudentEmail', async (req, res) => {
    try {
        //Get the variables needed so can pass into the sql query
        const student_id = req.query.student_id;
        const new_email = req.query.new_email;

        //Run the UPDATE query to change the students email
        const students = await sql
        `UPDATE students
        SET email = ${new_email}
        WHERE student_id = ${student_id};`;

        res.json({ success: true });
    }
    //Catch error if one occurs
    catch(error) {
        res.status(500).json({
            error: error.message 
        });
    }
});

//Connect deleteStudent async function when called from frontend
app.get('/deleteStudent', async (req, res) => {
    try {
        //Get the variables needed so can pass into the sql query
        const student_id = req.query.student_id;

        //Run the DELETE query to delete the student
        const students = await sql
        `DELETE FROM students
        WHERE student_id = ${student_id};`;

        res.json({ success: true });
    }
    //Catch error if one occurs
    catch(error) {
        res.status(500).json({
            error: error.message 
        });
    }
});

//Keep the server listening for new incomming signals
app.listen(3000, () => {
    console.log('Backend server running on http://localhost:3000');
});

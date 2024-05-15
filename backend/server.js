// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./index'); // Import the MySQL connection object from index.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

// Get all classrooms
app.get('/api/classrooms', (req, res) => {
    const query = "SELECT * FROM Classroom";
    dbConnection.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error retrieving classrooms");
        } else {
            res.json(result);
        }
    });
});

// Add a new classroom
app.post('/api/classrooms', (req, res) => {
    const { name, date, time, instructorName, classDetails } = req.body;
    console.log(name, date, time, instructorName, classDetails);

    // Validate input data
    if (!name || !date || !time || !instructorName || !classDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert the new classroom into the database
    const insertQuery = `INSERT INTO Classroom (Name, Date, Time, InstructorName, classDetails, IsBooked) VALUES (?, ?, ?, ?, ?, ?)`;

    dbConnection.query(insertQuery, [name, date, time, instructorName, classDetails, 0], (err, result) => {
        if (err) {
            console.error("Error adding classroom:", err);
            res.status(500).send("Error adding classroom");
        } else {
            // Respond with the newly added classroom ID
            res.status(201).json({ id: result.insertId, name });
        }
    });
});


// Delete a classroom by ID
app.delete('/api/classrooms/:id', (req, res) => {
    const { id } = req.params;

    // Check if the classroom exists
    const checkQuery = `SELECT * FROM Classroom WHERE id = ${id}`;
    dbConnection.query(checkQuery, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error fetching classroom");
        }

        if (result.length === 0) {
            return res.status(404).send("Classroom not found");
        }

        // Delete the classroom
        const deleteQuery = `DELETE FROM Classroom WHERE id = ${id}`;
        dbConnection.query(deleteQuery, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error deleting classroom");
            }
            res.status(200).json({ message: 'Classroom deleted successfully' });
        });
    });
});

// Book a room by ID
// Update booking by ID
app.patch('/api/classrooms/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, date, time, instructorName, classDetails } = req.body;

    // Validate input data
    if (!name || !date || !time || !instructorName || !classDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the booking
    const query = `UPDATE Classroom 
                   SET 
                       Name = ?,
                       Date = ?,
                       Time = ?,
                       InstructorName = ?,
                       classDetails = ?,
                       IsBooked = 1
                   WHERE id = ?`;

    dbConnection.query(query, [name, date, time, instructorName, classDetails, id], (err, results) => {
        if (err) {
            console.error("Error updating booking:", err);
            return res.status(500).send("Error updating booking");
        }
        res.status(200).json({ id, name, date, time, instructorName, classDetails, IsBooked: 1 });
    });
});


// Cancel booking by ID
app.post('/api/classrooms/cancel/:id', (req, res) => {
    const { id } = req.params;

    // Check if the classroom exists
    const checkQuery = `SELECT IsBooked FROM Classroom WHERE id = ${id}`;
    dbConnection.query(checkQuery, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error fetching classroom");
        }

        if (result.length === 0) {
            return res.status(404).send("Classroom not found");
        }

        // Check if the classroom is already booked
        if (result[0].IsBooked === 0) {
            return res.status(400).send("Classroom is not booked");
        }

        // Cancel the booking
        const cancelQuery = `UPDATE Classroom SET IsBooked = 0 WHERE id = ${id}`;
        dbConnection.query(cancelQuery, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error canceling booking");
            }
            res.status(200).json({ id, IsBooked: 0 });
        });
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

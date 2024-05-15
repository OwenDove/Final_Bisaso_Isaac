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
function addClassroom(req, res) {
    console.log("Request body:", req.body);
    const { name } = req.body;

    // Validate input data
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Insert the new classroom into the database
    const insertQuery = "INSERT INTO `Classroom`(`Name`, `Time`, `IsBooked`) VALUES (?,NOW(),false);";

    dbConnection.query(insertQuery, [name], (err, result) => {
        if (err) {
            console.error("Error adding classroom:", err);
            res.status(500).send("Error adding classroom");
        } else {
            // Respond with the newly added classroom ID
            res.status(201).json({ id: result.insertId, name });
        }
    });
}

// Route definition for adding a new classroom
app.post('/api/classrooms', addClassroom);


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
app.get('/api/classrooms/book/:id', (req, res) => {
    const { id } = req.params;
    // const { classDetails } = req.body;

//Check if the classroom is already booked
const queryCheck = `SELECT * FROM Classroom WHERE id = ${id} `;
dbConnection.query(queryCheck, (err, result) => {
    if (err) {
        res.status(500).send("Error fetching classroom", err);
        return 
    }

    if(result.length === 0) {
        return res.status(404).send("Classroom not found");
    }
    


    
    if(result[0].isBooked === 1) {
        res.status(400).send("Classroom already booked");
        return
        
    }else{
        // Book the classroom
        const query = `UPDATE Classroom SET isBooked = 1 WHERE id = ${id}`;
        dbConnection.query(query, (err, results) => {
            if (err) {
                return res.status(500).send("Error booking classroom", err);
            }
            res.status(200).json({id, isBooked: 1})
        });
            }
   
})
})
app.delete('/api/classrooms/cancel/:id', (req, res) => {
    const { id } = req.params;

    // Check if the classroom exists
    const checkQuery = `SELECT * FROM Classroom WHERE id = ${id}`;
    console.log(checkQuery);
    dbConnection.query(checkQuery, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error fetching classroom");
                  
        }
        console.log(result);

        if (result.length === 0) {
            return res.status(404).send("Classroom not found");
        }

        // Check if the classroom is already booked
        if (result[0].isBooked === 0) {
            return res.status(400).send("Classroom is not booked");
        }

        // Cancel the booking
        const cancelQuery = `UPDATE Classroom SET isBooked = 0 WHERE id = ${id}`;
        dbConnection.query(cancelQuery, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error canceling booking");
            }
            res.status(200).json({ id, isBooked: 0 });
        });
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

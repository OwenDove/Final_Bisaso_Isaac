
export default connection;
import { createPool } from 'mysql2';

// Create a connection pool
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "GoTechMavs!",
    database: "AirNWKTCDatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Execute the query
pool.query('SELECT * FROM Classroom', (error, results, fields) => {
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  console.log('Fetched data:', results);
});

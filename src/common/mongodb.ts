import { connect, connection } from "mongoose";

let isConnected = false;

/**
 * Ensure that database connection is established. Will first check if the connection already exists.
 * If the connection does not already exist, function will attempt to establish a connection to database.
 *
 * @returns On Success true, false otherwise.
 */
async function createConnection() {
  try {
    switch (connection.readyState) {
      case 1:
        console.log("Already connected to database. Continuing.");
        return true;
      default:
        console.log("Not connected to database yet. Attempting to connect.");
        break;
    }

    if (process.env.DATABASE_URL === undefined) return false;
    const dataBaseUrl = process.env.DATABASE_URL;
    // Attempt to connect to the database
    await connect(dataBaseUrl);

    // Check the database connection state
    switch (connection.readyState) {
      case 0:
        console.log("Disconnected from database.");
        return false;
      case 1:
        console.log("Connected to database.");
        isConnected = true;
        return true;
      case 2:
        console.log("Connecting to database.");
        return false;
      case 3:
        console.log("Disconnecting from database.");
        return false;
      default:
        console.log("Unknown database connection state.");
        return false;
    }
  } catch (error) {
    console.error("Error connecting to database: ", error);
    return false;
  }
}

export { createConnection };

const mongoose = require('mongoose');
const chalk = require('chalk');
const { MONGO_CONNECTION_URI } = process.env;
const consolePrefix  = chalk.bgGreen.black('mongodb') +" - ";
async function connectDB() {
    // Check if MONGODB URI is Provided
    if (MONGO_CONNECTION_URI !== undefined) {
        try {
            // Database Connection 
            console.log(consolePrefix + chalk.blue('Intialising database connection...'));
            mongoose.set('strictQuery', true);
            mongoose.connect(MONGO_CONNECTION_URI);
            const connection = await mongoose.connection;

            connection.on("error", () => {
                console.log(consolePrefix + chalk.bgRed.white('Database connection failed'));
            });
            connection.once('open', () => {
                console.log(consolePrefix + chalk.green('Database connected !'));
            })
        } catch (err) {
            console.log(consolePrefix + chalk.bgRed.white('Database connection error'));
        }
    } else {
        console.log(consolePrefix + chalk.bgRed.white('MongoDB URL not found'))
        console.log(consolePrefix + chalk.bgRed.white('Database Connection Failed'))
    }


}

module.exports = connectDB;
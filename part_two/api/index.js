const mongoose = require('mongoose');
const chalk = require('chalk');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app');

const port = 5002;
let server;

const connectToDB = async () => {
  let mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('%s Connected to MongoDB', chalk.green('✓'));
      server = app.listen(port, () => {
        console.log(`${chalk.green('✓')} Server is running at ${chalk.underline.blue(`http://localhost:${port}`)}`);
      });
    })
    .catch((err) => {
      console.log('%s Could not connect to MongoDB', chalk.red('x'));
      console.error(`${chalk.red('x')} ${err}`);
    });
};

connectToDB();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  // stop error handler for testing reasons
  // exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

const express = require('express');
const connectDB = require('./db');
const { signin} = require('./controllers/signin');
const { signup} = require('./controllers/signup');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.post('/signin', signin);
app.post('/signup', signup);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
}).on('error', (error) => {
  console.error('Error starting the server', error);
  process.exit(1);
});
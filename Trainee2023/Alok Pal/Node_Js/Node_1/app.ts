import express from 'express';
const app = express();

// GET method
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// // POST method
// app.post('/', (req, res) => {
//   res.send('Got a POST request');
// });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

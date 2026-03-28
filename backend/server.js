const app = require('./app');

const PORT = process.env.PORT || 3000;


// acccepeted for all server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});